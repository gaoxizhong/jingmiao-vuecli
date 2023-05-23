<template>
  <div class="pagecontent-box">
    <iframe src="http://qualityweb.jiankangche.cn:8082/" frameborder="0" style="width: 1200px;height:100%;"></iframe>
  </div>
</template>

<script>
export default {
  name: 'ocrPages',
  components: {

  },
  data(){
    return {
      viewHeight:'',
      viewWidth:'',
      is_view: true,
      activeIndex:'',
    }
  },
  mounted(){
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.activeIndex = this.$route.query.active_id;
  },
  methods: {     
    setsickNess(){
      this.is_view = false;
      this.$nextTick(() => {
        this.is_view = true
        console.log(this.is_view)
      })
    },

  },

}
</script>
<style lang="scss" scoped>
  .pagecontent-box{
    height: 100%;
    background: #fff;
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #dddddd;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #dddddd;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #dddddd;
  }
  input::-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #dddddd;
  }
  /* 媒体查询 */
  @media only screen and (max-width: 1366px){
  
  }
</style>
