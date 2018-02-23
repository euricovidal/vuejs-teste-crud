var UsersTable = Vue.component('user-table', {
  data () {
    return {
      modal: { show: false, title: '' }
    };
  },
  computed: {
    users: function() {
      return this.$store.state.all;
    }
  },
  created: function() {
    this.$store.dispatch('getAll');
  },
  methods: {
    show: function(user) {
      this.$router.push('/users/' + user.id);
    },
    destroy: function(user) {
      this.modal.title   = 'Apagar usuário';
      this.modal.content = 'Certeza que deseja apagar o usuário ' + user.name + '?';
      this.modal.cancel  = this.$_resetModal
      this.modal.success = () => {
        this.$store.dispatch('destroy', user);
        this.$_resetModal();
      }
      this.modal.show = true;
    },
    $_resetModal: function() {
      this.modal = { show: false, title: '' };
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
          <tr v-for="(user, index) in users" :key="user.id">
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
