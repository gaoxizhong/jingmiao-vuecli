<template>
  <div class="content-box">
    <div class="video-box">
      <video
        :src="videoOptions.src"
        :controls="videoOptions.controls"
        class="video-js vjs-big-play-centered vjs-fluid"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-playsinline
        style="width: 100%;height:100%;"
        @play="onPlayerPlay"
        @pause="onPlayerPause"
        @seeking="seeking"
        autoplay="autoplay"
        ref="video">
      </video>
    </div>
  </div>
</template>
<style scoped>
  .video-box{
    width: 800px;
    height: 520px;
    margin: 0 auto;
    margin-top: 50px;
  }
</style>
<script>
  export default {
    name: "showVideo",
    data() {
        return {
          videoOptions: {
              controls:true,
              src:"", // url地址
          },
          player: null,
          playTime:'',
          seekTime:'',
          current:'',
          viewHeight:'',
      }
    },
    mounted() {
    },
    created(){  //生命周期里接收参数
      console.log('created')
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.videoOptions.src = this.$route.query.src;
      this.initVideo();
    },
    methods: {
      initVideo() {
        //原生初始化视频方法
        let myVideo = this.$refs.video;
        myVideo.ontimeupdate = function() {myFunction()};
        let _this = this;
        function myFunction(){
          let playTime = myVideo.currentTime;
          setTimeout(function () {
              localStorage.setItem("cacheTime",playTime)
          },500)
          let time = localStorage.getItem("cacheTime")
          // 当前播放位置发生变化时触发。
          if(playTime - Number(time) > 2){
              myVideo.currentTime = Number(time)
          }else{
          }
        };
      },

      // 播放回调
      onPlayerPlay(player) {
          // this.globalSetting = true
          console.log("player play!", player);
          // document.getElementsByClassName("vjs-control-bar").style.display = "block";
          // document.getElementsByClassName("vjs-control-bar").style.display = "block";
      },

      // 暂停回调
      onPlayerPause(player) {
          // this.globalSetting.controls = false;
          // console.log("player pause!", player);
          // var video = document.getElementById("video");
          // video.controls=false;
          // document.getElementsByClassName("vjs-control-bar").style.display = "none";
      },
    },

    beforeDestroy() {
    if (this.player) {
        this.player.dispose()
    }
  }
}
</script>
