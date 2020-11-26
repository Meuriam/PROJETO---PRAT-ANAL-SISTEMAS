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
      <div class="flex__container">
        <button @click="search()" type="button" class="btn btn-success form-group">Buscar</button>
      </div><br>
      <div>
      <div class="d-flex flex-row justify-content-between bg-light p-4 rounded border mb-4" v-for="user in $store.state.search" :key="user._id">
        <div class="d-flex flex-column">
           <span><b>Marido de Aluguel:</b> {{user.name}}</span>
           <span><b>Serviço:</b> {{form.services}}</span>
           <span><b>Estado:</b> {{user.state}}</span>
        </div>
        <div class="d-flex flex-column">
           <label for="date"><b> Data de Agendamento:</b></label>
           <input v-model="form.date" :min="today()" type="date" class="form-control mb-4" id="date" />
           <button @click="requestBudget(user._id)" type="button" class="btn btn-success form-group">Solicitar Orçamento</button>
        </div>        
      </div>
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
        services: [],
      },
      services: this.$store.state.services
    };
  },
  methods: {
    search() {
      var service = this.form.services
      this.$store.dispatch("searchUsers", {service});
    },
    requestBudget(id){
      var selectedServices = this.form.services
      var selectedDate = this.form.date
      if (!selectedDate){
        return this.$store.commit("updateMessage", {
          type: "danger",
          data: "A data de agendamento é obrigatória.",
        });
      }
      this.$store.dispatch("requestBudget", {id, selectedServices, selectedDate});
    },
    today(){
      return new Date().toISOString().substring(0,10);
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
.form-control{
  width: 176px;
}
</style>