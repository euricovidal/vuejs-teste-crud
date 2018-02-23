var UserForm = Vue.component('user-form', {
  created: function() {
    this.$store.dispatch('get', this.$route.params.id);
  },
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  methods: {
    clearUser: function() {
      this.$store.state.user = {};
      this.$router.push('/users');
    },
    save: function() {
      if(!this.$_validate()) return;
      this.$store.state.loading = true;
      this.$store.dispatch('persist', () => {
        this.$router.push('/users');
      });
    },
    $_validate: function() {
      var valid = true;

      if(!this.user.idade || typeof(this.user.idade) !== 'number') {
        this.$refs.age.focus();
        this.$refs.age.classList.add('is-danger');
        valid = false;
      } else {
        this.$refs.age.classList.remove('is-danger');
      }

      if(!this.user.name) {
        this.$refs.name.focus();
        this.$refs.name.classList.add('is-danger');
        valid = false;
      } else {
        this.$refs.name.classList.remove('is-danger');
      }

      return valid;
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
      <div class="field">
        <label class="label">Idade</label>
        <div class="control">
          <input class="input" ref="age" @keypress.enter="save" v-model.trim.number="user.idade" type="text" placeholder="ex: 20">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" :class="{'is-loading': $store.state.loading }" @click="save">Salvar</button>
        </div>
        <div class="control">
          <button class="button is-text" @click="clearUser">Cancelar</button>
        </div>
      </div>
    </div>`
});
