<template>
  <div class="row pt-5 pb-5">
    <div class="col-lg-6 col-md-10 col-sm-12 col-12">&nbsp;</div>
    <div class="col-lg-6 col-md-10 col-sm-12 col-12">
      <p class="text-center title-1">
        <b>Login:</b>
      </p>
      <div
          v-if="this.$store.getters.showMessage"
          v-bind:class="'alert alert-' + $store.state.message.type"
        >{{$store.state.message.data}}</div>
      <div class="p-3 bg-white">
        <!-- EMAIL -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input @keydown.enter="login()" v-model="form.email" type="email" class="form-control" id="email" />
        </div>
        <!-- EMAIL -->
        <!-- PASSWORD -->
        <div class="form-group">
          <label for="password">Senha:</label>
          <input @keydown.enter="login()" v-model="form.password" type="password" class="form-control" id="password" />
        </div>
        <!-- PASSWORD -->
        <!-- SUBMIT -->

        <div class="flex__container">
          <div class>
            <button @click="login()" type="button" class="btn btn-success">Entrar</button>
          </div>
          <span class>
            Ainda não possui uma conta?
            <a href="/cadastro">Cadastre-se</a>
          </span>
        </div>
        <!-- SUBMIT -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormLogin",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      const login = await this.$store.dispatch('retrieveSession', this.form)
      if(login) location.href = '/feed'
    }
  }
};
</script>

<style scoped>
.flex__container {
  display: flex;
  justify-content: space-between;
}
.form-group {
  width: 100%;
}
.btn {
  width: 100px;
}
.title-1 {
  font-size: 20px;
}
</style>