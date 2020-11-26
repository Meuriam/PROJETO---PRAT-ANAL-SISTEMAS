import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  // Variaveis
  state: {
    api: "https://rentinghelper-api.vercel.app",
    owner: true,
    session: {
      user: {
        _id: window.localStorage.getItem("UserID") || null,
        type: "",
        name: "",
        email: "",
        password: "",
        birthday: "",
        state: [],
        services: [],
      },
      // userId: window.localStorage.getItem("UserID") || null,
      token: window.localStorage.getItem("Authorization") || null,
    },
    params: null,
    message: {
      type: "",
      data: "",
    },
    state: [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO"
  ],
    services: [
      "Encanador",
      "Eletricista",
      "Jardineiro",
      "Marceneiro",
      "Pintor",
      "Faxineiro",
      "Chaveiro",
      "Montador de Móveis",
      "Técnico de Informática",
      "Alveneiro",
      "Churrasqueiro",
      "Azulejista",
      "Carpinteiro"
    ],
    search:[],
    budgets:[]
  },
  // Setters internos
  mutations: {
    updateMessage(state, message) {
      state.message = message; 

      if(!message.fade) {
        setTimeout(() => {
          state.message = {
            type: "",
            data: "",
          };
        }, 5000);
      }
    },
    updateSession(state, session) {
      state.session = session;
    },
    updateCurrentUser(state, user) {
      state.session.user = {
        ...state.session.user,
        ...user,
      };
    },
    updateToken(state, token) {
      state.session.token = token;
    },
    updateParams(state, params) {
      state.params = params;
    },
    updateOwner(state, bool) {
      state.owner = bool;
    },
    updateSearch(state, search) {
      state.search = search;
    },
    updateBudgets(state, budgets){
      state.budgets = budgets;
    }
  },
  // Getters externos
  getters: {
    loggedIn(state) {
      return state.session.token != null;
    },
    showMessage(state) {
      return state.message.data.length > 0;
    },
    currentUser(state) {
      return state.session.user;
    },
    searchEmpty(state) {
      return state.search.length <= 0;
    },
  },
  // Funçoes externas
  actions: {
    // User
    async upload(context, payload) {
      try {
        const response = await Axios.post(
          `${context.state.api}/api/upload`,
          payload,
          {
            headers: {
              Authorization: context.state.session.token,
              "Content-Type": `multipart/form-data; boundary=${payload._boundary},`,
            },
          }
        );
        context.commit("updateMessage", {
          type: "success",
          data: response.data.message,
        });
        return response
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
      }
    },
    async createUser(context, payload) {
      try {
        const response = await Axios.post(
          `${context.state.api}/api/users/register`,
          payload
        );
        context.commit("updateMessage", {
          type: "success",
          data: response.data.message,
          fade: true
        });
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
      }
    },
    async updateUser(context, payload) {
      try {
        const response = await Axios.put(
          `${context.state.api}/api/users/${payload._id}`,
          payload.new,
          {
            headers: {
              Authorization: context.state.session.token,
            },
          }
        );
        context.dispatch("currentUser");
        context.commit("updateMessage", {
          type: "success",
          data: response.data.message,
        });
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
      }
    },
    async retrieveUser(context, id) {
      try {
        const response = await Axios.get(
          `${context.state.api}/api/users/${id}`,
          {
            headers: {
              Authorization: context.state.session.token,
            },
          }
        );
        return response.data;
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
      }
    },
    async currentUser(context) {
      try {
        const response = await Axios.get(
          `${context.state.api}/api/users/${context.state.session.user._id}`,
          {
            headers: {
              Authorization: context.state.session.token,
            },
          }
        );
        context.commit("updateCurrentUser", response.data);
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
      }
    },
    // Search
    async searchUsers(context, payload) {
      context.commit("updateSearch", []);
      try {
        const response = await Axios.post(`${context.state.api}/api/users/search`, payload, {
          headers: {
            Authorization: context.state.session.token,
          },
        });
        context.commit("updateSearch", response.data);
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
      }
    },
    // Session
    async retrieveSession(context, payload) {
      try {
        var response = await Axios.post(
          `${context.state.api}/api/users/login`,
          payload
        );
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
        return false;
      }

      const token = response.data.token;
      const userId = response.data.userId;

      window.localStorage.setItem("Authorization", `Bearer ${token}`);
      window.localStorage.setItem("UserID", userId);

      context.commit("updateToken", token);
      context.commit("updateCurrentUser", {
        _id: userId,
      });

      return true;
    },
    destroySession(context) {
      window.localStorage.clear();
      context.commit("updateSession", {
        token: "",
        user: "",
      });
    },
    async requestBudget(context, payload){
      try {
        var response = await Axios.post(
          `${context.state.api}/api/budgets/`,
          payload,
          {
            headers: {
              Authorization: context.state.session.token,
            },
          }
        );
        context.commit("updateMessage", {
          type: "success",
          data: response.data.message,
          fade: true
        });
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
        return false;
      }
      return response
    },
    async retrieveBudgets(context) {
      try {
        const response = await Axios.get(
          `${context.state.api}/api/budgets/${context.state.session.user._id}`,
          {
            headers: {
              Authorization: context.state.session.token,
            },
          }
        );
        context.commit("updateBudgets", response.data.posts.reverse());
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
      }
    },
    async updateBudget(context, {id, newStatus, newValue}){
      const payload = {}
      if (newValue) payload.value = newValue;
      if (newStatus) payload.status = newStatus;
      try {
        const response = await Axios.put(
          `${context.state.api}/api/budgets/${id}`,
          {
            status: newStatus,
            value: newValue
          },
          {
            headers: {
              Authorization: context.state.session.token,
            },
          }
        );
        context.commit("updateMessage", {
          type: "success",
          data: response.data.message,
          fade: false
        });
      } catch (error) {
        context.commit("updateMessage", {
          type: "danger",
          data: error.response.data.message,
        });
      }      
    }
  },
});
