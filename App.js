var app = new Vue({
  el:       '#app',
  data:     {},
  router:   Router,
  store:    CommonStore,
  created: function() {
    this.$store.dispatch('getUser');
  },
  computed: {
    pageTitle: function() {
      return this.$store.state.parameters.parameters.pageTitle;
    }
  },
  methods: {
    toggleMenu: function() {
      this.menu.opened = !this.menu.opened;
    }
  }
})
