/// <reference types="vite/client" />

interface ImportMeta {
  readonly glob: <T = unknown>(pattern: string, options?: { eager?: boolean; as?: string; import?: string }) => Record<string, T>;
}