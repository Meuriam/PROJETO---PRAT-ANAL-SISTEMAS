<template>
  <div class="flex__container file bg-white p-3 pb-0">
    <div class="form-group">
      <label for="name">Foto:</label>
      <br />
      <input id="img_upload" type="file" ref="file" />
    </div>
    <!-- SUBMIT -->
    <div class="flex__container">
      <button @click="upload()" type="button" class="btn btn-success form-group">Upload</button>
      <img
        src="../assets/loading-spinner.gif"
        id="spinner"
        class="ml-3 loading"
        style="display: none"
      />
    </div>
    <!-- SUBMIT -->
  </div>
</template>
<script>
export default {
  name: "ImageUpload",

  methods: {
    async upload() {
      document.querySelector("#spinner").style.display = "block";
      const formData = new FormData();
      formData.append("file", document.getElementById("img_upload").files[0]);
      let res = await this.$store.dispatch("upload", formData);
      let image = {
        image: res.data.file.location
      };
      this.$store.commit("updateCurrentUser", image);
      document.querySelector("#spinner").style.display = "none";
    }
  }
};
</script>
<style scoped>
.flex__container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.loading {
  width: 30px;
  align-self: baseline;
}
</style>