var Companies = Vue.component('companies-box', {
  store: CompaniesStore,
  template: `
  <div>
    <div class="tabs">
      <ul>
        <router-link to="/companies" active-class="is-active" tag="li" exact>
          <a>
            <span class="icon is-small"><i class="fas fa-list"></i></span>
            <span>Listagem</span>
          </a>
        </router-link>
        <router-link to="/companies/new" active-class="is-active" tag="li">
          <a>
            <span class="icon is-small"><i class="fas fa-plus"></i></span>
            <span>Novo</span>
          </a>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
  `
});
