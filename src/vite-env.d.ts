/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_GOOGLE_API_KEY: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_PROJECT_ID: string
  readonly VITE_APP_URL: string
  readonly VITE_APP_NAME: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
