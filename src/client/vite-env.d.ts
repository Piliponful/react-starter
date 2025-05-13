interface ImportMetaEnv {
  readonly VITE_HOST: string
  readonly VITE_ENV: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}