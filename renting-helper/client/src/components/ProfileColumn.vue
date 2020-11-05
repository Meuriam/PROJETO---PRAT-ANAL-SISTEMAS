<template>
  <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
    <div class="mt-3 p-3 profile__container bg-white text-center">
      <a :href="`/profile/${profile._id}`">
        <img :src="profile.image" class="bg-white p-3 profile_img" alt />
      </a>
    </div>
    <div class="bg-white p-3">
      <div class="flex__container">
        <a :href="`/profile/${profile._id}`">
          <p class="text-black text-center">
            <b>{{ profile.name }}</b>
          </p>
        </a>
        <span
          v-if="
            !$store.state.owner &&
              $store.getters.currentUser._id != this.$route.params.id
          "
          class="text-center icon"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileColumn",
  props: ["profile"],
  data() {
    return {};
  },
  async mounted() {

    if (this.profile._id == this.$store.getters.currentUser._id) {
      this.$store.commit("updateOwner", true);
    } else {
      this.$store.commit("updateOwner", false);
    }
  }
};
</script>

<style scoped>
.title-1 {
  font-size: 14px;
}
.flex__container {
  display: flex;
  flex-flow: column-reverse;
}
.profile__container {
  background: linear-gradient(to bottom, #2EA8BB 50%, #ffffff 50%);
}

.icon {
  cursor: pointer;
}
.profile_img {
  cursor: pointer;
  width: 223px;
  height: 223px;
  border-radius: 50%;
  image-rendering: optimizeQuality;
}
.text-black {
  color: #000000 !important;
}
</style>
