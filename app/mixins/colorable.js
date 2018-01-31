export default {
    name: 'colorable',

    props: {
        color: String
    },

    data: () => ({
        defaultColor: null
    }),

    computed: {
        computedColorClass() {
            return this.color || this.defaultColor
        },
        computedTextColorClass() {
            return this.computedColorClass + '--text'
        },
        hasColor () {
            return this.computedColorClass
        },
        hasTextColor () {
            return this.computedColorClass
        }
    }
}
