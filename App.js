var app = new Vue({
  el:       '#app',
  data:     { menu: { opened: false } },
  computed: {},
  router:   Router,
  store:    CommonStore,
  created: function() {
    this.$store.dispatch('getUser');
  },
  methods: {
    toggleMenu: function() {
      this.menu.opened = !this.menu.opened;
    }
  }
})
