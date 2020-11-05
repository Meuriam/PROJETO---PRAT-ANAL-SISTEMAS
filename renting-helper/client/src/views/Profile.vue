<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mb-3">
        <Profile :profile="profile" />
        <div
          class="col-lg-6 col-md-12 col-sm-12 col-12 order-xl-0 order-lg-0 order-md-1"
        >
          <div
            v-if="this.$store.getters.showMessage"
            v-bind:class="'mt-3 alert alert-' + $store.state.message.type"
          >
            {{ $store.state.message.data }}
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 col-12">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Profile from "../components/ProfileColumn";

export default {
  data() {
    return {
      profile: {
        _id: "",
        type: "",
        name: "",
        email: "",
        password: "",
        birthday: "",
        services: "",
        researchDate: "",
        researchInst: "",
        state: {},
      },
    };
  },
  name: "App",
  components: {
    Navbar,
    Profile
  },
  async mounted() {
    this.profile = await this.$store.dispatch(
      "retrieveUser",
      this.$route.params.id
    );
    if (this.profile._id == this.$store.getters.currentUser._id) {
      this.$store.commit("updateOwner", true);
    } else {
      this.$store.commit("updateOwner", false);
    }
  },
};
</script>

<style scoped></style>
