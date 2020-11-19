<template>
  <div class>
  <p class="text-center font-weight-bold">Catálogo de Serviços</p>
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
        <button @click="search()" type="button" class="btn btn-success form-group">Buscar</button>
      </div>
      <!-- SUBMIT -->
      <div>
      <pre v-for="user in $store.state.search" :key="user._id">
        {{user.name}}
        <button @click="requestBudget(user._id)" type="button" class="btn btn-success form-group">Solicitar Orçamento</button>
      </pre>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  props: ["profile"],
  data() {
    return {
      searchData: this.$store.state.search,
      form: {
        type: "contratado",
        services: this.$store.state.services,
      },
      services: this.$store.state.services
    };
  },
  methods: {
    search() {
      this.$store.dispatch("searchUsers");
    },
    requestBudget(id){
      var selectedServices = this.form.services
      this.$store.dispatch("requestBudget", {id, selectedServices});
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