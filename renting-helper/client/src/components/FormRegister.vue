<template>
  <div class="col-lg-6 col-md-12 col-sm-12 col-12">
    <p class="title-1 text-center">
      <b>Registre-se no RentingHelper</b>
    </p>
    <div class="panel bg-white">
      <div class="p-3">
        <div
          v-if="$store.getters.showMessage"
          v-bind:class="'alert alert-' + $store.state.message.type"
        >{{$store.state.message.data}}</div>
        <p>Qual seu perfil de usuário?</p>
        <div class="flex__container">
          <div class>
            <input
              type="radio"
              id="Contratado"
              name="formType"
              v-model="formType"
              :value="() => import('./FormContratado.vue')"
            />
            <label for="Contratado" class="pl-3">Prestador de Serviço (Contratado)</label>
          </div>
          <div class>
            <input
              type="radio"
              id="Contratante"
              name="formType"
              v-model="formType"
              :value="() => import('./FormContratante.vue')"
            />
            <label for="Contratante" class="pl-3">Contratante</label>
          </div>
        </div>
        <keep-alive>
          <component :is="formType"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormRegister",
  data() {
    return {
      formType: null
    };
  },
  methods: {}
};
</script>

<style scoped>
.title-1 {
  font-size: 26px;
}
.flex__container {
  display: flex;
  justify-content: space-between;
}
label,
input {
  display: inline-block;
  cursor: pointer;
}
</style>
