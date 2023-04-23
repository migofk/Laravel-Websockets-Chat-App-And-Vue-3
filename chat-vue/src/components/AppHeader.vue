<template>
  <nav class="navbar navbar-expand-lg  navbar-dark bg-dark" aria-label="Main navigation">
<div class="container-fluid">
  <router-link :to="{ name: 'Home' }" class="navbar-brand d-flex align-items-center">
        <i class="bi bi-box2-heart h1 me-1"></i>
         <strong>VUE</strong>
        </router-link>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <router-link class="nav-link" :class="$route.name == 'Home'? 'active':''" aria-current="page" :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="$route.name == 'Chat'? 'active':''"  :to="{ name: 'Chat' }">Chat</router-link>
      </li>
    </ul>
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

      <li v-if="!$store.state.token" class="nav-item">
        <router-link class="nav-link" :class="$route.name == 'Register'? 'active':''"  :to="{ name: 'Register' }">Sign up</router-link>
      </li>
      <li v-if="!$store.state.token" class="nav-item">
        <router-link class="nav-link" :class="$route.name == 'Login'? 'active':''"  :to="{ name: 'Login' }">Sign in</router-link>
      </li>
      <li v-if="$store.state.token" class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdown01">
          <li><a class="dropdown-item" @click="logout()" >Logout</a></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</nav>
</template>

<script>
export default {
  name: 'AppHeader',
  data(){
    return{
      notifications:[]
    }
  },
  methods: {
    logout() {
      this.$store.commit('Logout')
      this.$router.push('/login')
    },
  },
}
</script>