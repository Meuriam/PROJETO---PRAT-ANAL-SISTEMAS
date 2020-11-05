<template>
  <div class="background">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="flex__container">
            <div class="flex__container fullwidth">
              <!--  -->
              <div class="mr-3">
                <a href="/">
                  <img src="@/assets/logo.png" alt />
                </a>
              </div>
              <!--  -->
              <div>
                <a href="/">
                  <span class="text-white title-1">
                    <b>Renting</b>Helper
                  </span>
                </a>
              </div>
            </div>
            <!--  -->
            <div class="flex__container" v-if="loggedIn">
              <!--  -->
              <div class="flex__item">
                <a href="/editar">
                  <img src="@/assets/config.png" alt="Editar"/>
                </a>
              </div>
              <!--  -->
              <div class="flex__item">
                <p class="m-0 text-white">|</p>
              </div>
              <!--  -->
              <div class="flex__item">
                <a href="/">
                  <img src="@/assets/logout.png" @click="$store.dispatch('destroySession')" />
                </a>
              </div>
              <!--  -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      loggedIn: this.$store.state.session.token != null,
      searchField: ""
    };
  },
  methods: {
    search() {
      if (this.$store.getters.searchEmpty) {
        this.$store.dispatch("searchUsers");
      }
    },
    blurIn() {
      if (this.searchField.length > 0 && this.filteredList.length > 0) {
        document.getElementsByClassName("container")[1].style.filter =
          "blur(5px)";
      } else {
        document.getElementsByClassName("container")[1].style.filter =
          "blur(0px)";
      }
    },
    blurOut() {
      setTimeout(() => {
        this.searchField = "";
      }, 100);
      document.getElementsByClassName("container")[1].style.filter =
        "blur(0px)";
    }
  },
  computed: {
    userList() {
      return this.$store.state.search;
    },
    filteredList() {
      return this.userList.filter(user => {
        let lowercased = this.searchField.toLowerCase();
        let match = false;
        // Search name
        if (user.name.toLowerCase().includes(lowercased)) return true;
        // Search city
        if (user.state)
          if (user.state.locales.toLowerCase().includes(lowercased))
            return true;
        return match;
      });
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .query__display {
    display: none !important;
  }
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.index {
  z-index: 1;
  max-height: 300px !important;
  overflow-y: auto;
}
.search__results {
  cursor: pointer;
  transition: 0.3s ease;
}
.search__results:hover {
  background: #3e4c93 !important;
  color: #ffffff !important;
  transition: 0.3s ease;
}
.profile_img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
a {
  text-decoration: none;
}
.search__item {
  color: inherit;
}
.title-1 {
  font-size: 26px;
  line-height: 1.2;
}
.flex__container {
  display: flex;
  flex-flow: row;
  margin: 5px 0;
}
.flex__item {
  display: flex;
  flex-flow: row;
  align-items: center;
  margin: 0 10px;
}
.background {
  background:#2EA8BB  ;
  height: 50px;
}
.fullwidth {
  width: 100%;
}
img {
  width: 30px;
}
input {
  padding-left: 5px;
  width: 100%;
}
input:focus {
  outline: none;
}
@keyframes infinite-spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
