
import * as dotenv from "dotenv";
import { chunkyStore } from "@dstanesc/store-chunky-bytes";
import { codec, chunkerFactory, byteArray, retrieve } from "./util";
import { blockStore } from "../index";
import * as assert from "assert";

import "fake-indexeddb/auto";

const RECORD_COUNT = 100;
const RECORD_SIZE_BYTES = 36;


test("demo idb cas usage in the context of @dstanesc/store-chunky-bytes", async () => {
  // optional cache
  const cache = {};

  // block-store api
  const { get, put } = blockStore({ /*cache,*/});

  // chunking config
  const { encode, decode } = codec();
  const { create, read } = chunkyStore();
  const { fastcdc } = chunkerFactory({ fastAvgSize: 512 });

  // demo data
  const { buf, records } = byteArray(RECORD_COUNT, RECORD_SIZE_BYTES);

  // chunk the data (content defined)
  const { root, blocks } = await create({ buf, chunk: fastcdc, encode });

  // store the chunks to the idb-block-store
  for (const block of blocks) {
    console.log(`Save block: ${block.cid} len: ${block.bytes.byteLength}`);
    await put(block);
  }

  // read back a slice of data from the az-block-store
  const retrieved = await retrieve(read, 0, 10, RECORD_SIZE_BYTES, {
    root,
    decode,
    get,
  });
  console.log(retrieved);

  assert.equal(retrieved.length, 10);
  assert.deepEqual(records.slice(0, 10), retrieved);
});
