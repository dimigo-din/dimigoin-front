<script>
import { debounce } from '../src/util'

import { factory as PositionableFactory } from '../mixins/positionable'
import Colorable from '../mixins/colorable'
import Hoverable from '../mixins/hoverable'

import DimiLoader from './DimiLoader.vue'

export default {
    name: 'DimiButton',
    mixins: [PositionableFactory(['left', 'right']), Colorable, Hoverable],
    components: { DimiLoader },
    props: {
        loading: Boolean,
        href: String,
        small: Boolean,
        large: Boolean,
        ripple: Boolean
    },
    data: () => ({
        defaultColor: 'red',
        defaultHoverColor: 'red-dark'
    }),
    computed: {
            computedClass () {
                const classes = {
                    'c-btn': true,
                    'font--extra-bold': true,
                    [this.computedColorClass]: this.hasColor,
                    [this.computedTextColorClass]: this.hasTextColor,
                    [this.computedHoverClass]: this.hasHoverClass,
                    'text--s': this.small,
                    'text--l': this.large,
                    'c-btn--cursor-disable': this.loading
                }
                return classes
            }
    },
    methods: {
        click (e) {
            this.$emit('click', e)
        },

        addRipple () {

        },

        cleanRipple () {

        }
    }
}
</script>

<template>
    <a :class="computedClass"
        @click="click"
        :href="href"
    >
        <dimi-loader
            v-if="loading"
            :color="this.computedColor"
            @mousedown="addRipple"
            @mouseup="debounce(cleanRipple, 2000)"
        ></dimi-loader>
        <slot v-else></slot>
        <div
            v-if="ripple"
            class="c-btn__ripple"
        ></div>
    </a>
</template>


<style lang='scss' scoped>

.c-btn {
    padding: 0.9em 3.6em;
    border-radius: 2rem;
    appearance: none;
    align-items: center;
    box-shadow: none;
    display: inline-flex;
    justify-content: flex-start;
    position: relative;
    vertical-align: top;
    user-select: none;
    cursor: pointer;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    transition: .5s background-color ease;
}

.c-btn--cursor-disable {
    cursor: default;
}

.c-btn__ripple {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    & span {
        transform: scale(0);
        border-radius: 100%;
        position: absolute;
        opacity: 0.75;
        background-color: #fff;
        animation: ripple 1000ms;
    }
}

@keyframes ripple {
 to {
   opacity  : 0;
   transform: scale(2);
 }
}

</style>
