import { createStore } from 'vuex'

export default createStore({
  state: {
    token:'',
    name:'',
    id:'',
    backendUrl: import.meta.env.VITE_BACKEND_URL,
    stateLoaded: false
  },
  mutations: {

   async initialiseStore(state) {

         if(localStorage.getItem('token')){
          state.token = localStorage.getItem('token');
         }
         if(localStorage.getItem('name')){
          state.name = localStorage.getItem('name');
         }
         if(localStorage.getItem('image')){
          state.image = localStorage.getItem('image');
         }
         if(localStorage.getItem('id')){
          state.id = localStorage.getItem('id');
         }
         if(state.token == ""){
           return false;
         }
         state.stateLoaded = true
         return true;
    },
    saveLogin(state,LoginData){
      state.token =LoginData.token;
      state.name =LoginData.name;
      state.image =LoginData.image;
      state.id =LoginData.id;
      localStorage.setItem('token', LoginData.token);
      localStorage.setItem('name', LoginData.name);
      localStorage.setItem('image', LoginData.image);
      localStorage.setItem('id', LoginData.id);
    
    },

    Logout(state){
      state.token ="";
      state.name ="";
      state.image ="";
      state.id ="";
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('image');
      localStorage.removeItem('id');
    },
  },
  actions: {},
  modules: {},
})
