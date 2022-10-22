const params = new URLSearchParams(window.location.search);

export const nocam = params.get('nocam') !== null;
export const joinId = params.get('id');

// libraries we need from cdn
// peerjs npm build is broken so we need cdn
export const external = {
  // @ts-ignore
  Peer: window.Peer,
  // @ts-ignore,
  QRious: window.QRious,
};

/** @enum {number} */
export const Messages = {
  RESET_STAT: 0,
  CALIBRATE_FINISH: 1,
  BANG: 2,
};
