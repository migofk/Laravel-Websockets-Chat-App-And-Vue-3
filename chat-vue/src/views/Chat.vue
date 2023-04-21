<template>
<main class="container min-h-content mb-3 mt-5">
		<h1 class="h3 mb-3"><i class="bi bi-chat-left-dots-fill"></i> Messages</h1>

		<div class="card">
			<div class="row g-0">
				<ChatSidebar  @renderChat="renderChat" />
				<ChatBox v-if="startChat"  :chat_id="chatId" />
			</div>
		</div>
</main>

    
</template>
<script>
import ChatBox from "../components/ChatBox.vue"
import ChatSidebar from "../components/ChatSideBar.vue"
export default {

	components:{ChatBox,ChatSidebar},
	data(){
		return{
			chatId : null,
			startChat :false
		}
	},
	methods: {
    renderChat(chat_id) {
     this.chatId = null
	 this.chatId = chat_id
	 this.startChat =true;
      console.log("chatId",chat_id);
    },
  },
	
}
</script>