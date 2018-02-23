var Home = Vue.component('home', {
  computed: {
    userName: function() {
      return this.$store.state.session.currentUser.name;
    }
  },
  template: `
    <div>
      <h3 class="title is-5">Seja bem vindo <i>{{ userName }}</i></h3>
    </div>`
});
