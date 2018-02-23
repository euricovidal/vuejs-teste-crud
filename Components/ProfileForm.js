var ProfileForm = Vue.component('profile-form', {
  computed: {
    user: function() {
      return this.$store.state.session.currentUser;
    }
  },
  methods: {
    save: function() {
      if(!this.user.name.length) return;
      this.$store.dispatch('changeName', this.user.name);
      this.$router.push('/')
    }
  },
  mounted: function() {
    this.$refs.name.focus();
  },
  template: `
    <div>
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input class="input" ref="name" @keypress.enter="save" v-model.trim="user.name" type="text" placeholder="ex: Nome">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" :class="{'is-loading': $store.state.loading }" @click="save">Salvar</button>
        </div>
      </div>
    </div>`
});
