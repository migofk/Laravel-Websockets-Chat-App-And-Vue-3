<template>
    <div class="col-12 col-lg-7 col-xl-9">
					<div class="py-2 px-4 border-bottom d-none d-lg-block">
						<div v-for="participant in chat.participants" :key="participant.id">
							<div v-if="$store.state.id != participant.id" class="d-flex align-items-center py-1">
				            <div class="position-relative me-1">
								<img src="http://localhost:5173/img/avatar-7.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
							</div>
							<div class="flex-grow-1 pl-3">
								<strong>
									<span>{{ participant.first_name }} {{ participant.last_name }}</span>	
								</strong>
								<div  class="small"><i class="bi bi-circle-fill" :class="users.find(o =>o.id == participant.id)?' chat-online':' chat-offline'"></i>{{ users.find(o =>o.id == participant.id)? ' Online':' Offline' }}</div>
							</div>	
						</div>
						</div>
					</div>
					<div class="position-relative">
						<div id="chatBox" class="chat-messages p-4">

							<div v-for="message in messages" :class="$store.state.id == message.sender.id? 'chat-message-right' :'chat-message-left'" ref="messsageContainers" class="pb-4" :key="message.id">
								<div>
									<img src="http://localhost:5173/img/avatar-7.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
								</div>
								<div class="flex-shrink-1 message-box rounded py-2 px-3 mx-2">
									<div class="font-weight-bold mb-1">{{ message.sender.first_name }}</div>
									{{  message.message }} 
                                    <div class="text-muted small text-nowrap mt-2">{{  message.created_at }} - {{  message.data.status }}</div>
								</div>
							</div>
						</div>
					</div>

					<div class="flex-grow-0 py-3 px-4 border-top">
						<div class="input-group">
							<input type="text" v-model="message" class="form-control" placeholder="Type your message">
							<button class="btn btn-primary" :class="{isSendingForm:disabled}" @click="onSubmit"><i class="bi bi-send"></i></button>
						</div>
					</div>

				</div>
</template>

<script>
import axios from 'axios'
export default {
	props:['chat_id'],
	setup() {
		
	},
	data(){
		return{
			messages:[],
			chat:[],
			message:'',
			isSendingForm:false,
			users :[]
		}
	},
	methods:{
	  scrollToLastMessage(){
		this.$nextTick(() =>{
			let items = this.$refs.messsageContainers;
			let last = items[items.length-1];
			if(items.length > 0){
				last.scrollIntoView({
					block: "nearest",
					inline: "center",
					behavior: "smooth",
					alignToTop: false
				});
			}
		})
	},
	async  getData(){
		
      let url =import.meta.env.VITE_BACKEND_URL+'/chat/get-chat-by-id/'+this.chat_id
      axios
      .get(url,
		{ headers: { 
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.$store.state.token,
		}},
		)
      .then((response) => {
        console.log(response.data)
        this.messages = response.data.messages.data
		this.chat = response.data.chat
		window.Echo.leave('chat.'+this.chat_id)
		this.startWebSocket()
      });
    },
	async onSubmit() {
       this.isSendingForm = true;
       axios.post(
        this.$store.state.backendUrl+'/chat/send-text-message',{message:this.message,chat_id:this.chat_id}, 
        {
			headers: {
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + this.$store.state.token,
			}
    	})
        .then((response) => {
          console.log(response);
          this.isSendingForm = false;
          this.message =''
		
        })
        .catch( (error) => {
          console.log(error);
        /*  this.ShowError=true;
          this.errorMgs = error.response.data.error;*/
          this.isSendingForm = false;
        });
    },
	async startWebSocket(){
	
		console.log('startWebSocket',this.chat_id)
		window.Echo.join('chat.'+this.chat_id)
		.here(users => {
			this.users = users
		})
		.joining(user => {
			this.users.push(user)
		})
		.leaving(user => {
			this.users = this.users.filter(u => (u.id !== user.id));
		}).listen('ChatMessageSent', (e) => {
			this.messages.push(e.message)
			this.scrollToLastMessage();
			if (this.$store.state.id != e.message.sender.id){
				let url =import.meta.env.VITE_BACKEND_URL+'/chat/message-status/'+e.message.id
      			axios
				.get(url,
					{ headers: { 
								'Content-Type': 'application/json',
								'Authorization': 'Bearer ' + this.$store.state.token,
					}},
				)
				
			}
		}).listen('ChatMessageStatus', (e) => {
			this.messages.find(o => o.id ==e.message.id ).data.status =  e.message.data.status
		});
	}  
	},
	watch: {
       // call the method if the route changes
      'chat_id': {
         handler: 'getData',
         immediate: true // runs immediately with mount() instead of calling method on mount hook
    },
   /*'$route': {
         handler: 'startWebSocket',
         immediate: true // runs immediately with mount() instead of calling method on mount hook
    },*/

  },
  mounted(){
   // this.getData()

	/* window.Echo.private('chat.'+this.chat_id).listen('ChatMessageSent',(e)=>{
       console.log('go private');
       //code for displaying the serve data
       console.log('Echo Echo',e); // the data from the server
	   this.messages.push(e.message)
	   this.scrollToLastMessage();
    })*/
	
	
  },
  unmounted(){
  }
}
</script>