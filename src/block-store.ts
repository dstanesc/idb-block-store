import { get as idbGet, set as idbSet } from 'idb-keyval'

const blockStore = ({ cache }: { cache?: any }) => {

    const put = async (block: { cid: any, bytes: Uint8Array }): Promise<void> => {
        if (cache)
            cache[block.cid.toString()] = block.bytes
        await idbSet(block.cid.toString(), block.bytes)
    }

    const get = async (cid: any): Promise<Uint8Array> => {
        let bytes
        if (cache)
            bytes = cache[cid.toString()]
        if (!bytes) {
            bytes = await idbGet(cid.toString())
        }
        return bytes
    }

    return { get, put }
}

export { blockStore }