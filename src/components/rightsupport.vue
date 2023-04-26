<template>
  <div class="rightsupport">
    <el-popover placement="left" width="" trigger="hover">
      <div>
    
        <div class="contactCommunity">
          <div class="contactCommunityImg">
            <img src="../assets/image/contact_community.png"  width="20px" alt="" />
          </div>
          <div class="contactCommunityText">售前在线咨询</div>
        </div>

        <div class="contactPhone">
          <div class="contactPhoneImg">
            <img src="../assets/image/contact_phone.png" width="20px" alt="" />
            <div class="contactPhoneText">业务洽谈咨询</div>
          </div>
        </div>

        <div class="managerPhone">
          <div class="managerPhoneText">曲经理：15552229055</div>
        </div>
        <div class="managerPhone">
          <div class="managerPhoneText">陈经理：13051331931</div>
        </div>

      </div>
      <div slot="reference" class="joinQRcode1">
        <div class="contactMain">
          <img src="../assets/image/support.png" alt="" />
        </div>
        <div class="contactMain">
          <div class="contactWord">联系</div>
          <div class="contactWord">我们</div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    created(){
     
    },
    mounted(){
      
    },
    methods:{
    
    },
    computed:{
     
    }

}
</script>

<style scoped>
  .rightsupport {
    width: 100px;
    position: fixed;
    bottom: 20%;
    right: 0;
    -webkit-transform: translateY(50%);
    transform: translateY(50%);
    background: #fff;
  }
  .joinQRcode1{
    display: inline-block;
    padding: 15px;
    position: relative;
  }
  .contactMain {
    display: inline-block;
  }
  .joinQRcode1 img {
    width: 30px;
    height: 30px;
    display: block;
  }
  .contactWord {
    color: #00bfbf;
    font-size: 12px;
  }
  .rightsupport /deep/ .el-popover {
    position: absolute;
    background: #fff;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 20px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 15px;
    -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    word-break: break-all;
  }
  .toptext {
    padding: 0 10px 10px;
    color: #333;
    font-size: 16px;
  }
  .contactCommunity, .contactUs {
    text-align: center;
  }
  .contactCommunity .contactCommunityImg {
    display: inline-block;
  }
  img, fieldset {
    border: 0 none;
  }
  .contactCommunity .contactCommunityText,.contactPhone .contactPhoneText {
    vertical-align: top;
    margin-left: 5px;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    cursor: pointer;
    font-size: 15px;
  }
  .contactPhone {
    text-align: center;
  }
  .contactPhone .contactPhoneImg {
    display: inline-block;
  }
  .managerPhone {
    clear: both;
    margin: 5px 0;
  }
  .managerPhone .managerPhoneText {
    display: inline;
    height: 22px;
    line-height: 22px;
  }
</style>
