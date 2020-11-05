<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row pt-5 pb-5">
        <div class="col-lg-6 col-md-12 col-sm-12 col-12">
          <h1 class="title-1">Integre-se com o Melhores Prestadores de Serviço da sua região com o RentingHelper</h1>
          <p class="lead">
            RentingHelper é uma plataforma onde você pode encontrar o solução para seus problemas dentro de casa. Aqui
            você irá encontrar Prestadores de Serviço confiáveis para quebrar aquele galho.
          </p>
        </div>
        <FormRegister v-if="!success" />
        <FormSuccessful v-if="success" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import FormRegister from "../components/FormRegister";
import FormSuccessful from "../components/FormSuccessful";

export default {
  name: "App",
  components: {
    Navbar,
    FormRegister,
    FormSuccessful
  },
  computed: {
    success() {
      return this.$store.state.message.type == "success";
    }
  }
};
</script>

<style></style>
