<template>
  <div id="app">
    <transition
      name="router-anim"
      enter-active-class="animated fadeInDown"
      leave-active-class
    >
      <router-view :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
html {
  scroll-behavior: smooth !important;
}
body {
  background: #eee;
  font-family: IBM Plex Sans, arial, sans-serif;
}
a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}
/* TRANSITION EFFECT */
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
/* TRANSITION EFFECT */
</style>
