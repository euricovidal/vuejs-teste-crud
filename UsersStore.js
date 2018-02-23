var usersStore = new Vuex.Store({
  state: {
    loading: false,
    user:    { id: null, name: null, idade: null },
    users:   []
  },
  mutations: {
    get: function(state, user) {
      state.user = user;
    },
    getAll: function(state, users) {
      state.users = users;
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
