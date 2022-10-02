import { writable } from 'svelte/store';

/**
 * @typedef {import('svelte/store').Readable} Readable
 * @typedef {Readable<{
 *    mean: number, std: number }
 *  > & { addData: (data: number) => void }>} RunningStats
 */

const circularBuffer = (buffsize) => {
  let removeHead = 0;
  const buffer = [];

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
    if (removeHead == buffer.length) {
      removeHead = 0;
    }
  };

  const get = () => buffer;
  const clear = () => buffer.splice(0);
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
  const buffer = circularBuffer(buffsize);

  // std will be a rough approximation
  // instead of sqrt(1/n sum distance from mean)
  // it is 1/n
  //
  // both mean and std are Math.ceil()ed to improve speed
  const store = writable({ mean: 0, std: 0 });

  /** @type {() => { mean: number, std: number }} */
  const computeStats = () => {
    const buff = buffer.get();
    const one_n = 1 / buff.length;
    const mean = one_n * sum(buff);
    const std = one_n * Math.sqrt(sum(buff.map((n) => Math.pow(n - mean, 2))));
    return { mean, std };
    // return { mean: Math.ceil(mean), std: Math.ceil(std) };
  };

  /** @type {(data: number) => void} */
  const addData = (data) => {
    buffer.add(data);
    store.set(computeStats());
  };

  const clear = () => buffer.clear();

  const ready = () => buffer.get().length == buffsize;

  return { ...store, addData, clear, ready };
};
