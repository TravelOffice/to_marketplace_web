/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_BASE_URL: string,
  VITE_SSO: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
