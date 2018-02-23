var Modal = Vue.component('modal', {
  props: {
    title:   { type: String,   required: true  },
    content: { type: String,   required: false },
    success: { type: Function, required: false },
    cancel:  { type: Function, required: false }
  },
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
