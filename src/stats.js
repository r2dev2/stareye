import { writable } from 'svelte/store';

/**
 * @template T
 * @typedef {import('svelte/store').Readable<T>} Readable<T>
 */

/**
 * @typedef {Readable<{
 *    mean: number, std: number }
 *  > & {
 *     addData: (data: number) => void, clear: () => void, ready: () => boolean
 *  }} RunningStats
 */

/**
 * @template T
 * @typedef {{
 *  add: (data: T) => void,
 *  get: () => T[],
 *  clear: () => void,
 * }} Buffer<T>
 */

/**
 * @type {(buffsize: number) => Buffer<any>}
 */
const circularBuffer = (buffsize) => {
  let removeHead = 0;
  /** @type {any[]} */
  const buffer = [];

  /** @type {(data: any) => void} */
  const add = (data) => {
    if (buffer.length < buffsize) {
      buffer.push(data);
      return;
    }
    buffer[removeHead] = data;

    // removeHead %= buffer.length but more verbose
    // hopefully speeeed
    // *copium
    removeHead++;
    if (removeHead === buffer.length) {
      removeHead = 0;
    }
  };

  const get = () => buffer;
  const clear = () => {
    buffer.splice(0);
    removeHead = 0;
  };
  return { add, clear, get };
};

/** @type {(iterable: number[]) => number} */
const sum = (iterable) => {
  let acc = 0;
  for (const data of iterable) {
    acc += data;
  }
  return acc;
};

/** @type {(buffsize: number) => RunningStats} */
export const runningStats = (buffsize) => {
  /** @type {Buffer<number>} */
  const buffer = circularBuffer(buffsize);

  const store = writable({ mean: 0, std: 0 });

  /** @type {() => { mean: number, std: number }} */
  const computeStats = () => {
    const buff = buffer.get();
    const one_n = 1 / buff.length;
    const mean = one_n * sum(buff);
    const std = one_n * Math.sqrt(sum(buff.map((n) => Math.pow(n - mean, 2))));
    return { mean, std };
  };

  /** @type {(data: number) => void} */
  const addData = (data) => {
    buffer.add(data);
    store.set(computeStats());
  };

  const clear = () => {
    store.set({ mean: 0, std: 0 });
    buffer.clear();
  };

  const ready = () => buffer.get().length === buffsize;

  return { ...store, addData, clear, ready };
};
