<template>
  <div>
    <Navbar />
    <div class="container">
      <div class>
        <FormLogin />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import FormLogin from "../components/FormLogin";

export default {
  name: "App",
  components: {
    Navbar,
    FormLogin
  }
};
</script>

<style></style>
