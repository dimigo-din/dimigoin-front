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
            return 'hover:' + (this.hoverColor || this.defaultHoverColor)
        },
        hasHoverClass () {
            return this.computedHoverClass
        }
    }
}
