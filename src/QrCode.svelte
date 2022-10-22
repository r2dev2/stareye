<script>
  import { external } from './constants.js';

  export let padding = 25;
  export let size = 100;
  export let value = 'test data';

  /** @type {HTMLCanvasElement | null} */
  let canvas = null;

  /** @type {any} */
  $: qr =
    canvas === null
      ? null
      : new external.QRious({
          element: canvas,
        });

  $: qr &&
    qr.set({
      level: 'M',
      padding,
      size,
      value,
    });
</script>

<div class="qr-code">
  <canvas bind:this={canvas} />
</div>
