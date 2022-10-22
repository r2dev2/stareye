import { devices, id } from './store.js';
import { external, joinId } from './constants.js';

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

export const setup = () => {
  peer.on('open', ($id) => {
    id.set($id);
    if (joinId !== null) {
      openConnection(peer.connect(joinId));
    }
  });
  peer.on('connection', openConnection);
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

/** @type {DataResponder<ResetStatMsg>} */
const peerResetStat = (_, __) => {
  return;
};

/** @type {DataResponder<CalibrateFinishMsg>} */
const peerCalibrateFinishMsg = (_id, __) => {
  return;
};

/** @type {DataResponder<BangMsg>} */
const peerBangMsg = (_id, _data) => {
  return;
};

const dataResponders = [peerResetStat, peerCalibrateFinishMsg, peerBangMsg];

/** @type {(otherId: string) => (data: PeerData) => void} */
export const onData = (otherId) => (data) => {
  if (0 < data.type && data.type < dataResponders.length) {
    // @ts-ignore
    dataResponders[data.type](otherId, data);
  }
};

export const cleanup = () => {
  return;
};
