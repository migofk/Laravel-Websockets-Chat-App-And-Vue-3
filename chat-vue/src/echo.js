import { reactive } from "vue";

import Echo from "laravel-echo"
import Pusher from "pusher-js";
window.Pusher = Pusher;

//connecting to the serve with Authorization
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_WEBSOCKETS_KEY,
    wsHost:import.meta.env.VITE_WEBSOCKETS_SERVER,
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    disableStats: true,
    authEndpoint :import.meta.env.VITE_BACKEND_URL+'/broadcasting/auth',
    auth:{
        headers: {
            Authorization: 'Bearer '+localStorage.getItem('token'), 
        }
    },
 
});
