import { get } from 'svelte/store';
import {
  bangs,
  forceReset,
  devices,
  calibrated,
  calibratedDevices,
  id,
} from './store.js';
import { external, joinId, Messages } from './constants.js';

/**
 * @typedef {import('peerjs').Peer} Peer
 * @typedef {import('peerjs').DataConnection} Connection
 * @typedef {{ type: 0 }} ResetStatMsg
 * @typedef {{ type: 1 }} CalibrateFinishMsg
 * @typedef {{ type: 2, time: number }} BangMsg
 * @typedef {ResetStatMsg | CalibrateFinishMsg | BangMsg} PeerData
 */

/**
 * @template T extends PeerData
 * @typedef {(otherId: string, data: T) => void} DataResponder
 */

export const peer = /** @type {Peer} */ (new external.Peer());

/** @type {Array<() => void>} */
const subscribes = [];

export const setup = () => {
  peer.on('open', ($id) => {
    id.set($id);
    if (joinId !== null) {
      openConnection(peer.connect(joinId));
    }
  });
  peer.on('connection', openConnection);

  subscribes.push(
    forceReset.subscribe(({ reset, external }) => {
      if (!reset || external) return;
      emit({ type: Messages.RESET_STAT });
    })
  );

  subscribes.push(
    calibrated.subscribe(($calibrated) => {
      if (!$calibrated) return;
      emit({ type: Messages.CALIBRATE_FINISH });
    })
  );
};

export const openConnection = (/** @type {Connection} */ conn) => {
  conn.on('open', () => {
    // add connection to devices store
    devices.update(($d) => [...$d, conn]);

    // remove connection from devices store on close
    conn.on('close', () =>
      devices.update(($d) => $d.filter((c) => c.peer !== conn.peer))
    );

    // register listeners to messages from the peer
    // @ts-ignore
    conn.on('data', onData(conn.peer));
  });
};

const emit = (/** @type {any} */ msg) =>
  get(devices).forEach((conn) => conn.send(msg));

export const sendBang = (/** @type {number} */ time) =>
  emit({
    type: Messages.BANG,
    time,
  });

/** @type {DataResponder<ResetStatMsg>} */
const peerResetStat = (_, __) => {
  forceReset.set({ reset: true, external: true });
};

/** @type {DataResponder<CalibrateFinishMsg>} */
const peerCalibrateFinishMsg = (_id, __) => {
  calibratedDevices.update(($dev) => $dev + 1);
};

/** @type {DataResponder<BangMsg>} */
const peerBangMsg = (_, data) => {
  bangs.update(($bangs) => [...$bangs, data.time].sort());
};

const dataResponders = [peerResetStat, peerCalibrateFinishMsg, peerBangMsg];

/** @type {(otherId: string) => (data: PeerData) => void} */
export const onData = (otherId) => (data) => {
  if (0 <= data.type && data.type < dataResponders.length) {
    // @ts-ignore
    dataResponders[data.type](otherId, data);
  }
};

export const cleanup = () => {
  subscribes.forEach((cb) => cb());
};
