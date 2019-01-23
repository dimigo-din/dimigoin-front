<script>
export default {
  name: 'DimiLoader'
}
</script>

<template>
  <div class="loader" />
</template>

<style lang="scss">
@import '../scss/vars';

@keyframes spinning {
  0% { transform: rotate(20deg); }
  100% { transform: rotate(380deg); }
}

@keyframes scaling {
  0% { transform: scale(0.3); }
  100% { transform: scale(0.7); }
}

.loader {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 3em;
  animation: spinning 1s infinite linear;
  border-radius: 50%;
  vertical-align: middle;
}

.loader::before,
.loader::after {
  position: absolute;
  top: 5%;
  left: 0;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  content: '';
}

.loader::before {
  background-color: $red;
}

.loader::after {
  background-color: lighten($red, 20%);
}

.loader::before {
  left: 0;
  animation: scaling 1s infinite alternate ease-in-out;
  transform-origin: 10% 50%;
}

.loader::after {
  right: 0;
  left: auto;
  animation: scaling 1s 1s infinite alternate ease-in-out;
  transform: scale(0);
  transform-origin: 90% 50%;
}
</style>
