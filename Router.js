var Router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    {
      path: '/users',
      component: Users,
      children: [
        { path: '',    component: UsersTable },
        { path: 'new', component: UserForm },
        { path: ':id', component: UserForm }
      ]
    },
    {
      path: '/companies',
      component: Companies,
      children: [
        { path: '',    component: CompaniesTable },
        { path: 'new', component: CompanyForm },
        { path: ':id', component: CompanyForm }
      ]
    },
    { path: '/profile', component: ProfileForm },
  ]
});
