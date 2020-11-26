<template>
  <div class>
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
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            id="password"
          />
        </div>
        <div class="form-group pl-3">
          <label for="checkpass">Confirmação de senha:</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="form-control"
            id="checkpass"
          />
        </div>
      </div>
      <!-- PASSWORD -->
      <!-- BIRTHDAY -->
      <div class="form-group">
        <label for="birthday">Data de nascimento:</label>
        <input v-model="form.birthday" type="date" class="form-control" id="birthday" />
      </div>
      <!-- BIRTHDAY -->
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
      <!-- state -->
    <div class="form-group">
      <label for="state">Em qual estado você deseja encontrar serviços?</label>
      <multiselect
        v-model="form.state"
        placeholder="Estado"
        :options="state"
        :searchable="true"
        :allow-empty="true"
        :close-on-select="true"
      >
      </multiselect>
    </div>
      <!-- state -->
      <!-- SUBMIT -->
      <div class="flex__container">
        <button @click="updateUser()" type="button" class="btn btn-success form-group">Atualizar</button>
      </div>
      <!-- SUBMIT -->
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  props: ["profile"],
  data() {
    return {
      form: {
        type: "contratado",
        name: this.profile.name,
        email: this.profile.email,
        oldPassword: this.profile.oldPassword,
        newPassword: this.profile.newPassword,
        birthday: this.profile.birthday.split("T")[0],
        state: this.profile.state,
        services: this.profile.services,
        image: this.image,
      },
      services: this.$store.state.services,
      state: this.$store.state.state      
    };
  },
  methods: {
    updateUser() {
      this.form.image = this.image;
      this.$store.dispatch("updateUser", {
        _id: this.profile._id,
        new: this.form
      });
    }
  },
  computed: {
    image() {
      return this.$store.getters.currentUser.image;
    }
  },
  components: { Multiselect }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.flex__container {
  display: flex;
}
.fullwidth {
  width: 100%;
}
</style>
