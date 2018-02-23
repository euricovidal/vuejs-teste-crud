var SessionModule = {
  state: {
    currentUser: { name: 'Visitante' },
  },
  mutations: {
    getUser: function(state, user) {
      state.currentUser = user;
    },
    changeName: function(state, name) {
      // alterado na action
    }
  },
  actions: {
    getUser: function(context) {
      context.commit('getUser', JSON.parse(localStorage.getItem('currentUser')) || { name: 'Visitante' });
    },
    changeName: function(context, name) {
      context.state.currentUser.name = name;
      localStorage.setItem('currentUser', JSON.stringify(context.state.currentUser));
      context.commit('changeName', name);
    },
  }
};
