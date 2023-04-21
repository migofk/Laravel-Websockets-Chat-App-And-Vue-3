import { reactive } from "vue";

import Echo from "laravel-echo"
import Pusher from "pusher-js";
window.Pusher = Pusher;
export const state = reactive({
  connected: false,
});


window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_WEBSOCKETS_KEY,
    wsHost:import.meta.env.VITE_WEBSOCKETS_SERVER,
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    disableStats: true,
    authEndpoint :'http://127.0.0.1:8000/api/broadcasting/auth',
    auth:{
        headers: {
            Authorization: 'Bearer '+localStorage.getItem('token'), 
        }
    },
 
});
/*
window.Echo.connector.socket.on('connect', function(){
    state.connected = true;
})

window.Echo.connector.socket.on('disconnect', function(){
    state.connected = false;
})*/