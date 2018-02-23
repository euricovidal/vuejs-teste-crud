var CompanyForm = Vue.component('company-form', {
  created: function() {
    this.$store.dispatch('get', this.$route.params.id);
  },
  computed: {
    company: function() {
      return this.$store.state.company;
    }
  },
  methods: {
    clearcompany: function() {
      this.$store.state.company = {};
      this.$router.push('/companies');
    },
    save: function() {
      if(!this.$_validate()) return;
      this.$store.state.loading = true;
      this.$store.dispatch('persist', () => {
        this.$router.push('/companies');
      });
    },
    $_validate: function() {
      var valid = true;

      if(!this.company.name) {
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
          <input class="input" ref="name" @keypress.enter="save" v-model.trim="company.name" type="text" placeholder="ex: Nome">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" :class="{'is-loading': $store.state.loading }" @click="save">Salvar</button>
        </div>
        <div class="control">
          <button class="button is-text" @click="clearcompany">Cancelar</button>
        </div>
      </div>
    </div>`
});
