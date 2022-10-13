const params = new URLSearchParams(window.location.search);

export const nocam = params.get('nocam') !== null;

// libraries we need from cdn
// peerjs npm build is broken so we need cdn
export const external = {
  // @ts-ignore
  Peer: window.Peer,
};
