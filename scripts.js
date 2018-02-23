usersStore = new Vuex.Store({
  state: {
    loading: false,
    user: { id: null, name: null, idade: null },
    users: []
  },
  mutations: {
    get: function(state, user) {
      state.user = user;
    },
    getAll: function(state, users) {
      state.users = users;
    },
    persist: function(state, callback) {
      // usuário persistido pela action
      state.user = {};
      state.loading = false;
      if(typeof(callback) === 'function') callback();
    },
    destroy: function(state, user) {
      // nothing
    }
  },
  actions: {
    get: function(context, id) {
      if(!context.state.users.length) context.dispatch('getAll');
      userSelected = {};
      context.state.users.map(function(user) {
        if(user.id == id) userSelected = user;
      });
      context.commit('get', Object.assign({}, userSelected));
    },
    getAll: function(context) {
      context.commit('getAll', JSON.parse(localStorage.getItem('users')) || []);
    },
    persist: function(context, callback) {
      if(!context.state.users.length) context.dispatch('getAll');
      if(context.state.user.id) {
        userIndex = null;
        context.state.users.filter(function(user, index) {
          if(user.id == state.user.id) userIndex = index;
        });
        context.state.users[userIndex] = state.user;
      } else {
        nextId = (context.state.users[context.state.users.length - 1] || {id: 0}).id + 1;
        context.state.users.push(Object.assign(context.state.user, { id: nextId }));
      }
      localStorage.setItem('users', JSON.stringify(context.state.users));
      context.commit('persist', callback);
    },
    destroy: function(context, user) {
      userIndex = null;
      context.state.users.filter(function(u, index) {
        if(u.id == user.id) userIndex = index;
      });
      context.state.users.splice(userIndex, 1);
      localStorage.setItem('users', JSON.stringify(context.state.users));
      context.commit('destroy', user);
    }
  }
});

var UsersTable = Vue.component('user-table', {
  data() {
    return { modal: { show: false } };
  },
  computed: {
    users: function() {
      return this.$store.state.users;
    }
  },
  created: function() {
    this.$store.dispatch('getAll');
  },
  methods: {
    show: function(user) {
      this.$router.push('/' + user.id);
    },
    destroy: function(user) {
      this.modal.title = 'Apagar usuário';
      this.modal.content = 'Certeza que deseja apagar o usuário ' + user.name + '?';
      this.modal.success = () => {
        this.$store.dispatch('destroy', user);
        this.resetModal();
      }
      this.modal.cancel = this.resetModal
      this.modal.show = true;
    },
    resetModal: function() {
      this.modal = { show: false };
    }
  },
  template: `
    <div>
      <table v-if="users.length" class="table is-bordered is-striped is-narow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.idade }}</td>
            <td>
              <button @click="show(user)" class="button is-info"><i class="fa fa-pencil-alt"></i></button>
              <button @click="destroy(user)" class="button is-info"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else="users.length">Sem usuário cadastrado</p>
      <modal :class="{'is-active': modal.show}" :title="modal.title" :content="modal.content" :cancel="modal.cancel" :success="modal.success"></modal>
    </div>`
});

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
    validate: function() {
      valid = true;

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
    },
    clearUser: function() {
      this.$store.state.user = {};
      this.$router.push('/');
    },
    save: function() {
      if(!this.validate()) return;
      this.$store.state.loading = true;
      this.$store.dispatch('persist', () => {
        this.$router.push('/');
      });
    },
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
          <input class="input" ref="age" @keypress.enter="save" v-model.trim.number="user.idade" type="text" placeholder="ex: Idade">
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

Vue.component('modal', {
  props: ['title', 'content', 'success', 'cancel'],
  methods: {
    yes: function() {
      this.success();
    },
    no: function() {
      this.cancel();
    }
  },
  template: `
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ title }}</p>
          <button @click="no" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <slot name="content">{{ content }}</slot>
        </section>
        <footer class="modal-card-foot">
          <slot name="buttons">
            <button v-if="success" @click="yes" class="button is-success">Sim</button>
            <button v-if="cancel" @click="no" class="button">Não</button>
          </slot>
        </footer>
      </div>
    </div>`
});

var router = new VueRouter({
  routes: [
    { path: '/',    component: UsersTable },
    { path: '/new', component: UserForm },
    { path: '/:id', component: UserForm },
  ]
});

var app = new Vue({
  el: '#app',
  data: {},
  computed: {},
  router: router,
  store: usersStore
})
