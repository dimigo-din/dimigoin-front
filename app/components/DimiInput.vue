<script>
export default {
    name: 'DimiInput'
}
</script>

<template>
    <input class="input">
</template>

<style lang="scss" scoped>
.input {
    appearance: none;
    border: none;
    height: 3em;
    min-width: 25em;
    background-color: #f3f3f3;
    border-radius: 20px;
    &:not(:last-child) {
        margin-bottom: 2em;
    }
    padding-left: 2em;
}
</style>
