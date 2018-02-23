var UsersStore = new Vuex.Store({
  state: {
    loading: false,
    user:    { id: null, name: null, idade: null },
    all:     []
  },
  mutations: {
    get: function(state, user) {
      state.user = user;
    },
    getAll: function(state, users) {
      state.all = users;
    },
    persist: function(state, callback) {
      // usuario persistido pela action
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
      if(!context.state.all.length) context.dispatch('getAll');
      userSelected = {};
      context.state.all.map(function(user) {
        if(user.id == id) userSelected = user;
      });
      context.commit('get', Object.assign({}, userSelected));
    },
    getAll: function(context) {
      context.commit('getAll', JSON.parse(localStorage.getItem('users')) || []);
    },
    persist: function(context, callback) {
      if(!context.state.all.length) context.dispatch('getAll');
      if(context.state.user.id) {
        userIndex = null;
        context.state.all.filter(function(user, index) {
          if(user.id == context.state.user.id) userIndex = index;
        });
        context.state.all[userIndex] = context.state.user;
      } else {
        nextId = (context.state.all[context.state.all.length - 1] || {id: 0}).id + 1;
        context.state.all.push(Object.assign(context.state.user, { id: nextId }));
      }
      localStorage.setItem('users', JSON.stringify(context.state.all));
      context.commit('persist', callback);
    },
    destroy: function(context, user) {
      userIndex = null;
      context.state.all.filter(function(u, index) {
        if(u.id == user.id) userIndex = index;
      });
      context.state.all.splice(userIndex, 1);
      localStorage.setItem('users', JSON.stringify(context.state.all));
      context.commit('destroy', user);
    }
  }
});
