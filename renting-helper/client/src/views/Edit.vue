<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mb-3">
        <Profile :profile="$store.getters.currentUser" />
        <div class="mt-3 col-xlg-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <!-- FOTO -->
          <div class="form-group">
            <ImageUpload />
          </div>
          <!-- FOTO -->
          <div
            v-if="this.$store.getters.showMessage"
            v-bind:class="'alert alert-' + $store.state.message.type"
          >{{$store.state.message.data}}</div>
          <!-- FORMDEPESQUISADOR -->
          <FormEditProfileContratado
            v-if="$store.getters.currentUser.type == 'contratado'"
            :profile="$store.getters.currentUser"
            class="bg-white p-3"
          />
          <FormEditProfileContratante
            v-if="$store.getters.currentUser.type == 'contratante'"
            :profile="$store.getters.currentUser"
            class="bg-white p-3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Profile from "../components/ProfileColumn";
import FormEditProfileContratado from "../components/FormEditProfileContratado";
import FormEditProfileContratante from "../components/FormEditProfileContratante";
import ImageUpload from "../components/ImageUpload";
export default {
  name: "Edit",
  components: {
    Navbar,
    Profile,
    FormEditProfileContratado,
    FormEditProfileContratante,
    ImageUpload
  },
  data() {
    return { profile: null };
  }
};
</script>

<style></style>