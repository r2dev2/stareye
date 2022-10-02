<script>
  import { onMount } from 'svelte';
  import { runningStats } from './stats.js';
  import { pixelReduce } from './store.js';

  const windowSize = 200;
  const pollIntervalMs = 30;
  const zthreshhold = 50;

  const stats = runningStats(windowSize);
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
    bang = null;
  };

  onMount(() => {
    const interval = setInterval(() => {
      const pixelSum = getPixelSum();
      const { mean, std } = $stats;

      ready = stats.ready();
      now = Date.now();
      if (stats.ready()) {
        // console.log(Math.abs(pixelSum - mean), mean, std);
        const zscore = Math.ceil(Math.abs((pixelSum - mean) / std));

        if (zscore > zthreshhold && bang === null) {
          console.log('BANG', zscore, Date.now());
          bang = Date.now();
        }
      }

      stats.addData(pixelSum);
    }, pollIntervalMs);

    return () => {
      clearInterval(interval);
      stats.clear();
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
