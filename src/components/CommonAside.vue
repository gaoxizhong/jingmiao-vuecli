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
    <div class="logo-box">
      <img src="../assets/image/logo.png" alt="" v-show="!isCollapse"/>
      <h3 style="color:#fff;" v-show="isCollapse">菁苗</h3>
    </div>

			<!-- 第一层 -->
			<template v-for="(item,index) in datalist">
				<!-- 如果第一层有子菜单，则继续循环 -->
				<template v-if="item.subordinate">
					<el-submenu :index="`${index}`" :key="index">
						<template slot="title">
							<i><img src="../assets/image/i-icon.png" alt="" style="margin-bottom: 4px;"/></i>
							<span slot="title" style="padding-left: 8px;font-size: 18px;">{{ item.knowledge_base_name }}</span>
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

                                <el-menu-item v-for="(item_6,idx_6) in item_5.subordinate" :key="idx_6" :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}--${idx_6}`" :name='item_6.name' :tag='item_6.tag'  @click="clickItem_2($event)">{{ item_6.name }}</el-menu-item>
                                </el-submenu>
                              </template>
                              <!-- 如果第五层没有子菜单 -->
                              <el-menu-item v-else :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`" :key="idx_5" :name='item_5.name' :tag='item_5.tag'  @click="clickItem_2($event)">{{ item_5.name }}</el-menu-item>
                              </template>
															<!-- <el-menu-item v-for="(item_5,idx_5) in item_4.departmentLevel2.name" :key="idx_5" :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`" :name='item_5.departmentLevel2' :tag='item_5.tag'  @click="clickItem_2($event)">{{ item_5.departmentLevel2 }}</el-menu-item> -->
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

                                <el-menu-item v-for="(item_6,idx_6) in item_5.subordinate" :key="idx_6" :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}--${idx_6}`" :name='item_6.name' :tag='item_6.tag'  @click="clickItem_2($event)">{{ item_6.name }}</el-menu-item>
                                </el-submenu>
                              </template>
                              <!-- 如果第五层没有子菜单 -->
                              <el-menu-item v-else :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`" :key="idx_5" :name='item_5.departmentLevel2' :tag='item_5.tag'  @click="clickItem_2($event)">{{ item_5.departmentLevel2 }}</el-menu-item>
                              </template>
															<!-- <el-menu-item v-for="(item_5,idx_5) in item_4.departmentLevel2.name" :key="idx_5" :index="`${index}-${idx_2}-${idx_3}-${idx_4}-${idx_5}`" :name='item_5.departmentLevel2' :tag='item_5.tag'  @click="clickItem_2($event)">{{ item_5.departmentLevel2 }}</el-menu-item> -->
														</el-submenu>
													</template>

													<!-- 如果第四层没有子菜单 -->
													<el-menu-item v-else :index="`${index}-${idx_2}-${idx_3}-${idx_4}`" :key="idx_4" :name='item_4.departmentLevel2' :tag='item_4.tag'  @click="clickItem_2($event)">{{ item_4.departmentLevel2 }}</el-menu-item>
												</template>
											</el-submenu>
										</template>
										<!-- 如果第三层没有子菜单 -->
										<el-menu-item v-else :index="`${index}-${idx_2}-${idx_3}`" :key="idx_3" :name='item_3.name' :tag='item_3.tag'  @click="clickItem_2($event)">{{ item_3.name }}</el-menu-item>
									</template>
								</el-submenu>
							</template>
							<!-- 如果第二层没有子菜单 -->
							<el-menu-item v-else :index="`${index}-${idx_2}`" :key="idx_2" style=" display: flex;justify-content: flex-start;align-items:center; padding-left:30px !important;" :tag='item_2.tag' :name='item_2.name' @click="clickItem_2($event)">
                <i class="el-icon-guide"></i>
                <span slot="title">{{ item_2.name }}</span>
              </el-menu-item>
						</template>
					</el-submenu>
				</template>
				<!-- 如果第一层没有子菜单 -->
				<template v-else>
					<el-menu-item :index="`${index}`" :key="index" style="text-align:left; padding-left:20px !important;">
						<i><img src="../assets/image/i-icon.png" alt="" style="margin-bottom: 4px;"/></i>
						<span slot="title" style="padding-left: 8px;font-size: 18px;">{{ item.knowledge_base_name }}</span>
					</el-menu-item>
				</template>
			</template>

    </el-menu>

</template>
<style>
.logo-box{
  width: 100%;
  height: auto;
  padding: 20px 0;
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
    background: #20234E !important;
}
.span-text{
  color:#fff;
  opacity: 0.7;
}
.el-submenu .el-menu-item.is-active{
  color: #fff;
  opacity: 1;
  background: #8FA7FA !important;
}
.el-icon-arrow-down:before{
  color: #fff;
}
</style>
<script>
export default {
    props:['datalist'],
    data() {
        return {
            menuBackgroundColor:'#242a4d',
            menuTextColor:'#fff',
            oneColumn: 0
        }
    },
    watch:{
        datalist(datalist){
        this.datalist = datalist;
        this.aa();
        }
    },
    mounted(){

    },
    created(){

    },
    methods: {
      // 点击左侧一级栏目
      clickItem_1(e){
        console.log(e)
      },
       aa(){
          let arryinfo = this.datalist[0].subordinate[0].subordinate[0].department[0].departmentLevel2.name[0];
         console.log(arryinfo)
          let name = arryinfo.departmentLevel2;
          let tag = arryinfo.tag;
          this.$store.dispatch("sickNess",name);
          let is_details = window.localStorage.getItem('is_details');
          console.log(is_details)
          if(is_details == 1){
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

         console.log(this.datalist)

       },
       handleOpen(key, keyPath) {
          if(key == 0){
           this.oneColumn = key;
          }
          if(key == 1){
           this.oneColumn = key;
          }
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickItem_2(e){
            console.log(e)
             window.localStorage.setItem('is_details',0);
             if(this.oneColumn == 0){
               console.log(0)
                let name = e.$attrs.name;
                let tag = e.$attrs.tag;
                this.$store.dispatch("sickNess",name);
                this.$emit('sickNess')
                this.$router.replace({  //核心语句
                    path:'/Home',   //跳转的路径
                    query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                      name,
                      tag,
                    }
                })
              return
             }
            if(this.oneColumn == 1){
               console.log(1)
                let name = e.$attrs.name;
                let tag = e.$attrs.tag;
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
        },
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
