var Router = new VueRouter({
  routes: [
    { path: '/',    component: UsersTable },
    { path: '/new', component: UserForm },
    { path: '/:id', component: UserForm },
  ]
});
