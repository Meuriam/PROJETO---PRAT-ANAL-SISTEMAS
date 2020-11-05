<template>
  <div class>
    <div class="p-3 bg-white">
      <!-- NAME -->
      <div class="form-group">
        <label for="name">Nome Completo:</label>
        <input v-model="form.name" type="text" class="form-control" id="name" />
      </div>
      <!-- NAME -->
      <!-- PASSWORD -->
      <div class="flex__container form-group justify-content-between">
        <div class="form-group fullwidth pr-3">
          <label for="password">Senha atual:</label>
          <input v-model="form.oldPassword" type="password" class="form-control" id="password" />
        </div>
        <div class="form-group fullwidth pl-3">
          <label for="checkpass">Senha nova:</label>
          <input v-model="form.newPassword" type="password" class="form-control" id="checkpass" />
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
        <label for="services">Escolaridade:</label>
        <Multiselect
          v-model="form.services"
          :options="services"
          :searchable="false"
          :close-on-select="true"
          :multiple="false"
          placeholder="Escolaridade"
        ></Multiselect>
      </div>
      <!-- GRADELEVEL -->
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
        type: "contrante",
        name: this.profile.name,
        email: this.profile.email,
        oldPassword: this.profile.oldPassword,
        newPassword: this.profile.newPassword,
        birthday: this.profile.birthday.split("T")[0],
        services: this.profile.services,
        image: this.image
      },
      services: this.$store.state.services,
      locales: this.$store.state.locales
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