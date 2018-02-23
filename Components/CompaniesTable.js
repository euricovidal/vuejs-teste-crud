var CompaniesTable = Vue.component('companies-table', {
  data () {
    return {
      modal: { show: false, title: '' }
    };
  },
  computed: {
    companies: function() {
      return this.$store.state.all;
    }
  },
  created: function() {
    this.$store.dispatch('getAll');
  },
  methods: {
    show: function(company) {
      this.$router.push('/companies/' + company.id);
    },
    destroy: function(company) {
      this.modal.title   = 'Apagar empresa';
      this.modal.content = 'Certeza que deseja apagar a empresa ' + company.name + '?';
      this.modal.cancel  = this.$_resetModal
      this.modal.success = () => {
        this.$store.dispatch('destroy', company);
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
      <table v-if="companies.length" class="table is-bordered is-striped is-narow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, index) in companies" :key="company.id">
            <td>{{ company.id }}</td>
            <td>{{ company.name }}</td>
            <td>
              <button @click="show(company)" class="button is-info"><i class="fa fa-pencil-alt"></i></button>
              <button @click="destroy(company)" class="button is-info"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else="companies.length">Sem empresa cadastrada</p>
      <modal :class="{'is-active': modal.show}" :title="modal.title" :content="modal.content" :cancel="modal.cancel" :success="modal.success"></modal>
    </div>`
});
