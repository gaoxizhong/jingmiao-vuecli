<template>
    <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :background-color="menuBackgroundColor"
        :text-color="menuTextColor"
        default-active="0-0-0-0-0"
        unique-opened
    >
    <div class="logo-box" v-show="!isCollapse" >
      <img src="../assets/image/logo-5.png" alt="" class="logo-img"/>
    </div>
    <div class="logo-box" v-show="isCollapse">
      <div style="padding:10px 0;">菁苗健康</div>
    </div>
			<!-- 第一层 -->
			<template v-for="(item,index) in datalist">
				<!-- 如果第一层有子菜单，则继续循环 -->
				<template v-if="item.subordinate">
					<el-submenu :index="`${index}`" :key="index">
						<template slot="title">
              <i class="el-icon-menu"></i>
							<span slot="title" style="padding-left: 8px;font-size: 16px;">{{ item.knowledge_base_name }}</span>
						</template>
						<!-- 第二层 -->
						<template v-for="(item_2,idx_2) in item.subordinate">
							<!-- 如果第二层有子菜单，则继续循环 -->
							<template v-if="item_2.subordinate">
								<el-submenu :index="`${index}-${idx_2}`" :key="idx_2">
									<template slot="title">
										<i class="el-icon-guide"></i>
										<span slot="title" class="span-text">{{ item_2.name }}</span>
									</template>
									<!-- 第三层 -->
									<template v-for="(item_3,idx_3) in item_2.subordinate">
										<!-- 如果第三层有子菜单，则继续循环 -->
										<template v-if="item_3.department">
											<el-submenu :index="`${index}-${idx_2}-${idx_3}`" :key="idx_3">
												<template slot="title">
													<i class="el-icon-tickets"></i>
													<span slot="title" class="span-text">{{ item_3.name }}</span>
												</template>
												<!-- 第四层 -->
												<template v-for="(item_4,idx_4) in item_3.department">
													<!-- 如果第四层有子菜单，则继续循环 -->
                          <!-- 到这儿了 -->
                          <template v-if="item_4.subordinate">
														<el-submenu :index="`${index}-${idx_2}-${idx_3}-${idx_4}`" :key="idx_4">
															<template slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title" class="span-text" v-if="item_4.level">{{ item_4.level }}</span>
                                <span slot="title" class="span-text" v-else>{{ item_4.departmentLevel1?item_4.departmentLevel1:item_4.departmentLevel2 }}</span>
															</template>
                              <template v-for="(item_5,idx_5) in item_4.subordinate">
                              <!-- 如果第五层有子菜单，则继续循环 -->
                              <template v-if="item_5.subordinate">
                                <el-submenu :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`" :key="idx_5">
                                <template slot="title">
                                  <i class="el-icon-document"></i>
                                  <span slot="title" class="span-text">{{ item_5.departmentLevel2?item_5.departmentLevel2:item_5.level2 }}</span>
                                </template>

                                <el-menu-item v-for="(item_6,idx_6) in item_5.subordinate"
                                :key="idx_6" :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}-${idx_6}`"
                                :name='item_6.name' :tag='item_6.tag'
                                :arr=[item.knowledge_base_name,item_2.name,item_3.name,item_4.level?item_4.level:(item_4.departmentLevel1?item_4.departmentLevel1:item_4.departmentLevel2),item_5.departmentLevel2?item_5.departmentLevel2:item_5.level2,item_6.name]  @click="clickItem_2($event)"><i style="width: 34px;display: inline-block;"></i>{{ item_6.name }}</el-menu-item>
                                </el-submenu>
                              </template>
                              <!-- 如果第五层没有子菜单 -->
                              <el-menu-item v-else :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`"
                              :key="idx_5" :name='item_5.name' :tag='item_5.tag'
                              :arr=[item.knowledge_base_name,item_2.name,item_3.name,item_4.level?item_4.level:(item_4.departmentLevel1?item_4.departmentLevel1:item_4.departmentLevel2),item_5.name]  @click="clickItem_2($event)"><i style="width: 28px;display: inline-block;"></i>{{ item_5.name }}</el-menu-item>
                              </template>
														</el-submenu>
													</template>

													<template v-else-if="item_4.departmentLevel2.name">
														<el-submenu :index="`${index}-${idx_2}-${idx_3}-${idx_4}`" :key="idx_4">
															<template slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title" class="span-text">{{item_4.departmentLevel1}}</span>
															</template>
                              <template v-for="(item_5,idx_5) in item_4.departmentLevel2.name">
                              <!-- 如果第五层有子菜单，则继续循环 -->
                              <template v-if="item_5.subordinate">
                                <el-submenu :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`" :key="idx_5">
                                <template slot="title">
                                  <i class="el-icon-document"></i>
                                  <span slot="title" class="span-text">{{ item_5.departmentLevel2 }}</span>
                                </template>

                                <el-menu-item v-for="(item_6,idx_6) in item_5.subordinate" :key="idx_6" :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}--${idx_6}`" :name='item_6.name' :tag='item_6.tag' :arr=[item.knowledge_base_name,item_2.name,item_3.name,item_4.departmentLevel1,item_5.departmentLevel2,item_6.name]  @click="clickItem_2($event)"><i style="width: 30px;display: inline-block;"></i>{{ item_6.name }}</el-menu-item>
                                </el-submenu>
                              </template>
                              <!-- 如果第五层没有子菜单 -->
                              <el-menu-item v-else :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`" :key="idx_5" :name='item_5.departmentLevel2' :tag='item_5.tag' :arr=[item.knowledge_base_name,item_2.name,item_3.name,item_4.departmentLevel1,item_5.departmentLevel2] @click="clickItem_2($event)"><i style="width: 28px;display: inline-block;"></i>{{ item_5.departmentLevel2 }}</el-menu-item>
                              </template>
															<!-- <el-menu-item v-for="(item_5,idx_5) in item_4.departmentLevel2.name" :key="idx_5" :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`" :name='item_5.departmentLevel2' :tag='item_5.tag'  @click="clickItem_2($event)">{{ item_5.departmentLevel2 }}</el-menu-item> -->
														</el-submenu>
													</template>

													<!-- 如果第四层没有子菜单 -->
													<el-menu-item v-else :index="`${index}-${idx_2}-${idx_3}-${idx_4}`" :key="idx_4" :name='item_4.departmentLevel2' :tag='item_4.tag' :arr=[item.knowledge_base_name,item_2.name,item_3.name,item_4.departmentLevel2]  @click="clickItem_2($event)"><i style="width: 28px;display: inline-block;"></i>{{ item_4.departmentLevel2 }}</el-menu-item>
												</template>
											</el-submenu>
										</template>
										<!-- 如果第三层没有子菜单 -->
										<el-menu-item v-else :index="`${index}-${idx_2}-${idx_3}`" :key="idx_3" :name='item_3.name' :tag='item_3.tag' :arr=[item.knowledge_base_name,item_2.name,item_3.name]  @click="clickItem_2($event)"><i style="width: 20px;display: inline-block;"></i>{{ item_3.name }}</el-menu-item>
									</template>
								</el-submenu>
							</template>
							<!-- 如果第二层没有子菜单 -->
							<el-menu-item v-else :index="`${index}-${idx_2}`" :key="idx_2" style=" display: flex;justify-content: flex-start;align-items:center; padding-left:30px !important;"  :arr=[item.knowledge_base_name,item_2.name] :tag='item_2.tag' :name='item_2.name' @click="clickItem_2($event)">
                <i class="el-icon-guide"></i>
                <span slot="title">{{ item_2.name }}</span>
              </el-menu-item>
						</template>
					</el-submenu>
				</template>
				<!-- 如果第一层没有子菜单 -->
				<template v-else>
					<el-menu-item :index="`${index}`" :key="index" style="text-align:left; padding-left:20px !important;" @click="clickMenuItem(index,item.knowledge_base_name)">
					  <i class="el-icon-menu"></i>
						<span slot="title" style="padding-left: 8px;font-size: 16px;">{{ item.knowledge_base_name }}</span>
					</el-menu-item>
				</template>
			</template>

      <!-- <template>
        <el-menu-item style="text-align:left; padding-left:20px !important;" @click="gotoVideoList">
          <i class="el-icon-menu"></i>
          <span slot="title" style="padding-left: 8px;font-size: 16px;">视频</span>
        </el-menu-item>
        <el-menu-item style="text-align:left; padding-left:20px !important;" @click="gotoQA">
          <i class="el-icon-menu"></i>
          <span slot="title" style="padding-left: 8px;font-size: 16px;">问答</span>
        </el-menu-item>
        <el-menu-item style="text-align:left; padding-left:20px !important;">
          <i class="el-icon-menu"></i>
          <span slot="title" style="padding-left: 8px;font-size: 16px;">CDSS</span>
        </el-menu-item>
      </template> -->

    </el-menu>
</template>
<style>
  .logo-box{
    width: 100%;
    height: auto;
    padding: 10px 0;
  }
  img.logo-img{
    width: 140px;
  }
  .logo-box-span{
    font-size: 14px;
    color: #5578f0;
    text-align: center;
    display: block;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 260px;
    min-height: 400px;
    height: 100%;
  }
  .el-menu{
      height: 100%;
      font-size: 15px;
  }
  .el-submenu__title{
    display: flex;
    align-items: center;
    justify-content: flex-start;
     padding:0;
  }
  .el-menu-vertical-demo>li>ul>li>div.el-submenu__title{
    padding-left: 30px !important;
  }
  .el-menu-vertical-demo>li>ul>li>ul>li>div.el-submenu__title{
  padding-left: 35px !important;
  }
  .el-menu-vertical-demo>li>ul>li>ul>li>ul>li>div.el-submenu__title{
  padding-left: 40px !important;
  }
 .el-menu-vertical-demo>li>ul>li>ul>li>ul>li>ul>li>div.el-submenu__title{
  padding-left: 45px !important;
  }
  .el-menu-item, .el-submenu__title{
    height: 42px;
    line-height: 42px;
    white-space: wrap !important;
  }
 .el-menu--inline>div>li{
    background: #20234e !important;
  }

.el-submenu .el-menu-item {
    width: 260px;
    height: 40px;
    line-height: 40px;
    min-width: 100px;
    justify-content: flex-start;
    text-align: left;
    display: flex;
    padding-left: 40px !important;
    font-size: 14px !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color:#fff;
    opacity: 0.7;
    background: #ebebeb !important;
}
/* .span-text{
  color:#fff;
  opacity: 0.7;
} */
.el-submenu .el-menu-item.is-active{
  color: #fff;
  opacity: 1;
  background: #8FA7FA !important;
}
.el-icon-arrow-down:before{
  color: #000;
}
</style>
<script>
import { WesternMedicine,getHomeRightList,getzyHomeRightList } from '@/api/data'
// getHomeRightList ----> 对应类型为 sickness disease medicine inspection symptom identify 中医类： zysickness  zcy  jl icd10
// getzyHomeRightList ----> 对应类型为 中医类： zy fj ys tz xw

export default {
    // props:['datalist'],
    data() {
        return {
          menuBackgroundColor:'#fff',
          menuTextColor:'#000',
          oneColumn: '0',
          datalist:[],
        }
    },
    // watch:{
    //     datalist(datalist){
    //     this.datalist = datalist;
    //     this.aa();
    //     }
    // },
    mounted(){

    },
    created(){
      this.WesternMedicine();
    },
    methods: {
      // 点击左侧一级栏目
      clickItem_1(e){
        console.log(e)
      },
    // 获取左侧信息
    async WesternMedicine(){
      let that = this;
      await  WesternMedicine({}).then( res =>{
        if(res.data.code == 0){
          let datalist = res.data.data;
          this.datalist = datalist;
          this.aa();
          this.$store.dispatch('delStateurl')
        }
      }).catch(e =>{
          console.log(e)
      })
    },
    aa(){
      let arryinfo = this.datalist[0].subordinate[0].subordinate[0].department[0].departmentLevel2.name[0];
      let crumbsarr = [];
      crumbsarr.push(this.datalist[0].knowledge_base_name);
      crumbsarr.push(this.datalist[0].subordinate[0].name);
      crumbsarr.push(this.datalist[0].subordinate[0].subordinate[0].name);
      crumbsarr.push(this.datalist[0].subordinate[0].subordinate[0].department[0].departmentLevel1);
      crumbsarr.push(this.datalist[0].subordinate[0].subordinate[0].department[0].departmentLevel2.name[0].departmentLevel2);
      this.$store.dispatch("crumbsarr",crumbsarr);
      let name = arryinfo.departmentLevel2;
      let tag = arryinfo.tag;
      this.$store.dispatch("sickNess",name);
      let stateurl = this.$store.state.stateurl;
      if(stateurl){
        return
      }else{
        this.$router.replace({  //核心语句
          path:'/Home',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          name,
          tag,
          }
        })
      }
    },
    handleOpen(key, keyPath) {
      console.log(key)
      this.oneColumn = key;
    },
    handleClose(key, keyPath) {
      console.log(key)
      this.oneColumn = key;
    },
    // 点击第一级没有子级的
    clickMenuItem(key,n){
      console.log(key)
      this.oneColumn = key;
      let name = n;
      // 跳转视频
      if( name == '视频' ){
        this.$emit('sickNess');
        this.$router.replace({path:'/VideoHome'})
      }
      // 跳转问答首页
      if( name == '问答' ){
        // 新页面打开
        let newUrl = this.$router.resolve({
          path: "/QAhome"
        });
        window.open(newUrl.href, "_blank");
      }
      // cdss
      if( name == 'CDSS' ){
        // this.$emit('sickNess')
        // this.$router.replace({path:'/WesternMedicineCdss',});
        let newUrl = this.$router.resolve({
          path: "/WesternMedicineCdss"
        });
        window.open(newUrl.href, "_blank");
        return
      }
    },

    clickItem_2(e){
      console.log(e)
      let name = e.$attrs.name;
      let tag = e.$attrs.tag;
      let crumbsarr = e.$attrs.arr;
      let b1 = crumbsarr.slice(); //  不修改原数组
      this.$store.dispatch("crumbsarr",b1);
      let barckArr = [];
      this.$store.dispatch("barckArr",barckArr);
      // 西医知识库
      if(this.oneColumn.substring(0,1) == 0){
        // this.$store.dispatch("sickNess",name);
        this.$emit('sickNess');
        if(tag == 'clinicalPathway' || tag == 'clinicTrial'){
          this.$router.replace({  //核心语句
            path:'/LcsyHome',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              name,
              tag,
            }
          })
        }else{
          this.$router.replace({  //核心语句
            path:'/Home',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              name,
              tag,
            }
          })
        }

      return
      }
      // 中医知识库
      if(this.oneColumn.substring(0,1) == 1){
        this.$store.dispatch("sickNess",name);
        this.$emit('sickNess')
        this.$router.replace({  //核心语句
            path:'/zyHome',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              name,
              tag,
            }
        })
        return
      }
      // 文献指南
      if(this.oneColumn.substring(0,1) == 2){
        // this.$store.dispatch("sickNess",name);
        this.$emit('sickNess')
        this.$router.replace({  //核心语句
            path:'/litgHome',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
              name,
              tag,
            }
        })
        return
      }
    },
    // 点击临床
    gotoLc(){
      let tag = 'lc';
      let name = '临床';
      this.$emit('sickNess')
      this.$router.replace({  //核心语句
        path:'/LcsyHome',   //跳转的路径
        query:{        //路由传参时push和query搭配使用 ，作用时传递参数
          name,
          tag,
        }
      })
      return
    }
  },
  computed: {
      noChild() {
          return this.menu.filter( (item) => !item.child)
      },
      hasChild() {
          return this.menu.filter( (item) => item.child)
      },
      isCollapse() {
        return this.$store.state.isCollapse
      },
  }

}
</script>
