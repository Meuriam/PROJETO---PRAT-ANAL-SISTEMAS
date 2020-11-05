<template>
  <div class>
    <div class="p-2 bg-white">
      <div class="form-group">
        <label for="services">Serviços Disponíveis:</label>
        <Multiselect
          v-model="form.services"
          :options="services"
          :searchable="false"
          :close-on-select="true"
          :multiple="false"
          placeholder="Escolha um serviço"
        ></Multiselect>
      </div>
      <!-- SUBMIT -->
      <div class="flex__container">
        <button @click="updateUser()" type="button" class="btn btn-success form-group">Solicitar Orçamento</button>
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
        services: this.profile.services,
      },
      services: this.$store.state.services
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