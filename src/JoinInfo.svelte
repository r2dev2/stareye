<script>
  import { createEventDispatcher } from 'svelte';
  import QrCode from './QrCode.svelte';

  export let id = '';

  const dispatch = createEventDispatcher();

  /** @type {(id: string) => string} */
  const getJoinLink = (id) => {
    const url = new URL(window.location.href);
    url.searchParams.set('id', id);
    return url.toString();
  };

  $: joinLink = getJoinLink(id);
</script>

<div class="join-info-scrim" on:click={() => dispatch('close')}>
  <button class="close-button">&times;</button>
  <div class="join-info" on:click|stopPropagation>
    <p><a href={joinLink}>{joinLink}</a></p>
    <QrCode
      value={joinLink}
      size={Math.min(window.innerWidth, window.innerHeight) * 0.8}
      padding={0}
    />
  </div>
</div>

<style>
  .join-info-scrim {
    --scrim-opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: rgba(0, 0, 0, var(--scrim-opacity));
  }

  .join-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    padding: 0rem 0.5rem;
  }
</style>
