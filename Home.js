var Home = Vue.component('home', {
  computed: {
    userName: function() {
      return this.$store.state.session.currentUser.name;
    }
  },
  template: `
    <div>
      <p>Seja bem vindo <i>{{ userName }}</i></p>
    </div>`
});
