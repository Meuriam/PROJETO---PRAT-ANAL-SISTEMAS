<template>
  <div class="pt-3 pb-3">
    <!-- NAME -->
    <div class="form-group">
      <label for="name">Nome Completo:</label>
      <input v-model="form.name" type="text" class="form-control" id="name" />
    </div>
    <!-- NAME -->
    <!-- EMAIL -->
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="form.email" type="email" class="form-control" id="email" />
    </div>
    <!-- EMAIL -->
    <!-- PASSWORD -->
    <div class="flex__container">
      <div class="form-group pr-3">
        <label for="password">Senha:</label>
        <input v-model="form.password" type="password" class="form-control" id="password" />
      </div>
      <div class="form-group pl-3">
        <label for="checkpass">Confirmação de senha:</label>
        <input v-model="confirmPassword" type="password" class="form-control" id="checkpass" />
      </div>
    </div>
    <!-- PASSWORD -->
    <!-- BIRTHDAY -->
    <div class="form-group">
      <label for="birthday">Data de nascimento:</label>
      <input v-model="form.birthday" type="date" class="form-control" id="birthday" />
    </div>
    <!-- BIRTHDAY -->
    <!-- state -->
    <div class="form-group">
      <label for="state">Em qual estado você mora?</label>
      <multiselect
        v-model="form.state"
        placeholder="Estado"
        :options="state"
        :searchable="true"
        :allow-empty="false"
        :close-on-select="true"
      >
      </multiselect>
    </div>
    <!-- state -->
    <!-- SUBMIT -->
    <div class="flex__container">
      <button @click="validate()" type="button" class="btn btn-success form-group">Cadastrar</button>
    </div>
    <!-- SUBMIT -->
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "FormContratante",
  components: { Multiselect },
  data() {
    return {
      services: this.$store.state.services,
      state: this.$store.state.state,
      confirmPassword: "",
      form: {
        type: "contratante",
        name: "",
        email: "",
        password: "",
        birthday: "",
        state: "",
        services: [],
      },
      resumeOpt: false,
      errors: []
    };
  },
  methods: {
    validate() {
      let valid = true;
      let message = "";

      if (this.form.password != this.confirmPassword) {
        valid = false;
        message = "As senhas não conferem";
      }

      if (valid) {
        this.register();
      } else {
        this.$store.commit("updateMessage", { type: "danger", data: message });
        window.scrollTo(0, 0);
      }
    },
    register() {
      this.$store.dispatch("createUser", this.form);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.flex__container {
  display: flex;
}
.form-group {
  width: 100%;
}
</style>
