<template>
  <div class>
  <p class="text-center font-weight-bold">Histórico de Serviços</p>
    <div class="p-2 bg-white">
      <div class="form-group">
        <label for="services">Orçamentos Pendentes:</label>

      </div>
    </div>
  </div>
</template>
<script>
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