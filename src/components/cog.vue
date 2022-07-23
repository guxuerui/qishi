<template>
  <div class="cog">
    <div />
    <div />
    <div />
  </div>
</template>

<style scoped>
  .cog {
    width: 50px;
    height: 50px;
    position: relative;
    animation: spin 4s linear infinite;
    --cogBg: #fff;
  }
  html.dark .cog {
    --cogBg: #1d1e22;
  }
  .cog::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: var(--cogBg);
  }
  .cog div {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    left: 0;
    background-color: #FF4560;
    border-radius: 5px;
  }
  .cog div:first-child {
    transform: rotate(120deg);
  }
  .cog div:nth-child(2) {
    transform: rotate(240deg);
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

