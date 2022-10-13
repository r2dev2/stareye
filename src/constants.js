const params = new URLSearchParams(window.location.search);

export const nocam = params.get('nocam') !== null;
