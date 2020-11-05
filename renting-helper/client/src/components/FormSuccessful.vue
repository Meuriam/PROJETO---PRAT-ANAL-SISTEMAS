<template>
  <div class="col-lg-6 col-md-12 col-sm-12 col-12">
    <div class="p-3 mt-3 bg-white">
      <p class="title-1 text-center">{{this.$store.state.message.data}}</p>
      <div class="flex__container">
        <p class>
          Clique no botão para ser redirecionado
          <br />para a página de login
        </p>
        <a href="/">
          <button type="button" class="btn btn-success ">Ir</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title-1 {
  font-size: 26px;
}
.flex__container {
  display: flex;
  justify-content: space-between;
}
</style>