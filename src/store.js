import { nocam } from './constants.js';
import { derived, readable, writable } from 'svelte/store';

/**
 * @typedef {[number, number, number]} Color
 * @typedef {import('peerjs').DataConnection} Connection
 */

/**
 * @template T
 * @typedef {<T>(reducer: (acc: T, val: Color) => T, initial: T) => T} Reduce
 */

export const videoStream = readable(
  /** @type {MediaStream | null} */ (null),
  (set) => {
    if (nocam) return;
    window.navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then(set)
      .catch((e) => console.error('Ooopsie woopsie', e));
  }
);

/**
 * Compute a value from the pixels of the user's camera.
 *
 * It works like Array.reduce
 *
 * @template T
 * @type {import('svelte/store').Readable<Reduce<T>>}
 */
export const pixelReduce = derived(videoStream, ($stream, set) => {
  if ($stream === null) {
    set((_fn, initial) => initial);
  }

  /** @type {VoidFunction[]} */
  const unsubs = [];

  const video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  video.srcObject = $stream;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  document.querySelector('.stream')?.appendChild(video);

  const getImgData = () => {
    if (ctx === null) return [];
    try {
      const frame = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);
      return frame.data;
    } catch (e) {
      return [];
    }
  };

  const onplay = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const interval = setInterval(() => {
      ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }, 0);
    unsubs.push(() => clearInterval(interval));
  };

  video.addEventListener('play', onplay);

  unsubs.push(() => video.remove());
  unsubs.push(() => canvas.remove());

  // Pixel reduce function, it's like Array.reduce()
  set((reducer, initial) => {
    const data = getImgData();

    let acc = initial;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i + 0];
      const green = data[i + 1];
      const blue = data[i + 2];
      acc = reducer(acc, [red, green, blue]);
    }
    return acc;
  });

  return () => {
    unsubs.forEach((fn) => fn());
  };
});

export const currTime = readable(Date.now(), (set) => {
  const interval = setInterval(() => set(Date.now()), 10);
  return () => clearInterval(interval);
});
export const showJoinInfo = writable(false);
export const id = writable(/** @type {string | null} */ (null));
export const devices = writable(/** @type {Connection[]} */ ([]));
export const bangs = writable(/** @type {number[]} */ ([]));
export const calibratedDevices = writable(0);
export const calibrated = writable(false);
export const forceReset = writable({ reset: true, external: false });
export const isReady = derived(
  [calibratedDevices, calibrated, devices],
  ([$numCal, $isCal, $dev]) => $numCal === $dev.length && $isCal
);
export const times = derived([bangs, currTime], ([$bangs, $currTime]) => [
  ...$bangs.slice(1).map((time, i) => time - $bangs[i]),
  ...($bangs.length ? [$currTime - $bangs[$bangs.length - 1]] : []),
]);
