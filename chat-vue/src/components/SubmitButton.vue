<template>
  <!-- eslint-disable -->
  <button type="submit" class="btn btn-primary" >
    <div v-if="isSendingForm" class="spinner-border spinner-border-sm" role="status">
    </div> 
    {{title}}
 </button>
</template>

<script>
/* eslint-disable */ 
export default{
    name: "SubmitButton",
    props: ['title','isSendingForm'],
}

</script>