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
    <!-- GRADELEVEL -->
    <div class="form-group">
      <label for="services">Selecione os serviços que deseja prestar:</label>
      <Multiselect
        v-model="form.services"
        :options="services"
        :searchable="false"
        :close-on-select="false"
        :multiple="true"
        placeholder="Clica aqui para selecionar um ou mais serviços"
      ></Multiselect>
    </div>
    <!-- GRADELEVEL -->
    <!-- RESUME -->
    <div class="form-group">
      <p class>Deseja prestar algum outro serviço que não existe na lista?</p>
      <div class="flex__container">
        <div>
          <input class type="radio" name="addResume" v-model="resumeOpt" :value="true" id="yes" />
          <label for="yes" class="pl-3">Sim</label>
        </div>
        <div class="pl-4">
          <input class type="radio" name="addResume" v-model="resumeOpt" :value="false" id="no" />
          <label for="no" class="pl-3">Não</label>
        </div>
      </div>
      <div v-if="resumeOpt">
        <div class="form-group">
          <label for="resume">Qual o serviço desejado?</label>
          <input v-model="form.resume" type="url" class="form-control" id="resume" />
        </div>
      </div>
    </div>
    <!-- RESUME -->   
    <!-- state -->
    <div class="form-group">
      <label for="state">Em qual estado você deseja encontrar serviços?</label>
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
  name: "FormContratado",
  components: { Multiselect },
  data() {
    return {
      services: this.$store.state.services,
      state: this.$store.state.state,
      confirmPassword: "",
      form: {
        type: "contratado",
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
      }
      window.scrollTo(0, 0);
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
