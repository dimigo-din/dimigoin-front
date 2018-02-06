export default {
    name: 'hoverable',

    props: {
        hoverColor: String
    },

    data: () => ({
        defaultHoverColor: null
    }),

    computed: {
        computedHoverClass () {
            return `h-${this.hoverColor || this.defaultHoverColor}:hover`
        },

        hasHoverClass () {
            return !!(this.hoverColor || this.defaultHoverColor)
        }
    }
}
