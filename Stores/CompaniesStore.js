var CompaniesStore = new Vuex.Store({
  state: {
    loading: false,
    company: { id: null, name: null, idade: null },
    all:     []
  },
  mutations: {
    get: function(state, company) {
      state.company = company;
    },
    getAll: function(state, companies) {
      state.all = companies;
    },
    persist: function(state, callback) {
      // usuario persistido pela action
      state.company = {};
      state.loading = false;
      if(typeof(callback) === 'function') callback();
    },
    destroy: function(state, company) {
      // nothing
    }
  },
  actions: {
    get: function(context, id) {
      if(!context.state.all.length) context.dispatch('getAll');
      companySelected = {};
      context.state.all.map(function(company) {
        if(company.id == id) companySelected = company;
      });
      context.commit('get', Object.assign({}, companySelected));
    },
    getAll: function(context) {
      context.commit('getAll', JSON.parse(localStorage.getItem('companies')) || []);
    },
    persist: function(context, callback) {
      if(!context.state.all.length) context.dispatch('getAll');
      if(context.state.company.id) {
        companyIndex = null;
        context.state.all.filter(function(company, index) {
          if(company.id == context.state.company.id) companyIndex = index;
        });
        context.state.all[companyIndex] = context.state.company;
      } else {
        nextId = (context.state.all[context.state.all.length - 1] || {id: 0}).id + 1;
        context.state.all.push(Object.assign(context.state.company, { id: nextId }));
      }
      localStorage.setItem('companies', JSON.stringify(context.state.all));
      context.commit('persist', callback);
    },
    destroy: function(context, company) {
      companyIndex = null;
      context.state.all.filter(function(u, index) {
        if(u.id == company.id) companyIndex = index;
      });
      context.state.all.splice(companyIndex, 1);
      localStorage.setItem('companies', JSON.stringify(context.state.all));
      context.commit('destroy', company);
    }
  }
});
