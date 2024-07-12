import { IS_DEV, IS_GITEE_PAGES } from '../config'
import { ArchiveReader, libarchiveWasm } from 'libarchive-wasm'

/**
 * @param url
 * @returns Promise<{ json(): Promise<any> } | Response>
 * @privateF
 */
export async function _fetch(url: string): Promise<{ json(): Promise<unknown> } | Response> {
  if (IS_DEV || !IS_GITEE_PAGES) {
    url = url.replace('.md', '.json')
    return fetch(url)
  } else {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const r = await fetch(url)
      if (url.includes('.md')) {
        // console.time()
        const data = await r.arrayBuffer()
        const mod = await libarchiveWasm()
        const reader = new ArchiveReader(mod, new Int8Array(data))
        for (const entry of reader.entries()) {
          if (entry.getPathname().endsWith('.json')) {
            const data = new TextDecoder().decode(entry.readData())
            resolve({
              json() {
                return Promise.resolve(JSON.parse(data))
              }
            })
          }
          // console.timeEnd()
        }
        reader.free()
      } else {
        resolve(r)
      }
    })
  }
}