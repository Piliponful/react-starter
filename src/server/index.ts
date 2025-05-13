import 'dotenv/config'
import fs from 'node:fs/promises'
import express, { Request } from 'express'
import jwtDecode from 'jwt-decode'
import { isbot } from 'isbot'
import cookieParser from 'cookie-parser'
import Helmet from 'react-helmet'
import { ObjectId } from 'mongodb'
import { parse } from 'url'

import { getDb } from './db'
import path from 'node:path'

interface CustomRequest extends Request {
  user?: {
    selectedGroup?: string
    selectedRoom?: string
  }
  realUser?: {
    selectedGroup?: string
    selectedRoom?: string
  }
  jwt?: string
}

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const base = process.env.BASE || '/'

async function start() {
  const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : ''

  const app = express()
  app.use(cookieParser())

  let vite
  if (!isProduction) {
    const { createServer } = await import('vite')
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(base, sirv('./dist/client', { extensions: [] }))
  }
  app.use((req, res, next) => {
    if (req.url === '/.well-known/appspecific/com.chrome.devtools.json') {
      res.status(404).end()
      return
    }
    next()
  })

  app.use('*all', async (req: CustomRequest, res) => {
    try {
      let template
      let render

      if (!isProduction) {
        template = await fs.readFile('./index.html', 'utf-8')
        template = await vite.transformIndexHtml(req.originalUrl, template)
        render = (await vite.ssrLoadModule('/src/server/entry-server.tsx'))
          .render
      } else {
        template = templateHtml
        const entryPath = path.resolve(
          process.cwd(),
          './dist/server/entry-server.mjs'
        )
        render = (await import(entryPath as any)).render
      }

      const rendered = await render(req, res, {})

      const helmet = Helmet.renderStatic()

      let html = template
        .replace(
          `<!--app-head-->`,
          `${helmet.meta.toString()}
           ${helmet.title.toString()}
           ${helmet.script.toString()}
           ${rendered.head ?? ''}
          `
        )
        .replace(
          `<!--app-html-->`,
          `${rendered.html}
          <script>
          </script>
        `
        )

      const title = 'Online voting'
      const description =
        'Non-anonymous online voting on social or political issues.'

      const imgUrl = `${process.env.HOST}/cicero-denounces-catiline.jpg`

      const twitterUsername = '@ask_cointoken'

      const url = process.env.HOST + req.originalUrl

      html = html.replace(
        '<!-- twitter_site -->',
        `
            <link rel="canonical" href="${url}" />
            <meta name="twitter:site" content="${twitterUsername}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${description}" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="${url}" />
            <meta property="og_url" content="${url}" />
            <meta property="og:site_name" content="Online Polls" />
            <meta property="og_site_name" content="Online Polls" />
            <meta property="og:image" content="${imgUrl}" />
            <meta property="og_image" content="${imgUrl}" />

            <meta property="twitter:title" content="${title}" />
            <meta property="twitter:description" content="${description}" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content="${imgUrl}">
          `
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (e) {
      vite?.ssrFixStacktrace?.(e)
      console.error(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, err => {
    if (err) {
      console.error('Fatal error starting server:', err)
      process.exit(1)
    }
    console.log(`Server started at http://localhost:${port}`)
  })
}

start().catch(e => {
  console.error('Fatal error starting server:', e)
  process.exit(1)
})
