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
  <button on:click={clear}> Reset Stats </button>

  {#if !ready}
    <p>Calibrating...</p>
  {:else if bang === null}
    <p>Waiting for movement...</p>
  {:else}
    <p>BANG! {Math.floor((now - bang) / 1000)}s</p>
  {/if}
</main>

<style>
  :global(body) {
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }
</style>
