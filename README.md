# IDB Block Store

Local content-addressable storage (CAS) based on [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) and [IDB-Keyval](https://www.npmjs.com/package/idb-keyval) wrapper. 

## API

```ts
put: (block: { cid: any, bytes: Uint8Array }) => Promise<void>
get: (cid: any) => Promise<Uint8Array>
```

## Usage

```ts
import { blockStore } from '@dstanesc/idb-block-store'

const cache = {}
const { get, put } = blockStore({ /*cache,*/});
```
## Build

```sh
npm run clean
npm install
npm run build
```

## Test
```sh
npm run test
```

## Licenses

Licensed under either [Apache 2.0](http://opensource.org/licenses/MIT) or [MIT](http://opensource.org/licenses/MIT) at your option.
