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
        active: {
            type: Boolean,
            default: true
        },
        loading: Boolean,
        href: String,
        small: Boolean,
        large: Boolean,
        text: Boolean,
    },

    data: () => ({
        defaultColor: 'red',
        defaultTextcolor: 'white',
        defaultHoverColor: 'red--dark'
    }),

    computed: {
            computedClass () {
                const classes = {
                    'c-btn': true,
                    'h-font--extra-bold': true,
                    [this.computedColorClass]: this.hasColor,
                    [this.computedTextColorClass]: this.hasTextColor,
                    [this.computedHoverClass]: this.hasHoverClass && this.isActive,
                    'h-float-right': this.right,
                    'h-float-left': this.left,
                    'h-text--s': this.small,
                    'h-text--l': this.large,
                    'c-btn--text': this.text,
                    'c-btn--cursor-disable': !this.isActive
                }
                return classes
            },

            isActive () {
                return !this.loading && this.active
            },

            /* Override Colorable */
            computedColorClass () {
                return this.isActive ?
                    `h-${this.color || this.defaultColor}` :
                    `h-${this.hoverColor || this.defaultHoverColor}`
            }
    },

    methods: {
        click (e) {
            this.$emit('click', e)
        }
    }
}
</script>

<template>
    <a
        v-if="!loading"
        :class="computedClass"
        :href="href"
        v-ripple="'rgba(255, 255, 255, .2)'"
        @click="click"
    >
        <slot></slot>
    </a>
    <a
        v-else
        :class="computedClass"
    >
        <dimi-loader
            v-if="loading"
            :color="this.computedTextColorClass"
        ></dimi-loader>
        <slot v-else></slot>
    </a>
</template>

<style lang='scss' scoped>

.c-btn {
    padding: 0.8em 2.7em;
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

.c-btn--text {
    background-color: transparent;
}

.c-btn--cursor-disable {
    cursor: default;
}

</style>
