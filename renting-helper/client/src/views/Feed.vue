<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mb-3">
        <Profile :profile="$store.getters.currentUser" />
        <div class="bg-white p-5 mt-3 box">
        <List v-if="$store.getters.currentUser.type == 'contratante'"
            :profile="$store.getters.currentUser"
            class="bg-white p-3"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Profile from "../components/ProfileColumn";
import List from "../components/ListServicos";


export default {
  data() {
    return {
      
    };
  },
  name: "App",
  components: {
    Navbar,
    Profile,
    List
  },
  methods: {
    setSameHeight(el) {
      var arr = [];
      setTimeout(function() {
        var card = document.getElementsByClassName(el);
        for (let x = 0; x < card.length; x++) {
          arr.push(card[x].offsetHeight);
          arr.sort();
        }
        for (let x = 0; x < card.length; x++) {
          card[x].style.height = `${arr[arr.length - 1]}px`;
        }
      }, 100);
    }
  },
};
</script>

<style scoped>
.feed-scroll {
  max-height: 562px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

::-webkit-scrollbar {
  display: none;
}
.container {
  transition: 0.3s;
}
.flex__container {
  display: flex;
}
.tab__elem {
  cursor: pointer;
  transition: 0.5s;
}
.tab__elem:hover {
  background: #ffffff;
  transition: 0.5s;
}
.tab__inactive {
  background: #f2f4f8;
}
.box{
  width: 836px;
}
</style>
