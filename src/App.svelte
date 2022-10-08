<script>
  import { onMount } from 'svelte';
  import { runningStats } from './stats.js';
  import { pixelReduce } from './store.js';

  const windowSize = 300;
  const pollIntervalMs = 10;

  // statistics on sum of pixel values
  const stats = runningStats(windowSize);

  // statistics on z-score of pixel value sums
  //
  // We need to take the z-score of a z-score because
  // different cameras have different noises and resolutions.
  //
  // If we hard-coded a bang as all |z-score| above a ridiculously
  // high 50 for one camera, it won't work for other cameras.
  //
  // However, by taking the z-score of z-scores, we've essentially
  // normalized the noise and can use a reasonable |z| >= 3 that
  // should work for all cameras.
  //
  // It is worth noting that during calibration, a low pass filter
  // over pixelSum might have also worked for reducing noise.
  const zstats = runningStats(windowSize);

  let ready = false;
  let bang = null;
  let now = Date.now();

  /** @type {() => number} */
  const getPixelSum = () =>
    $pixelReduce((acc, color) => {
      return acc + color[0] + color[1] + color[2];
    }, 0);

  const clear = () => {
    stats.clear();
    zstats.clear();
    bang = null;
  };

  onMount(() => {
    const interval = setInterval(() => {
      const pixelSum = getPixelSum();
      const { mean, std } = $stats;
      const { mean: zmean, std: zstd } = $zstats;

      const zscore = pixelSum - mean;
      const zzscore = Math.ceil(Math.abs((zscore - zmean) / (zstd + 10)));

      ready = stats.ready();
      now = Date.now();

      if (stats.ready()) {
        if (bang === null && Math.abs(zzscore) > 2) {
          console.log('BANG', zzscore, Date.now());
          bang = Date.now();
        }
      }
      // calibrate still frame statistics during calibration period
      // pixelSum > 0 will be true when the video has loaded
      else if (pixelSum > 0) {
        stats.addData(pixelSum);
        zstats.addData(zscore);
      }
    }, pollIntervalMs);

    return () => {
      clearInterval(interval);
      clear();
    };
  });
</script>

<main>
  <div
    class="stats"
    class:waiting={ready && bang === null}
    class:ready={ready && bang !== null}
  >
    <button on:click={clear}> Reset Stats </button>

    {#if !ready}
      <p>Calibrating...</p>
    {:else if bang === null}
      <p>Waiting for movement...</p>
    {:else}
      <p>BANG! {Math.floor((now - bang) / 1000)}s</p>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    overflow: hidden;
    padding: 0px !important;
    background-color: black;
  }

  :global(video) {
    position: fixed;
    top: 0;
    left: 50%;
    height: 100vh;
    width: 100vw;
    object-fit: fill;
    z-index: 1;
    transform: translateX(-50%);
  }

  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    padding: 3rem;
  }

  .stats {
    --stats-border-color: red;
    padding: 2rem;
    background-color: white;
    height: 10rem;
    width: 20rem;
    box-sizing: border-box;
    border: 1rem solid var(--stats-border-color);
    transition: 200ms ease-out;
  }

  .waiting {
    --stats-border-color: goldenrod;
  }

  .ready {
    --stats-border-color: lightgreen;
  }
</style>
