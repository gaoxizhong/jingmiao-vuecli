<template>
  <div class="content-box" :style="`height:${ viewHeight }px;padding-top: 60px;`">
    <div class="video-box">
      <video
        :src="videoOptions.src"
        :controls="videoOptions.controls"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-playsinline
        @play="onPlayerPlay"
        @pause="onPlayerPause"
        autoplay="autoplay" 
        style="object-fit: fill;" 
        width="100%" 
        height="100%" 
        ref="video">
      </video>
    </div>
  </div>
</template>
<style scoped>
  .video-box{
    width: 860px;
    height: 70%;
    min-height: 560px;
    margin: 0 auto;
    box-shadow: 0 0 24px 0 rgb(19 70 80 / 25%);
  }
  .video-box video{
    width: 100%;
    height: 100%;
  }
</style>
<script>
import { getVideoRecordPv } from '@/api/data'
  export default {
    name: "showVideo",
    data() {
        return {
          videoOptions: {
              controls:true,
              src:"", // url地址
              v_id:''
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
      console.log(this.$route.query.v_id)
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      this.viewWidth = getViewportSize.width;
      this.videoOptions.src = this.$route.query.src;
      this.videoOptions.v_id = this.$route.query.v_id;

      // this.initVideo();
      this.getVideoRecordPv();
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
    getVideoRecordPv(){
      let that = this;
      let v_id = that.videoOptions.v_id;
      getVideoRecordPv({v_id}).then( res =>{
        if(res.data.code == 0){
          console.log('阅读成功')
        }
      })
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
