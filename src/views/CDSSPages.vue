<template>
  <div class="pages-box">
    <div class="westernmedicin-content-box" style="height: 100%">
      <!-- 左侧模块 -->
      <!-- <div class="grid-leftcontent-box"></div> -->
      <!-- 右侧智能问诊模块 -->
      <div class="grid-rightcontent-box">
        <div class="grid-rightcontent-title">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="辅助诊疗" name="auxiliary"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="grid-rightcontent-info-box">
          <!-- 辅助诊疗模块 -->
          <div class="rightcontent-info-bodybox" v-if="activeName == 'auxiliary'">
            <div class="src-components-PushItems-RKWqd">
              <!-- 疑似诊断模块开始 -->
              <div class="src-components-PushItems-1jpJi src-Items-cbzd">
                <h1> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAa9JREFUOBGtVKFSxDAQfem0CLAIFA6JQdwHgIAPuDIDPeAwGLDIQ3ASjcFwwByI4wPOwAcgMEgcCAwWBC2E7KbpNLm0HAMRSTb79mXzdlvgL0PGG22Ol+vtuVqiAulFGa9stp4132rSLSNlnJwGkNgqHyKc2tfoPMxkIcooPszSTcjoGEjvxKA/W/aDACYBy6GMIiFyyLg9w2szkd41br3QOQ8r0pwpubw5kp+eCIgVhJPz4urkNY8Zf7FfHSdPQNSASHcRRufisvc4QuXmSCqY/AqwCzIOC6xAPePwrTKvZwCBZQLICg11lQiwtjNdVRUm4AfSTo2qEnpzd8EuyNZRpYHs/UHdMVSds63v07MFLDtoT/kjezvikrJTDqlh60rrJeSCfGS3EKIjBhc95sonFkjKLibCRV+FLcI6ojIp7auImTB/2j0QHLgZuUSurUv6daikWCApAgawwFHDkFFzmAYhf52tY1SjMwcQ6huV2NT5QIdscd23pPjJBj73qOIcSxON3+inI/w6WpmMS1xVEIofISxup79ymt4oxFnxYZEs9CONoiVfy5jYf12/AekE+Xpx4MgpAAAAAElFTkSuQmCC" alt=""/>
                  疑似诊断
                </h1>
                <!-- 疑似诊断列表 -->
                <div v-if="disease_list.length > 0">
                  <div class="ysblList-items-box" :class="index == clickIndex ? 'hoverClass' : ''" v-for="(item, index) in disease_list"
                    :key="index" @click.stop="clickYsbl(item.name, index)">
                    <div style="font-weight: 600;padding-bottom: 5px;display: flex;align-items: center; justify-content: space-between;">
                      <div>
                        <span class="icon-outline" style="padding:2px 4px;" title="点击使用此项,主要诊断项显示" @click.stop="clickYszdIcon(item.name)">+</span>
                        <span>{{ item.name }}</span>
                      </div>
                      <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('Disease', item.name)">查看详情</a>
                    </div>
                    <div class="ysblList-items-text">
                      {{ item.pathogenesis ? item.pathogenesis : "暂无" }}
                    </div>
                  </div>
                </div>
                <div style="padding: 6px 0 6px 15px" v-else>暂无</div>
                <!-- 疑似诊断列表结束 -->
              </div>
              <!-- 疑似诊断模块结束 -->


              <!-- 常见药品模块开始 -->
              <div class="src-components-PushItems-1jpJi src-Items-cbzd src-Items-list">
                <h1 style="background: #EAF7FA;"> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAfRJREFUOBGtVDEzxFAQ3ncSBa2CRqdUUPgBFAztxQw5nEZDqzyFK9UajRyOIkpuruEHKCiUOgoKLYWEZ3fz9k2Si4wZMnPv7e1++82+9+0+gL982lupc75ero+VEllkIUqiulp7SvgW/SYZuupr3j3/sAIa1jgqizO4zaakSRVKALSzM45WQbv7ANGNCtuj6TgDpABO8GqXAhBmZtRefViFwYsmgNbzAlLnbROvPYsPKzdHsR4sBa+rsEbCaDwigJoDZ2BcnR28pvJ+Z2ZP7fmPAO4UqGgTHPdInQYPPTT5GtP1WXAaxCc3kQwYQYHNQEN0E582elZAwax1iri4I/MF+1klYljaGMqoYsA2mQ9o/tGlpsEWVCBCr945UPYesQyI3++xoC52zrow054BpgNkU/0Qv+2xpBzUXcCGLZO2kJAb5iO+BqUaKjwOmMssfGatm9DvTBcpnCEsI0qTkv0TMROao90CVHbyFXGykUrmIk2eqPS1i1cxSVeREHo0OM4EDZeA80Mmft6V6qjwZEF8NJgA8R36RpzEiZdNnQ/QEFAmoaTCBP+5RYqTXaGFpccxomEoajQUp4M/+25QDn2E5QFy+1rSPhlRGESP5w8KM4shwjenUOkeQptExFF0hZ3aSp4/jNC10EPqujNFLSO5/7p/A6iJBGKnQxzOAAAAAElFTkSuQmCC" alt=""/>
                  常见药品
                </h1>
                <!-- 常见药品列表 -->
                <div>
                  <div class="cjyp-table-tr" v-for="(item, index) in medicine_list" :key="index">
                    <div class="cjyp-table-tr-l" @click="clickMedicineIcon(item.name)">
                      <span class="icon-outline" style="padding:2px 4px;" title="点击使用此项">+</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('MedicineProduction', item.name)">查看详情</a>
                  </div>
                  <div style="padding: 6px 0 6px 15px" v-if="!medicine_list || medicine_list.length <= 0">暂无数据...</div>
                </div>
                <!-- 常见药品列表结束 -->
              </div>
              <!-- 常见药品模块结束 -->

              <!-- 常见检查模块开始 -->
              <div class="src-components-PushItems-1jpJi src-Items-cbzd src-Items-list">
                <h1> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAa9JREFUOBGtVKFSxDAQfem0CLAIFA6JQdwHgIAPuDIDPeAwGLDIQ3ASjcFwwByI4wPOwAcgMEgcCAwWBC2E7KbpNLm0HAMRSTb79mXzdlvgL0PGG22Ol+vtuVqiAulFGa9stp4132rSLSNlnJwGkNgqHyKc2tfoPMxkIcooPszSTcjoGEjvxKA/W/aDACYBy6GMIiFyyLg9w2szkd41br3QOQ8r0pwpubw5kp+eCIgVhJPz4urkNY8Zf7FfHSdPQNSASHcRRufisvc4QuXmSCqY/AqwCzIOC6xAPePwrTKvZwCBZQLICg11lQiwtjNdVRUm4AfSTo2qEnpzd8EuyNZRpYHs/UHdMVSds63v07MFLDtoT/kjezvikrJTDqlh60rrJeSCfGS3EKIjBhc95sonFkjKLibCRV+FLcI6ojIp7auImTB/2j0QHLgZuUSurUv6daikWCApAgawwFHDkFFzmAYhf52tY1SjMwcQ6huV2NT5QIdscd23pPjJBj73qOIcSxON3+inI/w6WpmMS1xVEIofISxup79ymt4oxFnxYZEs9CONoiVfy5jYf12/AekE+Xpx4MgpAAAAAElFTkSuQmCC" alt=""/>
                  常见检查
                </h1>
                <!-- 常见检查列表 -->
                <div>
                  <div class="cjyp-table-tr" v-for="(item, index) in inspection_list" :key="index">
                    <div class="cjyp-table-tr-l" @click="clickInspectionIcon(item.name)">
                      <span class="icon-outline" style="padding:2px 4px;" title="点击使用此项">+</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('Inspection', item.name)">查看详情</a>
                  </div>
                  <div style="padding: 6px 0 6px 15px" v-if="!inspection_list || inspection_list.length <= 0">暂无数据...</div>
                </div>
                <!-- 常见检查列表结束 -->
              </div>
              <!-- 常见检查模块结束 -->

              <!-- 相关症状模块开始 -->
              <div class="src-components-PushItems-1jpJi src-Items-cbzd src-Items-list">
                <h1> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAa9JREFUOBGtVKFSxDAQfem0CLAIFA6JQdwHgIAPuDIDPeAwGLDIQ3ASjcFwwByI4wPOwAcgMEgcCAwWBC2E7KbpNLm0HAMRSTb79mXzdlvgL0PGG22Ol+vtuVqiAulFGa9stp4132rSLSNlnJwGkNgqHyKc2tfoPMxkIcooPszSTcjoGEjvxKA/W/aDACYBy6GMIiFyyLg9w2szkd41br3QOQ8r0pwpubw5kp+eCIgVhJPz4urkNY8Zf7FfHSdPQNSASHcRRufisvc4QuXmSCqY/AqwCzIOC6xAPePwrTKvZwCBZQLICg11lQiwtjNdVRUm4AfSTo2qEnpzd8EuyNZRpYHs/UHdMVSds63v07MFLDtoT/kjezvikrJTDqlh60rrJeSCfGS3EKIjBhc95sonFkjKLibCRV+FLcI6ojIp7auImTB/2j0QHLgZuUSurUv6daikWCApAgawwFHDkFFzmAYhf52tY1SjMwcQ6huV2NT5QIdscd23pPjJBj73qOIcSxON3+inI/w6WpmMS1xVEIofISxup79ymt4oxFnxYZEs9CONoiVfy5jYf12/AekE+Xpx4MgpAAAAAElFTkSuQmCC" alt=""/>
                  相关症状
                </h1>
                <!-- 相关症状列表 -->
                <div>
                  <div class="cjyp-table-tr" v-for="(item, index) in inspection_list" :key="index">
                    <div class="cjyp-table-tr-l" @click="clickInspectionIcon(item.name)">
                      <span class="icon-outline" style="padding:2px 4px;" title="点击使用此项">+</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('Inspection', item.name)">查看详情</a>
                  </div>
                  <div style="padding: 6px 0 6px 15px" v-if="!inspection_list || inspection_list.length <= 0">暂无数据...</div>
                </div>
                <!-- 相关症状列表结束 -->
              </div>
              <!-- 相关症状模块结束 -->

              <!-- 查体模块开始 -->
              <div class="src-components-PushItems-1jpJi src-Items-cbzd src-Items-list">
                <h1> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAa9JREFUOBGtVKFSxDAQfem0CLAIFA6JQdwHgIAPuDIDPeAwGLDIQ3ASjcFwwByI4wPOwAcgMEgcCAwWBC2E7KbpNLm0HAMRSTb79mXzdlvgL0PGG22Ol+vtuVqiAulFGa9stp4132rSLSNlnJwGkNgqHyKc2tfoPMxkIcooPszSTcjoGEjvxKA/W/aDACYBy6GMIiFyyLg9w2szkd41br3QOQ8r0pwpubw5kp+eCIgVhJPz4urkNY8Zf7FfHSdPQNSASHcRRufisvc4QuXmSCqY/AqwCzIOC6xAPePwrTKvZwCBZQLICg11lQiwtjNdVRUm4AfSTo2qEnpzd8EuyNZRpYHs/UHdMVSds63v07MFLDtoT/kjezvikrJTDqlh60rrJeSCfGS3EKIjBhc95sonFkjKLibCRV+FLcI6ojIp7auImTB/2j0QHLgZuUSurUv6daikWCApAgawwFHDkFFzmAYhf52tY1SjMwcQ6huV2NT5QIdscd23pPjJBj73qOIcSxON3+inI/w6WpmMS1xVEIofISxup79ymt4oxFnxYZEs9CONoiVfy5jYf12/AekE+Xpx4MgpAAAAAElFTkSuQmCC" alt=""/>
                  查体
                </h1>
                <!-- 查体列表 -->
                <div>
                  <div class="cjyp-table-tr" v-for="(item, index) in inspection_list" :key="index">
                    <div class="cjyp-table-tr-l" @click="clickInspectionIcon(item.name)">
                      <span class="icon-outline" style="padding:2px 4px;" title="点击使用此项">+</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('Inspection', item.name)">查看详情</a>
                  </div>
                  <div style="padding: 6px 0 6px 15px" v-if="!inspection_list || inspection_list.length <= 0">暂无数据...</div>
                </div>
                <!-- 查体列表结束 -->
              </div>
              <!-- 查体模块结束 -->

              <!-- 治疗方案模块开始 -->
              <div class="src-components-PushItems-1jpJi src-Items-cbzd src-Items-list">
                <h1> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAa9JREFUOBGtVKFSxDAQfem0CLAIFA6JQdwHgIAPuDIDPeAwGLDIQ3ASjcFwwByI4wPOwAcgMEgcCAwWBC2E7KbpNLm0HAMRSTb79mXzdlvgL0PGG22Ol+vtuVqiAulFGa9stp4132rSLSNlnJwGkNgqHyKc2tfoPMxkIcooPszSTcjoGEjvxKA/W/aDACYBy6GMIiFyyLg9w2szkd41br3QOQ8r0pwpubw5kp+eCIgVhJPz4urkNY8Zf7FfHSdPQNSASHcRRufisvc4QuXmSCqY/AqwCzIOC6xAPePwrTKvZwCBZQLICg11lQiwtjNdVRUm4AfSTo2qEnpzd8EuyNZRpYHs/UHdMVSds63v07MFLDtoT/kjezvikrJTDqlh60rrJeSCfGS3EKIjBhc95sonFkjKLibCRV+FLcI6ojIp7auImTB/2j0QHLgZuUSurUv6daikWCApAgawwFHDkFFzmAYhf52tY1SjMwcQ6huV2NT5QIdscd23pPjJBj73qOIcSxON3+inI/w6WpmMS1xVEIofISxup79ymt4oxFnxYZEs9CONoiVfy5jYf12/AekE+Xpx4MgpAAAAAElFTkSuQmCC" alt=""/>
                  治疗方案
                </h1>
                <!-- 治疗方案列表 -->
                <div>
                  <div class="cjyp-table-tr" v-for="(item, index) in inspection_list" :key="index">
                    <div class="cjyp-table-tr-l" @click="clickInspectionIcon(item.name)">
                      <span class="icon-outline" style="padding:2px 4px;" title="点击使用此项">+</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('Inspection', item.name)">查看详情</a>
                  </div>
                  <div style="padding: 6px 0 6px 15px" v-if="!inspection_list || inspection_list.length <= 0">暂无数据...</div>
                </div>
                <!-- 治疗方案列表结束 -->
              </div>
              <!-- 治疗方案模块结束 -->

              <!-- 相关手术模块开始 -->
              <div class="src-components-PushItems-1jpJi src-Items-cbzd src-Items-list">
                <h1> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAa9JREFUOBGtVKFSxDAQfem0CLAIFA6JQdwHgIAPuDIDPeAwGLDIQ3ASjcFwwByI4wPOwAcgMEgcCAwWBC2E7KbpNLm0HAMRSTb79mXzdlvgL0PGG22Ol+vtuVqiAulFGa9stp4132rSLSNlnJwGkNgqHyKc2tfoPMxkIcooPszSTcjoGEjvxKA/W/aDACYBy6GMIiFyyLg9w2szkd41br3QOQ8r0pwpubw5kp+eCIgVhJPz4urkNY8Zf7FfHSdPQNSASHcRRufisvc4QuXmSCqY/AqwCzIOC6xAPePwrTKvZwCBZQLICg11lQiwtjNdVRUm4AfSTo2qEnpzd8EuyNZRpYHs/UHdMVSds63v07MFLDtoT/kjezvikrJTDqlh60rrJeSCfGS3EKIjBhc95sonFkjKLibCRV+FLcI6ojIp7auImTB/2j0QHLgZuUSurUv6daikWCApAgawwFHDkFFzmAYhf52tY1SjMwcQ6huV2NT5QIdscd23pPjJBj73qOIcSxON3+inI/w6WpmMS1xVEIofISxup79ymt4oxFnxYZEs9CONoiVfy5jYf12/AekE+Xpx4MgpAAAAAElFTkSuQmCC" alt=""/>
                  相关手术
                </h1>
                <!-- 相关手术列表 -->
                <div>
                  <div class="cjyp-table-tr" v-for="(item, index) in inspection_list" :key="index">
                    <div class="cjyp-table-tr-l" @click="clickInspectionIcon(item.name)">
                      <span class="icon-outline" style="padding:2px 4px;" title="点击使用此项">+</span>
                      <span>{{ item.name }}</span>
                    </div>
                    <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('Inspection', item.name)">查看详情</a>
                  </div>
                  <div style="padding: 6px 0 6px 15px" v-if="!inspection_list || inspection_list.length <= 0">暂无数据...</div>
                </div>
                <!-- 相关手术列表结束 -->
              </div>
              <!-- 相关手术模块结束 -->

            </div>
          </div>
          <!-- 辅助诊疗模块结束 -->
        </div>

        <div class="mz-box">
          <span style="color: #27afa1">免责声明: </span>以上仅供参考,以医生临床诊断为主
        </div>
      </div>
      <!-- 右侧智能问诊模块结束 -->
    </div>

    <!-- 以下各种弹窗功能 -->
    <!-- 点击病例弹窗查看详情 -->
    <DetailsMask :getinfo="getinfo" :name_1="name_1" :is_nofr="is_nofr" @ypxqclick_close="ypxqclick_close" v-if="is_ypxq" />

  </div>
</template>

<script>
  import Qs from 'qs';
  import Time from '../assets/js/time';
  import DetailsMask from '../components/WesternMedicineCdss/DetailsMask';
  import {
    clickFinishBtn,
    clickYsbl,
    getNewBaseDetail
  } from "@/api/data";
  export default {
    name: "CDSSPages",
    components: {
      DetailsMask
    },
    data(){
      return {
        viewHeight: 0,
        symptoms: '头痛,发烧', // 症状
        age: '', // 年龄
        sex: 1, // 性别
        infoData: [], // 主页数据
        checkList: [],
        disease_list: [], // 获取的辅助诊疗疑似病例数据
        getinfo: {}, //点击病例弹窗查看详情
        name_1: "", // 常见药品、检查查看详情弹窗标题
        is_nofr: true,
        is_ypxq: false, //点击常见药品、检查、图谱查看详情弹窗
        clickIndex: -1, //疑似病例列表下标
        hot_name: "", //疑似病例列表标题
        medicine_list: [], //  常见药品
        inspection_list: [], // 常见检查
        complication_list: [], // 并发症
        identity_list: [], // 鉴别诊断
        activeName: "auxiliary",
      }
    },
    created() {
      let getViewportSize = this.$getViewportSize();
      this.viewHeight = getViewportSize.height;
      if(this.$route.query.symptoms){
        this.symptoms = this.$route.query.symptoms;
      }
      if(this.$route.query.age){
        this.age = this.$route.query.age;
      }
      if(this.$route.query.sex){
        this.sex = this.$route.query.sex;
      }
      this.getManySelect(); //获取主页展示数据
    },
    methods:{
      // 点击右侧模块头部分页
      handleClick(tab) {
        this.activeName = tab.name;
      },
      getManySelect(){
        let that = this;
        let symptoms = that.symptoms;
        let advisory_content = [];
        advisory_content.push({
          title: "主诉",
          text: symptoms,
        });
        let p = {
          age: that.age,
          name: "",
          sex: that.sex,
          symptoms,
          advisory_content
        }
        // const loading = this.$loading({
        //   lock: true,
        //   text: "Loading",
        //   spinner: "el-icon-loading",
        //   background: "rgba(0, 0, 0, 0.1)",
        //   target: document.querySelector("body"),
        // });
        clickFinishBtn(p).then((res) => {
          if (res.data.code == 0) {
            that.disease_list = res.data.data.symptom_about_sickness; //疾病列表
            that.dataInfo_id = res.data.data.advisory_content.id;

          } else if (res.data.code == 1) {
            that.$message.error({
              message: res.data.msg,
            });
          }
        })
        .catch((e) => {
          loading.close();
          console.log(e);
        });
      },
      // 点击疑似病例
      clickYsbl(n, i) {
        let that = this;
        // this.cdssMedication = '';
        // this.cdssInspection = '';
        that.click_ysbl(n, i);
      },
      click_ysbl(n, i, f) {
        let that = this;
        let name = n;
        let index = i;
        that.hot_name = name;
        that.clickIndex = index;
        let pearms = {
          disease_name: name,
        };
        clickYsbl(pearms).then((res) => {
          if (res.data.code == 0) {
            that.medicine_list = res.data.data.medicine_list; //药品列表
            that.inspection_list = res.data.data.inspection_list; //检查列表
            that.complication_list = res.data.data.complication_list; //并发症
            that.identity_list = res.data.data.identity_list; //鉴别诊断
            if( typeof(f) == "function"){
              let graph = res.data.data.graph; //图谱
              that.is_casePop = true;
              return f(graph);
            }
          }
        }).catch((e) => {
          console.log(e);
        });
      },
      // 点击查看详情
      click_ypxq(t, n,k) {
        let that = this;
        let tag = t;
        let name = n;
        let kgid = k;
        let symptoms = that.symptoms;
        let pearms = {
          name,
          tag: tag,
          symptoms,
        };

        if( kgid && (tag == 'CnMedicinalCrop' || tag == 'zySickNess' || tag == 'ChannelCollateral') ){
          pearms.sickness = kgid
        }
        getNewBaseDetail(pearms).then((res) => {
          if (res.data.code == 0) {
            let getinfo = {};
            if( tag == "Inspection"){
              getinfo = res.data.data[0];
            }else{
              getinfo= res.data.data;
            }
            that.name_1 = getinfo.name.text;
            // let kgid = getinfo.kgid?getinfo.kgid.text:'';
            let getinfo_arr = [];
            for (let key in getinfo) {
              let is_list = 0;
              if (getinfo[key].text.name) {
                is_list = 1;
              }
              if (
                getinfo[key].name != "名称" &&
                getinfo[key].text != "" &&
                getinfo[key].text != "[]" &&
                getinfo[key].name != "kgid"
              ) {
                getinfo_arr.push({
                  is_list,
                  name: getinfo[key].name,
                  text: getinfo[key].text.name
                    ? getinfo[key].text.name
                    : getinfo[key].text,
                  tag: getinfo[key].text.name ? getinfo[key].text.tag : "",
                });
              }
            }
            that.getinfo = getinfo_arr;
            this.is_ypxq = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
      },
      // 点击查看详情弹窗关闭按钮
      ypxqclick_close() {
        this.is_ypxq = false;
      },
    }
    
  }
</script>

<style scoped>

  .el-main{
    padding-top: 20px;
  }
  @import "../assets/css/WesternMedicineCdss.css";
  
  .pages-box{
    /* width: 1200px; */
    padding: 20px;
    background: #fff;
    height: 100%;
  }
  .grid-rightcontent-box{
    max-width: 420px;
  }
  .westernmedicin-content-box{
    justify-content: center;
  }
  .el-empty {
    padding: 10px 0;
  }
  li {
    list-style: none;
  }
  /* 多选框边框跟样式 */
.el-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #27afa1;
  border-color: #27afa1;
}
.el-checkbox >>> .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #27afa1;
}
.el-checkbox >>> .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #27afa1;
}
.el-checkbox >>> .el-checkbox.is-bordered.is-checked {
  border-color: #27afa1;
}
.leftcontent-title-box >>> .el-input__inner:focus {
  border-bottom: 1px solid #27afa1;
}
.el-input-box >>> input:focus {
  border-color: #27afa1;
}
.el-select >>> .el-input__inner:focus {
  border-color: #27afa1;
}
.el-oplistselect-box.el-select >>> .el-input__inner {
  height: 30px;
  line-height: 30px;
  background: none;
  padding-left: 4px;
  padding-right: 20px;
}
.src-components-PatInfo-2ZUg6 >>> .el-input__inner{
  width:100%;
  height: 30px;
  line-height: 30px;
  border: none;
  border-radius: 0;
  border-right: 1px solid #dcdfe6;
  padding: 0 5px;
}
.src-components-PatInfo-2ZUg6 >>> .el-input--prefix .el-input__inner{
  padding-left: 26px;
}
.src-components-PatInfo-2ZUg6 >>> .el-input.is-focus .el-input__inner{
  border-color: #27afa1;
}
.el-oplistselect-box.el-select >>> .el-input__icon {
  line-height: 30px;
  width: auto;
}

.el-oplistselect-box.el-select >>> .el-input.is-focus .el-input__inner {
  border-color: #27afa1;
}
.el-select-dropdown__item.selected {
  color: #27afa1;
}
.el-input-box >>> .el-input__inner {
  height: 34px;
  line-height: 34px;
}
.el-input-box >>> .el-input__suffix {
  top: -5px;
  padding-top: 0;
}
.el-input-box >>> .el-input-group__append {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 100%;
  padding-bottom: 1px;
}
.el-input-box >>> .el-button {
  width: 72px;
  background: #27afa1;
  color: #fff;
  font-size: 14px;
  padding: 0;
  height: 34px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.el-checkbox{
  padding:0 4px;
}
.el-checkbox >>> .el-checkbox__label {
  font-size: 14px;
  padding-left: 2px;
  margin: 4px 0;
}

.src-265y8 .el-oplistselect-box.el-select >>> .el-input__inner {
  border: none;
  text-align: center;
  padding-right: 4px;
}
.src-265y8 .el-oplistselect-box.el-select >>> .el-input__suffix {
  display: none;
}
.grid-rightcontent-title >>> .el-tabs__item.is-active {
  color: #27afa1;
}
.grid-rightcontent-title >>> .el-tabs__active-bar {
  background-color: #27afa1;
}
.grid-rightcontent-title >>> .el-tabs__item:hover {
  color: #27afa1;
}
.grid-rightcontent-title >>> .el-tabs__item {
  padding: 0 10px;
  font-size: 16px;
  font-weight: 600;
}
.grid-rightcontent-title >>> .el-tabs__header {
  margin: 0;
}
.demo-input-suffix >>> .el-input{
  width: 54%;
  height: 30px;
  line-height: 30px;
  margin-right: 12px;
}
.jcyy-input-suffix>>> .el-input{
  flex: 1;
  height: 30px;
  line-height: 30px;
  margin-right: 12px;
}
.demo-input-suffix >>> .el-input .el-input__inner{
  height: 30px;
  line-height: 30px;
}

.demo-input-suffix >>> .el-input .el-input__inner:focus,.jcyy-input-suffix >>> .el-textarea .el-textarea__inner:focus {
  border-color: #27afa1;
}
.src-components-PatInfo-1sipu >>> .el-input__icon{
  line-height: 30px;
}

  /* 媒体查询 */
  @media only screen and (max-width: 1366px) {
    .el-checkbox >>> .el-checkbox__label {
      font-size: 12px;
    }

    .el-input-box >>> .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
    .el-input-box >>> .el-button {
      height: 30px;
    }
  }
</style>