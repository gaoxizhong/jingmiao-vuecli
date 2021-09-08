<template>
    <el-menu
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse">
        <h3 class="menu-h3">菁苗科技</h3>

        <el-submenu  :index=" index + '' " v-for="(item,index) in menu" :key="index">
            <!-- 一级标题 -->
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.category_name}}</span>
            </template>
            <!-- 二级标题 -->
            <el-submenu :index=" index + '' + '-' + idx + '' " v-for="(item_2,idx) in item.child" :key="idx">
                <span slot="title">{{item_2.category_name}}</span>
            <!-- 三级标题 -->
                <el-menu-item :index=" index + '' + '-' + idx + ''+ '-' + idxx + ''" v-for="(item_3,idxx) in item_2.child" :key="idxx">{{item_3.category_name}}</el-menu-item>
            </el-submenu>

        </el-submenu>

    </el-menu>
</template>
<style>

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .menu-h3{
        height:60px;
        line-height: 60px;
    }
</style>
<script>
export default {
    data() {
    return {
        isCollapse: false,
        menu: [
            {
                id:1,
                category_name:'中医知识库',
                child:[
                    {
                        id:1,
                        category_name:'疾病',
                        child:[
                            {
                                id:1,
                                category_name:'泌尿科',
                            },
                            {
                                id:2,
                                category_name:'泌尿科',
                            },
                            {
                                id:3,
                                category_name:'泌尿科',
                            },
                            {
                                id:4,
                                category_name:'泌尿科',
                            },
                            {
                                id:5,
                                category_name:'泌尿科',
                            }
                        ]
                    },
                    {
                        id:2,
                        category_name:'疾病',
                        child:[
                            {
                                id:1,
                                category_name:'泌尿科',
                            }
                        ]
                    },
                    {
                        id:3,
                        category_name:'疾病',
                        child:[
                            {
                                id:1,
                                category_name:'泌尿科',
                            }
                        ]
                    },
                ]
            },
            {
                id:2,
                category_name:'西医知识库',
                child:[
                    {
                        id:1,
                        category_name:'疾病',
                        child:[
                            {
                                id:1,
                                category_name:'泌尿科',
                            }
                        ]
                    }
                ]
            },
            {
                id:3,
                category_name:'其他知识库'
            }
        ]
    }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    computed: {
        noChild() {
            return this.menu.filter( (item) => !item.child)
        },
        hasChild() {
            return this.menu.filter( (item) => item.child)
        }
    }

}
</script>