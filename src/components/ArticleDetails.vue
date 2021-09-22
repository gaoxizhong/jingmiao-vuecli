<template>
   <div class="content-box">
       123123
   </div>
</template>
<style scoped>

</style>
<script>
  export default {
    data() {
      return {
          id: '',
      }
    },
    mounted(){
      let id = this.$store.state.list_id;
      console.log(id)
    },
    created(){  

    },
    methods:{
     
    }
  }
</script>
