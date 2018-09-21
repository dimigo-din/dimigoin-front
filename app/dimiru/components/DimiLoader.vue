<script>
export default {
  name: 'DimiLoader'
}
</script>

<template>
  <div class="loader"/>
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
  animation: spinning 1s infinite linear;
  border-radius: 50%;
  display: inline-block;
  height: 50px;
  margin: 3em;
  position: relative;
  vertical-align: middle;
  width: 50px;
}

.loader::before,
.loader::after {
  border-radius: 50%;
  content: '';
  height: 80%;
  left: 0;
  position: absolute;
  top: 5%;
  width: 80%;
}

.loader::before {
  background-color: $red;
}

.loader::after {
  background-color: lighten($red, 20%);
}

.loader::before {
  animation: scaling 1s infinite alternate ease-in-out;
  left: 0;
  transform-origin: 10% 50%;
}

.loader::after {
  animation: scaling 1s 1s infinite alternate ease-in-out;
  left: auto;
  right: 0;
  transform: scale(0);
  transform-origin: 90% 50%;
}
</style>
