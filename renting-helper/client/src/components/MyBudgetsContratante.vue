<template>
  <div class>
  <p class="text-center font-weight-bold">Histórico de Orçamentos</p>
    <div class="bg-white">
        <label for="services">Orçamentos Pendentes:</label>   
        <div class="d-flex flex-row justify-content-between bg-light p-4 rounded border mb-4" v-for="budget in budgets" :key="budget._id">
         <div class="d-flex flex-column">
            <span><b>Contratante: </b>{{budget.contratante.name}}</span>
            <span><b>Serviço: </b>{{budget.service}}</span>
            <span><b>Data: </b>{{new Date(budget.date.replace("Z", "")).toLocaleString().split(" ")[0]}}</span>
            <span><b>Valor do Serviço:</b> {{formatValue(budget.value)}}</span>
         </div>
         <div class="d-flex flex-column">
            <button @click="updateBudget(budget._id, 2)" type="submit" class="btn btn-success form-group">Aceitar Orçamento</button>
            <button @click="updateBudget(budget._id, 99)" type="submit" class="btn btn-danger form-group">Recusar Orçamento</button>    
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch("retrieveBudgets");
  } ,
  props: ["profile"],
  data() {
    return {
      searchData: this.$store.state.search,
      form: {
        type: "contratado",
        services: this.$store.state.services,
      },
      services: this.$store.state.services,
      formatter:  new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',})
    };
  },
  methods: {
    search() {
      this.$store.dispatch("searchUsers");
    },
    requestBudget(id){
      var selectedServices = this.form.services
      this.$store.dispatch("requestBudget", {id, selectedServices});
    },
    updateBudget(id, newStatus){
       this.$store.dispatch("updateBudget", {id, newStatus});       
    },
    formatValue(value){
      return this.formatter.format(value);
    }
  },
  computed: {
    image() {
      return this.$store.getters.currentUser.image;
    },
    budgets(){
        return this.$store.state.budgets.filter(budget => {
        return budget.status == 1
      }) 
    }    
  },
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
  width: 160px;
}
</style>