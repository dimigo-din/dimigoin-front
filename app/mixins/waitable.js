export default {
  data () {
    return {
      waitable_ids: []
    }
  },
  methods: {
    /**
     * @param {string} id
     */
    start (id) {
      this.waitable_ids.push(id)
    },

    /**
     * @param {string} id
     */
    finish (id) {
      this.waitable_ids.splice(this.waitable_ids.indexOf(id), 1)
    },

    /**
     * @param {string} id
     * @returns {boolean}
     */
    isPending (id) {
      return this.waitable_ids.includes(id)
    }
  }
}
