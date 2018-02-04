export default {
    name: 'colorable',

    props: {
        color: String,
        textColor: String
    },

    data: () => ({
        defaultColor: null,
        defaultTextcolor: null
    }),

    computed: {
        computedColorClass() {
            return `h-${this.color || this.defaultColor}`
        },

        computedTextColorClass() {
            return `h-text--${this.textColor || this.defaultTextcolor}`
        },

        hasColor () {
            return !!(this.color || this.defaultColor)
        },

        hasTextColor () {
            return !!(this.textColor || this.defaultTextcolor)
        }
    }
}
