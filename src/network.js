import { id } from './store.js';
import { external } from './constants.js';

/**
 * @typedef {import('peerjs').Peer} Peer
 */

export const peer = /** @type {Peer} */ (new external.Peer());

export const setup = () => {
  peer.on('open', ($id) => {
    id.set($id);
  });
};

export const cleanup = () => {
  return;
};
