/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_MARKETPLACE_API_URL: string,
  VITE_API_URL: string,
  VITE_SSO: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
