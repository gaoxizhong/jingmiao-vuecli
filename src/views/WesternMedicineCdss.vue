<template>
  <div :style="`padding: 20px 20px 10px;background: #fff;`">
    <div class="westernmedicin-content-box" style="height: 100%">
      <!-- 左侧模块 -->
      <div class="grid-leftcontent-box">
        <!-- 左侧上部 -->
        <div class="leftcontent-title-box">
          <table class="src-components-PatInfo-2ZUg6">
            <tr>
              <td class="src-components-PatInfo-vDMlM src-components-PatInfo-1sipu" style="min-width:160px;">
                <span>姓名：</span><el-input v-model="form.name"></el-input>
              </td>
              <td class="src-components-PatInfo-vDMlM src-components-PatInfo-1sipu" style="min-width:180px;">
                <span>年龄：</span><el-input type="number" v-model="form.age"></el-input>
              </td>
              <td class="src-components-PatInfo-vDMlM src-components-PatInfo-1sipu" style="min-width:180px;">
                <span>性别：</span><el-input v-model="form.sex"></el-input>
              </td>
              <td class="src-components-PatInfo-vDMlM src-components-PatInfo-1sipu divflex" style="min-width:130px;">
                <span>出生日期：</span>
                <el-date-picker style="width:100%;height:100%;" v-model="form.csrq" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="date" placeholder="选择日期时间"></el-date-picker>
                <!-- <el-input v-model="form.csrq"></el-input> -->
              </td>
            </tr>
            <tr style="border-top: none;">
              <td class="src-components-PatInfo-vDMlM src-components-PatInfo-1sipu" style="min-width:220px;">
                <span>身份证：</span><el-input v-model="form.sfzh"></el-input>
              </td>
              <td class="src-components-PatInfo-vDMlM src-components-PatInfo-1sipu divflex" v-if="Number(form.age) < 6">
                <span>不足一周岁天龄:</span><el-input v-model="form.bzyzsnl"></el-input>
              </td>
              <td class="src-components-PatInfo-vDMlM src-components-PatInfo-1sipu divflex" v-if="Number(form.age) < 6">
                <span>新生儿出生体重:</span><el-input v-model="form.xsecstz"></el-input>
              </td>
              <td class="src-components-PatInfo-vDMlM src-components-PatInfo-1sipu divflex" v-if="Number(form.age) < 6">
                <span>新生儿入院体重:</span><el-input v-model="form.xserytz"></el-input>
              </td>

            </tr>
          </table>
        </div>
        <!-- 左侧上部结束 -->

        <!-- 左侧主体模块开始 -->
        <div class="leftcontent-bottom-box">
          <div class="leftnav-box"></div>
          <div class="info-list-box">
            <!-- 左侧主诉、个人史、现病史、其他史列表选项 -->
            <div class="leftcontent-list-box">
              <div class="blxxDiv-box zsDiv-box" v-for="(item, index) in infoData" :key="index">
                <div class="blxxDiv-title-box zsDiv-title-box"> {{ item.category }}：</div>
                <div class="blxxDiv-info-box">
                  <div style="display: inline-block">
                    <!-- 各项数据按钮循环遍历模块 -->
                    <div class="src-components-RadioDrop-2by7P prefixUnsetColor" v-for="( item_many_select, idx_1 ) in item.many_select_options" :key="idx_1">
                     <!-- ==>  添加症状 信息模块 -->
                      <div style="display: inline-block" v-if="(index == 0 && idx_1 == 0 ) || (index == 1 &&  idx_1 == 2)">
                        <span class="src-common-components-EditableSpan-G8WSU largeFontSize selectColor src-common-components-EditableSpan-CXPJX">
                          <!-- 下拉框数据 -->
                          <span v-for="(item, index) in searchSymptomsList" :key="index" class="span-info" @mouseenter="enter_searchSymptomsList(index)" @mouseleave="leave_searchSymptomsList">
                            <span>{{ item }}</span>
                            <span>,</span>
                            <i class="el-icon-error icon-error-span" v-show="seen_searchSymptomsList && seen_searchSymptomsList_index == index" @click.stop='clicksearchSymptomsList(index)'></i>
                          </span>
                          <!-- 多选框数据 -->
                          <span v-if="checkList.length > 0">
                            <span v-for="(item, index) in checkList" :key="index" class="span-info" @mouseenter="enter_checkList(index)" @mouseleave="leave_checkList">
                              <span>{{ item }}</span>
                              <span>,</span>
                              <i class="el-icon-error icon-error-span" v-show="seen_checkList && seen_checkList_index == index" @click.stop='clickcheckList(index)'></i>
                            </span>
                          </span>
                          <!-- 其他症状搜索项 -->
                          <span v-if="symptomSearch_name.length != ''">
                            <span v-for="(item, index) in symptomSearch_name" :key="index" class="span-info"  @mouseenter="enter_symptomSearchName(index)" @mouseleave="leave_symptomSearchName">
                              <span>{{ item }}</span>
                              <span>,</span>
                              <i class="el-icon-error icon-error-span" v-show="seen_symptomSearchName && seen_symptomSearchName_index == index" @click.stop='clicksymptomSearchName(index)'></i>
                            </span>
                          </span>
                        </span>
                        <div class="src-components-SpreadDrop-2GbRo">
                          <div class="src-components-SpreadDrop-XVhKz largeFontSize selectColor" @click.stop="addSymptom_1(index)">
                            添加症状
                          </div>
                          <!-- 选项弹窗模块 -->
                          <div class="src-components-ListItems-3K8km" style="left: auto" v-show="addSymptomPop_1 && index == is_SymptomPop_index" id="addSymptomPop_1">
                            <div class="clearfix">
                              <!-- <p class="src-components-ListItems-1OJip">按点击顺序成文</p> -->
                              <div class="src-components-ListItems-31jDC">
                                <span class="src-components-ListItems-3iV0y" @click.stop="addSymptomPopEmptyClick">清空选项</span>
                                <span class="src-components-ListItems-3TE88" @click.stop="addSymptomPopSureClick">确定</span>
                              </div>
                            </div>
                            <el-checkbox-group v-model="checkList" @change="checkGroup">
                              <div class="options-list-box" v-for="(item, index) in optionsList" :key="index">
                                <div class="options-list-title">
                                  {{ item.category }}
                                </div>
                                <div class="oplist-items-box">
                                  <div>
                                    <span v-if="item.select_options.length > 0">
                                      <el-select class="el-oplistselect-box el-select" :placeholder="items_options.select_name + '选项' "
                                        v-model="items_options.select_chect" slot="prepend" v-for="(items_options, index_options) in item.select_options" :key="index_options" @change="searchSymptomsChange">
                                        <el-option v-for="(it, inx) in items_options.select_values" :key="inx" :label="it" :value="it"></el-option>
                                      </el-select>
                                    </span>

                                    <span v-for="(items, idx) in item.options" :key="idx">
                                      <el-checkbox :label="items" v-if="items != ''">{{ items }}</el-checkbox>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </el-checkbox-group>

                            <!-- 搜索症状 -->
                            <div class="qt-box">
                              <div class="el-input-box">
                                <el-input placeholder="搜索症状" clearable v-model="inputOtherValue" @input="getInputBtn" auto-complete="" class="input-with-select">
                                  <el-button slot="append" @click.stop="getInputBtn_add">添加</el-button>
                                </el-input>
                              </div>
                              <div class="qt-inputPop-box" v-show="is_symptomSearch" id="is_symptomSearch">
                                <div class="scrollarea" style="max-height: 180px">
                                  <div class="scrollarea-content content">
                                    <ul>
                                      <li class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa"
                                        v-for="(item, index) in symptomSearch_data" :key="index" @click.stop="symptomSearchClick(item)">
                                        {{ item }}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- 选项弹窗模块结束 -->
                        </div>
                      </div>
                      <!-- ==>  添加症状 信息模块 结束 -->
                      <div style="display: inline-block" :index='idx_1'>
                        <div class="selectColor largeFontSize src-Drop-3C2YP src-Drop-2GRSD"
                          v-if="item_many_select.obtain_name"
                          @click.stop=" item_many_selectClick(item_many_select.id,item_many_select.category)">
                          {{ item_many_select.obtain_name }} <span>,</span>
                        </div>
                        <div
                          class="selectColor largeFontSize src-Drop-3C2YP"
                          v-else
                          @click.stop="
                            item_many_selectClick(
                              item_many_select.id,
                              item_many_select.category
                            )
                          "
                        >
                          {{ item_many_select.inspect_name }}
                        </div>
                        <!-- 数据弹窗 -->
                        <div class="src-common-components-DropList-3yJNN" v-if="item_many_select.id == popId && pop1">
                          <div class="clearfix">
                            <!-- <p class="src-components-ListItems-1OJip">按点击顺序成文</p> -->
                            <div class="src-components-ListItems-31jDC">
                              <span
                                class="src-components-ListItems-3iV0y"
                                @click.stop="emptyLiClick(index, idx_1)"
                                >清空选项</span
                              >
                              <span
                                class="src-components-ListItems-3TE88"
                                @click.stop="sureLiClick(item_many_select.id)"
                                >确定</span
                              >
                            </div>
                          </div>
                          <div>
                            <!-- 第一列 -->
                            <ul class="src-components-ListItem-bf29n">
                              <li :class="[idx_2 == 0 ? 'hideClass' : '']" class="src-common-components-LiItem-3S7Fa" v-for="(items, idx_2) in item_many_select.first_column_select" :key="idx_2" @click.stop="SelectLiClick('1', items,item_many_select.id,index,idx_1)">
                                {{ items }}
                              </li>
                            </ul>
                            <!-- 第二列 -->
                            <ul class="src-components-ListItem-bf29n">
                              <li :class="[idx_2 == 0 ? 'hideClass' : '']" class="src-common-components-LiItem-3S7Fa" v-for="(items, idx_2) in item_many_select.second_column_select" :key="idx_2" @click.stop="SelectLiClick('2',items,item_many_select.id,index,idx_1)">
                                {{ items }}
                              </li>
                            </ul>
                            <!-- 第三列 -->
                            <ul class="src-components-ListItem-bf29n">
                              <li
                                :class="[idx_2 == 0 ? 'hideClass' : '']"
                                class="src-common-components-LiItem-3S7Fa"
                                v-for="(
                                  items, idx_2
                                ) in item_many_select.thirdly_column_select"
                                :key="idx_2"
                                @click.stop="
                                  SelectLiClick(
                                    '3',
                                    items,
                                    item_many_select.id,
                                    index,
                                    idx_1
                                  )
                                "
                              >
                                {{ items }}
                              </li>
                            </ul>
                            <!-- 第四列 -->
                            <ul class="src-components-ListItem-bf29n">
                              <li
                                :class="[idx_2 == 0 ? 'hideClass' : '']"
                                class="src-common-components-LiItem-3S7Fa"
                                v-for="(
                                  items, idx_2
                                ) in item_many_select.fourthly_column_select"
                                :key="idx_2"
                                @click.stop="
                                  SelectLiClick(
                                    '4',
                                    items,
                                    item_many_select.id,
                                    index,
                                    idx_1
                                  )
                                "
                              >
                                {{ items }}
                              </li>
                            </ul>
                            <!-- 第五列 -->
                            <ul class="src-components-ListItem-bf29n">
                              <li
                                :class="[idx_2 == 0 ? 'hideClass' : '']"
                                class="src-common-components-LiItem-3S7Fa"
                                v-for="(
                                  items, idx_2
                                ) in item_many_select.fifth_column_select"
                                :key="idx_2"
                                @click.stop="
                                  SelectLiClick(
                                    '5',
                                    items,
                                    item_many_select.id,
                                    index,
                                    idx_1
                                  )
                                "
                              >
                                {{ items }}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <!-- 数据弹窗结束 -->
                      </div>
                    </div>
                    <!-- 各项数据按钮循环遍历模块结束 -->
                  </div>
                </div>
              </div>

              <!-- 主要诊断模块开始 -->
              <div class="blxxDiv-box zsDiv-box">
                <div class="blxxDiv-title-box zsDiv-title-box">诊断：</div>
                <div class="blxxDiv-info-box1" v-if="is_showZd">
                  <div class="demo-input-suffix" v-for="(item,index) in diagnosisList" :key="index">
                    <div>
                      <span>{{item.name}}：</span>
                      <el-input :placeholder="`${item.name}`" v-model="item.input" @input="getDiseases(item.input,item.id)"></el-input>
                    </div>
                    <div class="qt-inputPop-box" v-if=" is_diseasesSearch == 7 && item.id == is_diseasesSearch ">
                      <div class="scrollarea" style="max-height: 180px">
                        <div class="scrollarea-content content">
                          <ul>
                            <li class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa" v-for="(items, idx) in diseasesSearch_data" :key="idx" @click.stop="getIcd(items.name,item.id,index)">
                              {{ items.name }}
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="qt-inputPop-box" v-if=" is_diseasesSearch == 9  && item.id == is_diseasesSearch">
                      <div class="scrollarea" style="max-height: 180px">
                        <div class="scrollarea-content content">
                          <ul>
                            <li class=" src-common-components-LiItem-2PM-m src-common-components-LiItem-3S7Fa"
                              v-for="(items, idx) in diseasesSearch_data" :key="idx" @click.stop="getIcd(items.name,item.id,index)">
                              {{ items.name }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
              <!-- 主要诊断模块结束 -->

              <!-- 检查和用药模块开始 -->
              <div class="blxxDiv-box zsDiv-box">
                <div class="blxxDiv-title-box zsDiv-title-box">检查：</div>
                <div class="blxxDiv-info-box1">
                  <div class="jcyy-input-suffix">
                    <div class="jcyy-input-boxx">
                      <!-- <span>请输入检查：</span> -->
                      <el-input type="textarea" :rows="4" placeholder="请输入检查" v-model="cdssInspection"></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blxxDiv-box zsDiv-box">
                <div class="blxxDiv-title-box zsDiv-title-box">用药：</div>
                <div class="blxxDiv-info-box1">
                  <div class="jcyy-input-suffix">
                    <div class="jcyy-input-boxx">
                      <!-- <span>请输入用药：</span> -->
                      <el-input type="textarea" :rows="4"  placeholder="请输入用药药品" v-model="cdssMedication"></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 检查和用药模块结束 -->

            </div>
            <!-- 左侧主诉、个人史、现病史、其他史列表选项结束 -->
          </div>
        </div>
        <!-- 左侧主体模块结束 -->
        <!-- 左侧底部 -->
        <div class="src-components-Operation-1pym1">
          <div class="srcdiv-box">
            <span class="src-components-Operation-1PVES" @click="getUserAdvisory">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAmdJREFUOBGNVN9LVEEUPnN3iUoyQkoiMQhKqIwegghLzJcoMYMelCiKYKN/IhKC8rVXoVWfkn1IfaheEtdUuE9iuisKEu2uEIUVtWaL7d7pfLM7gzPu5h44986c851vfpxzhsiVluicZBECDox6J9MO5vdmXioT3I7Pmc5+XgdIdg0nKyCxnhNEHgxw9E2nEe0rgEYWAtiU+AoJb+9kioIi0QuFvhj9kFGDMp9LgwsdxqxpjaHMIOzaePXxOyPL7acP1dDi2gZFr5+gkChuXO0cAa0Dc3J0aa201+KvbzqDQVZdb8vQ/FUqBG8ArtsTprGeUzS2/I0a9+9mNpF7Gl9Zga96aR2Yv1YJ/b8bsWL0jZjLtbxlJhYQ0dDE13WJSmGJ6Bh1aj1hhyhICm7GFulCQy39yQfUefwAnTtSa+FQhT5fNpiUoABQWCCylt74Wzh/8uBevQB5zJP6mTNzM2CayO1XS1KX0qOJT4oZALU27kqSbIDh+ZVj5HkepZmpq6mObsUSmZfdzY1mk0gjn6RfByCoGhEkVmVIPJi5e+athdcJsIxVTrbGbitbzbEVBNvM/bPmNBpT7l+RsFoCl9RKn+vEnNNymHUc6UHOR7ifoPphgQ+ts03cI2Jeek7k43hKIuU6/SDHGDaURUlM2SpylxBGBmbR4c+KXa0DrT86HjsGFjE7HTmJ7vdXf+nnDDFG8MThvTnKGJYkPiZzKFrheQ+n7jW/hgPCq8L/jhut/cn7NH38kSPdIlhk364QDd5ootjCl83+7/U18csirwJ3+oCYNcLqs2ZLijFsom1ChruHEz3g+QelE7Z+u9Lc3wAAAABJRU5ErkJggg=="
                alt=""/>
              预览
            </span>
            <span class="src-components-Operation-3GqtE" @click="finish_btn">保存</span>
          </div>
        </div>
      </div>
      <!-- 右侧智能问诊模块 -->
      <div class="grid-rightcontent-box">
        <div class="grid-rightcontent-title">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="辅助诊疗" name="auxiliary"></el-tab-pane>
            <el-tab-pane label="西医知识" name="medicine"></el-tab-pane>
            <el-tab-pane label="中医知识" name="cnMedicine"></el-tab-pane>
            <el-tab-pane label="相似病例" name="similar"></el-tab-pane>
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
                      <a href="javascript:0;" class="cjyp-table-tr-r" style="font-weight: 100;font-size:13px;" @click.stop="clickCktp(item.name, index)">
                       <i class="el-icon-share" style="color: #53bfb4; margin-right: 6px"></i>查看图谱
                      </a>
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
              <!-- 鉴别诊断模块开始 -->
              <!-- <div class="src-components-PushItems-1jpJi src-Items-cbzd src-Items-list">
                <h1 style="background: #EAF7FA;"> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAk1JREFUOBGNVM1qFEEQrprs+ASevEoIZJ8hQRQ8qAcDmRiyG/CQBCQXfQBhwQfwFASTg5BNiFlBQZODoCz6CllJMLl78AmcZMuvaqbanskmsWHo6q+qvuqpnya6csl8e2qEkWStXwGWbPG2HyoKByu7ZO29AMjC4/FwKIWE8jxVWWZbYnvWPkxI6K4ZMBfuIt/YtJ1OQoPjj8S8z7ubawaaQrn/5O+JaQ7eA2DPYPSQe91bqreFGAcu13cBs8y37jTsyiJNN/CLgW0PbA8svNC9gjFr992wvsvc4qpi4Y560BB0xmskMoHjOr/bWlF85KpkL7IIjDDog+kDdC8Rp4k/36Vr6Qxvv/kZ7C+qklbSS2K/Ts3xG8ErEri3+dVyqxhCHka6UDfHEG1SZdRQJmD8SQ/+IyGXBtLA9ABf69mXG4fzbOupy+RJDUAkwLEfjtrLbuyMVuOomUMe1au8xjLqfERjsso7W1+crWLooDlpOU/pEZymy5Ki4CBAw1KD3sYksV+F0MbuTHrEyQuavPmKO52hkRfDI9Z1APT69OPkCcnwOY1xxjvd7zGpyZoE/+9zyksA9akkUG01J/j+pb9GoIn15NZUdlTfMq/EZihSDI7Ob697350qOgcvs4GuiIB29JZzv3hHdNEvxmJZfRHcWjoxBUqvY2TJji1LGQPL+o1QFQXSEVQOrGBkY5bnqFayYNM0yruGFQ/tcJvSdMrnORC6bUF8uo5+uw5sAyE/l8+fhtcHQR/SJfTkb0oby07k/v+1a3Hw2SRf5fAXDTEdluow+PQAAAAASUVORK5CYII=" alt=""/>
                  鉴别诊断
                </h1>
                <div>
                  <div class="cjyp-table-tr" style="padding:5px;" v-for="(item, index) in identity_list" :key="index">
                    <div class="cjyp-table-tr-l" style="-webkit-line-clamp: 3;" :title="item.name">{{ item.name.substring(0,25)+'...' }}</div>
                    <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_identity(item.name)">查看详情</a>
                  </div>
                  <div style="padding: 6px 0 6px 15px" v-if="!identity_list || identity_list.length <= 0">暂无数据...</div>
                </div>
              </div> -->
              <!-- 鉴别诊断模块结束 -->
              <!-- 并发症模块开始 -->
              <!-- <div class="src-components-PushItems-1jpJi src-Items-cbzd src-Items-list">
                <h1> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAa9JREFUOBGtVKFSxDAQfem0CLAIFA6JQdwHgIAPuDIDPeAwGLDIQ3ASjcFwwByI4wPOwAcgMEgcCAwWBC2E7KbpNLm0HAMRSTb79mXzdlvgL0PGG22Ol+vtuVqiAulFGa9stp4132rSLSNlnJwGkNgqHyKc2tfoPMxkIcooPszSTcjoGEjvxKA/W/aDACYBy6GMIiFyyLg9w2szkd41br3QOQ8r0pwpubw5kp+eCIgVhJPz4urkNY8Zf7FfHSdPQNSASHcRRufisvc4QuXmSCqY/AqwCzIOC6xAPePwrTKvZwCBZQLICg11lQiwtjNdVRUm4AfSTo2qEnpzd8EuyNZRpYHs/UHdMVSds63v07MFLDtoT/kjezvikrJTDqlh60rrJeSCfGS3EKIjBhc95sonFkjKLibCRV+FLcI6ojIp7auImTB/2j0QHLgZuUSurUv6daikWCApAgawwFHDkFFzmAYhf52tY1SjMwcQ6huV2NT5QIdscd23pPjJBj73qOIcSxON3+inI/w6WpmMS1xVEIofISxup79ymt4oxFnxYZEs9CONoiVfy5jYf12/AekE+Xpx4MgpAAAAAElFTkSuQmCC" alt=""/>
                  并发症
                </h1>
                <div>
                  <div class="cjyp-table-tr" v-for="(item, index) in complication_list" :key="index">
                    <div class="cjyp-table-tr-l">{{ item.name }}</div>
                    <a class="cjyp-table-tr-r" href="javascript:0;" @click="click_ypxq('Disease', item.name)">查看详情</a>
                  </div>
                  <div style="padding: 6px 0 6px 15px" v-if="!complication_list || complication_list.length <= 0">暂无数据...</div>
                </div>
              </div> -->
              <!-- 并发症模块结束 -->

              <!-- 病案首页质控模块开始 -->
              <div class="src-Items-hlyy">
                <h1> 
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAmpJREFUOBGNVM9rE0EUntlMVDaNUluUeihU7CWBNGezaXOyUOvRgkgDiaDg1ZtHRSj4D3jpbom/IFAoSBUVsdrEix52C+tJEDx4SMT6G2M2Gd/bOuPsj0DmkHnv+76ZzPvm7RAyaFAkCqbNj42M6UGRYdquhhAnJBOgLr7hSQkYlvNBJEXTnhdxdDYsewXRguU8kyyAyzIJB/N19zBizDCd75ySl4TzhcdLWVqy3h8IiIuWc1UAZ+vuPljwVOQDZ6w7liw95wzquqySBdN5reYEBPUAoCTGmn0dU+b/pFgVzGzDf40rmr2Q09UINhSAFWKlQqw6gJh/dRiAb9ro8YyslBN+EPHYMdASUMsdcSU0zluxQ/gOpRA9a1TzWSGEZWn09n8OETaNuGiVUBvLx4WpqkjE4MY9jBla0v6p38BELYZSstmo5BfBhkXk/MaHg9/inFxCQB0g/sLIoYmtytRvX6iSGBs1d5J43ip4Ows9KS/B11H6h3LoVcYuNMpZ+XGIPYLVC9TzXLKfTjbP53YFpM7G3Z1R0vFws7SKYyztVgmNaBne6a+Diz84h3P+Gxj7GHCoEfjQs2qqWBSHCQ7n2JJLt90TXrf7SqNaThVjnAAMPpkWSyZPbi1n34X5SF5cc27Cu7IRIUIAalAbgvfaAcFTNefIrx63aUI7t13OvQgL4/JibWeO9/r39QTNPynPtFDjG47PVJd8+zqSYhPwbH1GAk6wic8YxpFB6cNmZeY04mcefNR3P7Vb6aP62KOF6Y68wYJl36GE9mlKv7K9NN2ObBIDzNacqZ7HryHVrOYHv7gxa4eG/gKatuNgPCIG8gAAAABJRU5ErkJggg==" alt=""/>
                  病案首页质控
                </h1>
                <!-- 病案首页质控列表 -->
                <!-- <div class="basyzkdiv-box" v-if="basyzk_list.length > 0">
                  <div class="src-components-PushItems-RecommendInspect-1-s8y">提示：</div>
                  <div class="basyzkdiv-items-box">
                    <span v-for="(item, index) in basyzk_list" :key="index">{{ item }}</span>
                  </div>
                </div> -->
                <div style="padding: 6px 0 6px 15px">暂无</div>
                <!-- 病案首页质控列表结束 -->
              </div>
              <!-- 病案首页质控模块结束 -->


            </div>
          </div>
          <!-- 辅助诊疗模块结束 -->
          <!-- 西医知识模块 -->
          <div class="rightcontent-info-bodybox" v-if="activeName == 'medicine'">
            <div class="sousuo-box">
              <!-- 搜索头部部分 -->
              <div class="sousuo-top-box">
                <div class="el-input-box" style="width: 80%">
                  <el-input placeholder="搜索症状" v-model="inputMedicineValue" class="input-with-select" @keydown.enter.native="searchEnterFun($event)">
                    <el-button slot="append" @click="getMedicineInputBtn()">确定</el-button>
                  </el-input>
                </div>
                <div class="Medicine-checkbox-box">
                  <span style="padding-top:6px;">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  </span>
                  <el-checkbox-group v-model="checkMedicineTagList" @change="checkMedicine">
                    <div class="options-list-box">
                      <div class="oplist-items-box">
                        <span v-for="(item, index) in MedicineTagList" :key="index">
                          <el-checkbox :label="item.tag">{{item.name}}</el-checkbox>
                        </span>
                      </div>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
              <!-- 搜索头部部分结束 -->
              <!-- 搜索结果部分 -->
              <div class="MedicineTagList-box">
                <p class="src-components-MedicalInfo-z8HVu">搜索结果</p>
                <!-- 搜索结果列表部分 -->
                <div class="MedicineTagList-infodiv">
                  <div v-for="(item, index) in MedicineIfoList" :key="index">
                    <ul v-if="item.list || item.list.length > 0">
                      <li v-for="(items, idx) in item.list" :key="idx" @click="click_ypxq(item.tag, items.name)">
                        <span>{{ items.name }}</span>
                        <i>( {{ item.tag_name }} )</i>
                      </li>
                    </ul>
                  </div>
                  <el-empty description="暂无数据..." v-if="!MedicineIfoList || MedicineIfoList.length <= 0"></el-empty>
                </div>
                <!-- 搜索结果列表部分结束 -->
              </div>
              <!-- 搜索结果部分结束 -->
            </div>
          </div>
          <!-- 西医知识模块结束 -->
          <!-- 中医知识模块 -->
          <div class="rightcontent-info-bodybox" v-if="activeName == 'cnMedicine'">
            <div class="sousuo-box">
              <div class="sousuo-top-box">
                <div class="el-input-box" style="width: 80%">
                  <el-input placeholder="搜索症状" v-model="inputcnMedicineValue" class="input-with-select"  @keydown.enter.native="CnMedicinesearchEnterFun($event)">
                    <el-button slot="append" @click="getCnMedicineInputBtn()">确定</el-button>
                  </el-input>
                </div>
                <div class="Medicine-checkbox-box">
                  <span style="padding-top:6px;">
                    <el-checkbox :indeterminate="cnMedicine_isIndeterminate" v-model="cnMedicine_checkAll" @change="handleCnCheckAllChange">全选</el-checkbox>
                  </span>
                  <el-checkbox-group v-model="checkCnMedicineTagList" @change="checkCnMedicine">
                    <div class="options-list-box">
                      <div class="oplist-items-box">
                        <span v-for="(item, index) in cnMedicineTagList" :key="index">
                          <el-checkbox :label="item.tag">{{item.name}}</el-checkbox>
                        </span>
                      </div>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
              <!-- 搜索头部部分结束 -->
              <!-- 搜索结果部分 -->
              <div class="MedicineTagList-box">
                <p class="src-components-MedicalInfo-z8HVu">搜索结果</p>
                <!-- 搜索结果列表部分 -->
                <div class="MedicineTagList-infodiv">
                  <div v-for="(item, index) in cnMedicineIfoList" :key="index">
                    <ul v-if="item.list || item.list.length > 0">
                      <li v-for="(items, idx) in item.list" :key="idx" @click="click_ypxq(item.tag, items.name,items.kgid)">
                        <span>{{ items.name }}</span>
                        <i>( {{ item.tag_name }} )</i>
                      </li>
                    </ul>
                  </div>
                  <el-empty description="暂无数据..." v-if="!cnMedicineIfoList || cnMedicineIfoList.length <= 0"></el-empty>
                </div>
                <!-- 搜索结果列表部分结束 -->
              </div>
              <!-- 搜索结果部分结束 -->
            </div>
          </div>
          <!-- 中医知识模块结束 -->
          <!-- 相似病例模块 -->
          <div class="rightcontent-info-bodybox" v-if="activeName == 'similar'">
            <el-empty description="暂无数据..."></el-empty>
          </div>
          <!-- 相似病例模块结束 -->
        </div>

        <div class="mz-box">
          <span style="color: #27afa1">免责声明: </span>以上仅供参考,以医生临床诊断为主
        </div>
      </div>
      <!-- 右侧智能问诊模块结束 -->
    </div>
    <!-- 以下各种弹窗功能 -->
    <!-- 数据弹窗 -->
    <!-- 点击右侧医学知识列表图谱弹窗 -->
    <div class="casePop-mask" v-if="is_casePop"></div>
    <div class="casePop-module-box" v-if="is_casePop">
      <div class="close-box" @click="click_close">
        <i class="el-icon-circle-close"></i>
      </div>
      <div class="main-box">
        <!-- main 右侧图谱 -->
        <div class="main-box-left">
          <div class="main-box-left-t">
            <div style="font-weight: 600">
              <i class="el-icon-share"></i> 疾病图谱
            </div>
            <div class="main-box-right-r" @click="click_ypxq('Disease', hot_name)">
              <i class="el-icon-s-operation"></i>
              <span style="padding-left: 4px">查看详情</span>
            </div>
          </div>
          <div class="atlas-box">
            <d3Atlas
              :data="data"
              :labels="labels"
              :linkTypes="linkTypes"
              :width="cdssWidth"
              :height="cdssHeight"
              v-if="data.nodes.length > 0"/>
            <el-empty description="暂无数据..." v-if="!data.nodes || data.nodes.length <= 0"></el-empty>
          </div>
        </div>
      </div>
    </div>
    <!-- 点击左侧病例弹窗结束 -->

    <!-- 点击病例弹窗查看详情 -->
    <DetailsMask :getinfo="getinfo" :name_1="name_1" :is_nofr="is_nofr" @ypxqclick_close="ypxqclick_close" v-if="is_ypxq" />
    <!-- 点击病例弹窗查看详情弹窗结束 -->
    
    <!-- 点击预览按钮弹窗 -->
    <div class="src-components-Preview-34-Hv" v-if="is_useradvisory"></div>
    <div class="src-components-Preview-1CrEY" id="previewWrapper" v-if="is_useradvisory">
      <div class="src-components-Preview-1MO3X drag-title">预览</div>
      <img class="src-components-Preview-2DV3S" @click="useradvisory_close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgyMDU5MUI4NERDQzExRThBODA0QzAzNjEzMzU4OUZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgyMDU5MUI5NERDQzExRThBODA0QzAzNjEzMzU4OUZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODIwNTkxQjY0RENDMTFFOEE4MDRDMDM2MTMzNTg5RkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODIwNTkxQjc0RENDMTFFOEE4MDRDMDM2MTMzNTg5RkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4YYCuDAAAA80lEQVR42mL8//8/Ay0BEwONwagFI90CZyeX+0C8Go88GxCvp8QHs4A4BGhIDw75e0AcQLYFe/ftaQdS0UBcDLSkD8nljED8AMiUBmJlfGYwEpOTgYYlAam5QNwAxN1AfBeIJYBYDuiIxxRbALUkBEiB4uMlEH8AYjug4a+oloqAhq0BUn+BWByIlxJjOClBJAykHkODZg4QTwDiNqAl1RT7AGi4KJB6A8S/gdgYaOhEIF0CxFVAuUpK84EekAIFxWsgFgMa/gsaXL1AKhfkCzxJmCgfrIcGjRTQ0J9ocTIFSDWCkjBVUtFoYTdqwcBZABBgAFj3V+zxCrbRAAAAAElFTkSuQmCC"
        alt=""/>
      <div class="src-components-PreviewBody-2-yuL">
        <div class="src-components-PreviewBody-1_yxF" style="margin: 0px auto; max-width: 620px">
          <div>
            <div class="src-components-Information-2Lh0V">
              菁苗健康医疗健康数字化平台
            </div>
            <table class="src-components-Information-1euAh">
              <tr>
                <td>姓名：{{ getUserAdvisory_list.name }}</td>
                <td>年龄：{{ getUserAdvisory_list.age }}</td>
              </tr>
              <tr>
                <td>性别：{{ getUserAdvisory_list.sex == 1 ? "男" : "女" }}</td>
                <td>就诊时间：{{ getUserAdvisory_list.create_time }}</td>
              </tr>
            </table>
          </div>
          <table class="src-components-PreviewBody-37xVG">
            <tr class="src-components-PreviewBody-2-owb" v-for="(item, index) in getUserAdvisory_list.advisory_content" :key="index">
              <td class="src-components-PreviewBody-9arcl">
                {{ item.title }}：
              </td>
              <td class="src-components-PreviewBody-9arcl">{{ item.text }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- 点击预览按钮弹窗结束 -->
  </div>
</template>

<style scoped>
.el-empty {
  padding: 10px 0;
}
li {
  list-style: none;
}
@import "../assets/css/WesternMedicineCdss.css";

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
<script>
  import d3Atlas from "../components/d3Atlas";
  import Qs from 'qs';
  import Time from '../assets/js/time';
  import DetailsMask from '../components/WesternMedicineCdss/DetailsMask';

  import {
    getWesternSymptomList,
    clickFinishBtn,
    clickYsbl,
    getSickNess,
    getMedicineList,
    getchoosesymptomBtn,
    getManySelect,
    getUserAdvisory,
    getDiagnosis,
    getIcd,
    getDiseases,
    DrumpServices_ZK,
    getNewBaseDetail
  } from "@/api/data";
  // const x2js = require("x2js");
  export default {
    name: "WesternMedicineCdss",
    components: {
    d3Atlas,
    DetailsMask
  },
  data() {
    return {
      is_useradvisory: false,
      viewHeight: 0,
      popId: 0, // 主页数据弹窗标识
      pop1: false,
      infoData: [], // 主页数据
      optionsList: [], // 添加症状内接口数据
      checkList: [], // 多选框 选中项label
      symptoms:'',
      searchSymptomsList: ['腿疼'], // 列表下拉框选中数据
      inputOtherValue: "", // 搜索症状
      symptomSearch_name: [], // 搜索症状列表项
      is_symptomSearch: false, // 搜索结果弹窗状态
      symptomSearch_data: [],
      addSymptomPop_1: false, //选项弹窗模块显示状态
      is_SymptomPop_index: -1,
      //  现病史------的添加症状字段
      optionsList_2: [], // 现病史---添加症状内接口数据
      checkList_2: [], // 现病史---多选框 选中项
      searchSymptomsList_2: ['腿疼'], // 现病史---列表下拉框选中数据
      inputOtherValue_2: "", // 现病史---搜索症状
      symptomSearch_name_2: [], // 现病史---搜索症状列表项
      is_symptomSearch_2: false, // 现病史---搜索结果弹窗状态
      symptomSearch_data_2: [], // 现病史---搜索结果数据
      addSymptomPop_2: false, // 现病史--- 选项弹窗模块显示状态
      //  现病史------的添加症状字段以上
      cdssInspection:'', // cdss-- 检查项字段
      cdssMedication:'', // cdss -- 用药项字段
      activeName: "auxiliary",
      form: {
        name: "王明明",
        age: "58",
        sex: "男",
        sfzh: "330127198912311234",
        csrq: "",
        bzyzsnl: "",
        xsecstz: "",
        xserytz: "",
      },
      disease_list: [], // 获取的辅助诊疗疑似病例数据
      clickIndex: -1, //疑似病例列表下标
      hot_name: "", //疑似病例列表标题
      medicine_list: [], //  常见药品
      inspection_list: [], // 常见检查
      complication_list: [], // 并发症
      identity_list: [], // 鉴别诊断
      data: {
        //  图谱数据
        nodes: [],
        likes: [],
      },
      labels: [],
      linkTypes: [],
      cdssWidth: 800,
      cdssHeight: 600,
      is_casePop: false, //展示常见药品、检查、图谱弹窗
      is_ypxq: false, //点击常见药品、检查、图谱查看详情弹窗
      name_1: "", // 常见药品、检查、图谱查看详情弹窗标题
      inputMedicineValue: "", // 左侧西医知识内搜索框
      checkMedicineTagList: [], //西医知识
      checkAll: false, // 西医知识全选状态
      isIndeterminate: false, // 西医知识
      MedicineTagList: [  //西医知识
        { name: "诊断", tag: "Identity" },
        { name: "药品", tag: "MedicineProduction" },
        { name: "检查", tag: "Inspection" },
        { name: "疾病", tag: "Disease" },
      ],
      MedicineIfoList: [], // 西医知识搜索结果过数据列表、

      inputcnMedicineValue:"", // 左侧中医医知识内搜索框
      checkCnMedicineTagList: [], //中医知识
      cnMedicine_checkAll: false, // 中医知识全选状态
      cnMedicine_isIndeterminate: false, // 中医知识
      cnMedicineTagList: [  //中医知识
        { name: "疾病", tag: "zySickNess" },
        { name: "中药", tag: "CnMedicinalCrop" },
        { name: "中成药", tag: "CnPatentMedicine" },
        { name: "方剂", tag: "Prescription" },
        { name: "药膳", tag: "TonicDiet" },
        { name: "经络", tag: "ChannelCollateral" },
        { name: "穴位", tag: "Acupoint" },
        { name: "体质", tag: "Constitution" },
      ],
      cnMedicineIfoList: [], // 中医知识搜索结果过数据列表、


      dataInfo_id: 0, // 点击保存后返回数据的id,用于预览
      getUserAdvisory_list: {},
      diagnosisList:[], // 主要诊断选项列表
      is_showZd: true,
      basyzk_list:[], // 病案首页指控检验错误提示信息
      is_diseasesSearch:0,
      diseasesSearch_data:[],
      seen_checkList:false,
      seen_checkList_index: -1,
      seen_searchSymptomsList:false,
      seen_searchSymptomsList_index: -1,
      seen_symptomSearchName: false,
      seen_symptomSearchName_index: -1,
      is_nofr: true,
    };
  },
  created() {
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.getWesternSymptomList(); //获取主页 主诉添加选项按钮内 数据
    // this.getWesternSymptomList_2(); //获取主页 现病史添加选项按钮内 数据
    this.getManySelect(); //获取主页展示数据
    this.getDiagnosis(); //主要诊断选项列表
    document.addEventListener("click", (e) => {
      let box_1 = document.getElementById("addSymptomPop_1");
      let box_2 = document.getElementById("is_symptomSearch");
      if (!box_1.contains(e.target)) {
        this.addSymptomPop_1 = false;
      }
      if (!box_2.contains(e.target)) {
        this.is_symptomSearch = false;
        this.symptomSearch_data = [];
        // this.inputOtherValue = "";
      }
    });
  },
  mounted() {},
  updated() {},
  computed: {
    // 计算属性的 方法名及为 差值表达式属性值
  },
  methods: {
    setsickNess(){
        this.is_showZd = false;
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
        this.$nextTick(() => {
            this.is_showZd = true
        })
    },
    // 主诉多选数据鼠标事件
    enter_checkList(i){
      this.seen_checkList = true;
      this.seen_checkList_index = i;
    },
    leave_checkList(){
      this.seen_checkList = false;
      this.seen_checkList_index = -1;
    },
    clickcheckList(i){
      let checkList = this.checkList;
      let index = i;
      checkList.splice(index,1);
      this.checkList = checkList;
    },
    // 主诉下拉选择数据鼠标事件
    enter_searchSymptomsList(i){
      this.seen_searchSymptomsList = true;
      this.seen_searchSymptomsList_index = i;
    },
    leave_searchSymptomsList(){
      this.seen_searchSymptomsList = false;
      this.seen_searchSymptomsList_index = -1;
    },
    clicksearchSymptomsList(i){
      let searchSymptomsList = this.searchSymptomsList;
      let index = i;
      searchSymptomsList.splice(index,1);
      this.searchSymptomsList = searchSymptomsList;
    },
    // 主诉其它选项数据鼠标事件
    enter_symptomSearchName(i){
      this.seen_symptomSearchName = true;
      this.seen_symptomSearchName_index = i;
    },
    leave_symptomSearchName(){
      this.seen_symptomSearchName = false;
      this.seen_symptomSearchName_index = -1;
    },
    clicksymptomSearchName(i){
      let symptomSearch_name = this.symptomSearch_name;
      let index = i;
      symptomSearch_name.splice(index,1);
      this.symptomSearch_name = symptomSearch_name;
    },
    // 点击右侧疑似诊断列表名前 图标
    clickYszdIcon(n){
      let name = n;
      let diagnosisList = this.diagnosisList;
      let id = '';
      diagnosisList.forEach(ele =>{
        if(ele.id == '7'){
          ele.input = name
        }
      })
      this.diagnosisList = diagnosisList;
      this.getIcd(name,'7',0);
      console.log(diagnosisList)
    },
    // 点击右侧检查项名称前图标
    clickInspectionIcon(n){
      let name = n;
      this.cdssInspection = name;
    },
    // 点击右侧常见药品项名称前图标
    clickMedicineIcon(n){
      let name = n;
      this.cdssMedication = name;
    },
    // 获取 主诉添加症状数据
    getWesternSymptomList(){
      let that = this;
      getWesternSymptomList({}).then((res) => {
        if (res.data.code == 0) {
          let listData =  res.data.data;
          let optionsList = listData.slice();
          that.optionsList = optionsList;
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },
    // 获取 现病史添加症状数据
    getWesternSymptomList_2(){
      let that = this;
      getWesternSymptomList({}).then((res) => {
        if (res.data.code == 0) {
          let listData =  res.data.data;
          that.optionsList_2 = listData.slice();
        }
      })
      .catch((e) => {
        console.log(e);
      });
    }, 
    // 诊断获取关键词
    getDiseases(i_n,t){
      let that = this;
      let name = i_n;
      let id = t;
      if(id == 7 || id == 9){
        getDiseases({keyword:name}).then(res =>{
          if(res.data.code == 0){
            if(res.data.data.length> 0){
              that.is_diseasesSearch = id;
              that.diseasesSearch_data = res.data.data;
            }else{
              that.is_diseasesSearch = 0;
            }
          }else{
            that.is_diseasesSearch = 0;
            that.diseasesSearch_data = [];
          }
        })
      }
    },
    //  getIcd 获取编码
    getIcd(i_n,t,i){
      let that = this;
      let name = i_n;
      let id = t;
      let index = i;
      let diagnosisList = that.diagnosisList;
      diagnosisList[index].input = name;
      if(id == 7 || id == 9){
        getIcd({name}).then(res =>{
          if(id == 7){
            // ========================================================================
            that.click_ysbl(name, -1);
            diagnosisList.forEach(el =>{
              if(el.id == 8){
                el.input = res.data.data.length > 0 ? (res.data.data[0].icd?res.data.data[0].icd: el.input): el.input
              }
            })
          }
          if(id == 9){
            diagnosisList.forEach(el =>{
              if(el.id == 10){
                el.input = res.data.data.length > 0 ? (res.data.data[0].icd?res.data.data[0].icd: el.input): el.input
              }
            })
          }
          that.is_diseasesSearch = 0;
          that.diagnosisList = diagnosisList;
          that.setsickNess();
        })
      }
    },
    // 获取主要诊断选项
    getDiagnosis(){
      let that = this;
      getDiagnosis({}).then(res =>{
        if(res.data.code == 0){
          that.diagnosisList = res.data.data
        }
      })
    },
    // 首页质控第三方接口验证
    DrumpServices_ZK(s_p) {
      let that = this;
      let Services_Params = s_p;
      let time = new Date();
      var mytime=Time.formatTime(time); //获取当前时间
      console.log(mytime);
      let M_id = "Z002489642";
      let Params = {
        "hosId":"12231181414604795K",
        "mid":"Z002489642",
        "jkkh":"//",
        "gj":"CHN",
        "diagnos":[],
        "fee":[{"hosId":"12231181414604795K","type":"A04","fee":532.8,"cysj":"2021-01-04 08:00:00","mid":"Z002489642"}],
        "operation":[],
        }
        for( var key in Services_Params ){
          Params[key]=Services_Params[key]
        }

        let diagnosisList = that.diagnosisList;
       let d_diagnos ={
          "hosId":"12231181414604795K",
          "mid":"Z002489642",
          "cysj": mytime,
        };
        let d_operation = {
          "hosId":"12231181414604795K",
          "mid":"Z002489642",
          "cysj":mytime,
        }
        diagnosisList.forEach(el =>{
          if(el.id == 7 || el.id == 8){
           Params[el.tag] = el.input;
          }
          if(el.id == 9 || el.id == 10 ){
          //  Params[el.tag] = el.input;
          d_diagnos[el.tag] = el.input;
          }
          if(el.id == 13 || el.id == 14 ){
          //  Params[el.tag] = el.input;
          d_operation[el.tag] = el.input;
          }
        })
        Params.diagnos[0] = d_diagnos;
        Params.operation[0] = d_operation;

     var data = Qs.stringify({"M_id":M_id,"Params":JSON.stringify(Params)});

      DrumpServices_ZK(data).then( res =>{
        if(res.data.count == 0){
          
        }else{
          that.basyzk_list = res.data.data;
        return;
        }
      })
      // that.axios({
      //   method: 'post',
      //   headers:{'Content-Type':'application/x-www-form-urlencoded'},
      //   url:'http://49.233.2.47:9000/drumpHTTP_QT.aspx',
      //   data
      // }).then(res =>{
      //   if(res.data.count == 0){
          
      //   }else{
      //     that.basyzk_list = res.data.data;
      //   return;
      //   }
      // })
    },
    // ====================   现病史---- 添加症状功能 -- 以下 --  ====================
    // 点击 现病史 添加症状-1
    addSymptom_2() {
      let that = this;
      that.addSymptomPop_2 = true;
    },
    // 点击 现病史 添加症状弹窗内，确定按钮
    addSymptomPopSureClick_2() {
      this.addSymptomPop_2 = false;
    },
    // 点击 现病史 添加症状弹窗内，清除按钮
    addSymptomPopEmptyClick_2() {
      let that = this;
      let optionsList_2 = this.optionsList_2;
      optionsList_2.forEach((el) => {
        if (el.select_options.length > 0) {
          el.select_options.forEach((el_options) => {
            el_options.select_chect = "";
          });
        }
      });
      that.symptomSearch_name_2 = [];
      that.checkList_2 = []; // 多选框 选中项label
      that.searchSymptomsList_2 = []; // 列表下拉框选中数据
      that.optionsList_2 = optionsList_2;
    },
    // 点击下拉选项
    searchSymptomsChange_2(e) {
      let searchSymptomsList_2 = this.searchSymptomsList_2;
       searchSymptomsList_2.push(e);
      this.searchSymptomsList_2 = searchSymptomsList_2;

      // let optionsList_2 = this.optionsList_2;
      // optionsList_2.forEach((el) => {
      //   if (el.select_options.length > 0) {
      //     el.select_options.forEach((el_options) => {
      //       if (el_options.select_chect) {
      //         searchSymptomsList_2.push(el_options.select_chect);
      //       }
      //     });
      //   }
      // });
    },
    // 列表多选选项
    checkGroup_2(e) {
      let that = this;
      let checkGroupList_2 = e;
      let checkList_2 = that.checkList_2;
      if (checkGroupList_2.length > 5) {
        alert("最多选择5项！");
        checkList_2.pop();
        that.checkList_2 = checkList_2;
        console.log(that.checkList_2);
      } else {
        console.log(that.checkList_2);
      }
      console.log(that.checkList_2);
    },
    // 搜索其他症状@input事件
    getInputBtn_2() {
      let that = this;
      if (that.inputOtherValue_2 == "") {
        that.$message.error({
          message: "请填写内容",
        });
        return;
      }
      that.symptomSearch_data_2 = "";
      that.is_symptomSearch_2 = false;
      getchoosesymptomBtn({
        keyword: that.inputOtherValue_2,
      })
        .then((res) => {
          if (res.data.code == 0) {
            let symptomSearch_data_2 = res.data.data;
            that.symptomSearch_data_2 = symptomSearch_data_2;
            that.is_symptomSearch_2 = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getInputBtn_add2(){
      let that = this;
      let symptomSearch_name_2 =that.symptomSearch_name_2;
      let inputOtherValue_2 = that.inputOtherValue_2;
      if (that.inputOtherValue_2 == "") {
        that.$message.error({
          message: "请填写内容",
        });
        return;
      }
      symptomSearch_name_2.push(inputOtherValue_2);
      that.inputOtherValue_2 = '';
       that.symptomSearch_name_2 = symptomSearch_name_2;
    },
    // 点击其他症状列表项
    symptomSearchClick_2(n) {
      let symptomSearch_name_2 =this.symptomSearch_name_2;
      symptomSearch_name_2.push(n);
      this.symptomSearch_name_2 = symptomSearch_name_2;
      this.inputOtherValue_2 = '';

    },
    // ====================   现病史---- 添加症状功能 -- 以上--   ====================

    // 点击主诉添加症状弹窗内，确定按钮
    addSymptomPopSureClick() {
      this.addSymptomPop_1 = false;
    },
    // 点击主诉添加症状弹窗内，清除按钮
    addSymptomPopEmptyClick() {
      let that = this;
      let optionsList = this.optionsList;
      optionsList.forEach((el) => {
        if (el.select_options.length > 0) {
          el.select_options.forEach((el_options) => {
            el_options.select_chect = "";
          });
        }
      });
      that.symptomSearch_name = []; // 搜索框添加的数据
      that.checkList = []; // 多选框 选中项label
      that.searchSymptomsList = []; // 列表下拉框选中数据
      that.optionsList = optionsList;
    },
    // 点击各项弹窗内，内容
    SelectLiClick(num, n, i, idx, idx1) {
      let number = num;
      let name = n;
      let id = i;
      let index = idx;
      let idx_1 = idx1;
      let infoData = this.infoData;
      infoData[index].many_select_options[idx_1].obtain_name = infoData[index].many_select_options[idx_1].obtain_name + name;
      infoData[index].total_obtain_name = "";
      infoData.forEach((ele) => {
        ele.total_obtain_name = "";
        ele.many_select_options.forEach((ele_m) => {
          ele.total_obtain_name += ele_m.obtain_name;
        });
      });
      this.infoData = infoData;
      console.log(infoData[index].total_obtain_name);
      // infoData[index].total_obtain_name = infoData[index].total_obtain_name + infoData[index].many_select_options[idx_1].obtain_name;
    },
    // 点击各项弹窗内 清除按钮
    emptyLiClick(idx, idx1) {
      let index = idx;
      let idx_1 = idx1;
      let infoData = this.infoData;
      infoData[index].many_select_options[idx_1].obtain_name = "";
      infoData[index].total_obtain_name = "";
    },
    // cdss(icss)主页面展示信息数据
    getManySelect() {
      let that = this;
      getManySelect({}).then((res) => {
        if (res.data.code == 0) {
          let infoData = res.data.data;
          infoData.forEach((ele) => {
            ele.total_obtain_name = "";
            ele.many_select_options.forEach((ele_m) => {
               ele_m.obtain_name = "";
            });
          });
          //  -------------------- 设置页面初始默认数据 ----------------------------------------
            //  主诉
          infoData[0].many_select_options[0].obtain_name = '反复';
          infoData[0].many_select_options[1].obtain_name = '3天';
            //  现病史
          infoData[1].many_select_options[0].obtain_name = '患者3天前';
          infoData[1].many_select_options[1].obtain_name = '受凉后';
          infoData[1].many_select_options[2].obtain_name = '程度较轻';
          infoData[1].many_select_options[3].obtain_name = '自病以来神清';
          infoData[1].many_select_options[4].obtain_name = '精神可';
          infoData[1].many_select_options[5].obtain_name = '食欲较好';
          infoData[1].many_select_options[6].obtain_name = '睡眠可';
          infoData[1].many_select_options[7].obtain_name = '二便无殊';
          infoData[1].many_select_options[8].obtain_name = '体重无明显减轻';
            //  其他史
          infoData[2].many_select_options[0].obtain_name = '否认食物及药物过敏';
          infoData[2].many_select_options[1].obtain_name = '无烟酒嗜好';
          infoData[2].many_select_options[2].obtain_name = '已婚';
          infoData[2].many_select_options[3].obtain_name = '父母兄弟姐妹均体健';
             //  查体
          infoData[3].many_select_options[0].obtain_name = '神志清';
          infoData[3].many_select_options[1].obtain_name = '面容正常';
          infoData[3].many_select_options[2].obtain_name = '鼻粘膜充血';
          infoData.forEach((ele) => {
            ele.total_obtain_name = "";
            ele.many_select_options.forEach((ele_m) => {
              ele.total_obtain_name += ele_m.obtain_name;
            });
          });
          //  -------------------- 设置页面初始默认数据 ----------------------------------------
          
          that.infoData = infoData;
          // 设置页面初始 调取数据
          that.finish_btn();
        }
      })
      .catch((e) => {
        console.log(e);
      });
    },
    // 点击右侧模块头部分页
    handleClick(tab) {
      this.activeName = tab.name;
    },
    // 点击主页各项数据标题显示弹窗内确定按钮
    sureLiClick(i) {
      let that = this;
      let id = i;
      that.pop1 = false;
    },
    // 点击主页各项数据标题显示弹窗
    item_many_selectClick(i, c) {
      let that = this;
      let id = i;
      let category = c;
      that.popId = id;
      that.pop1 = true;
    },

    // 点击主诉添加症状-1
    addSymptom_1(i) {
      let that = this;
      that.addSymptomPop_1 = true;
      that.is_SymptomPop_index  = i;
    },
    // 点击下来选项
    searchSymptomsChange(e) {
      let searchSymptomsList = this.searchSymptomsList;
      searchSymptomsList.push(e);
      this.searchSymptomsList = searchSymptomsList;
      // let optionsList = this.optionsList;
      // optionsList.forEach((el) => {
      //   if (el.select_options.length > 0) {
      //     el.select_options.forEach((el_options) => {
      //       if (el_options.select_chect) {
      //         searchSymptomsList.push(el_options.select_chect);
      //       }
      //     });
      //   }
      // });
    },
    // 点击西医问诊 保存按钮
    finish_btn() {
      let that = this;
      let checkList = that.checkList; //添加症状内 多选数据
      let searchSymptomsList = that.searchSymptomsList; // 添加症状内 下拉数据
      let symptomSearch_name = that.symptomSearch_name; //  搜索数据
      let infoData = that.infoData;

      // ====================  主述 添加症状数据处理 以下 ===================
      let symptoms = "";
      if (searchSymptomsList.length > 0) {
        if (checkList.length > 0) {
          symptoms = searchSymptomsList.join(",") + "," + checkList.join(",");
        } else {
          symptoms = searchSymptomsList.join(",");
        }
      } else {
        symptoms = checkList.join(",");
      }
      if (symptomSearch_name.length > 0) {
        symptoms = symptoms + "," + symptomSearch_name.join(",");
      }
      that.symptoms = symptoms;
      // ====================  主述 添加症状数据处理 以上 ===================

      let advisory_content = [];
      infoData.forEach((ele) => {
        if (ele.category == "主诉") {
          advisory_content.push({
            title: ele.category,
            text: symptoms + "," + ele.total_obtain_name,
          });
        } else if (ele.category == "现病史") {
          advisory_content.push({
            title: ele.category,
            text: symptoms + "," + ele.total_obtain_name,
          });
        } else {
          advisory_content.push({
            title: ele.category,
            text: ele.total_obtain_name,
          });
        }
      });

      let pearms = {
        name: that.form.name,
        age: that.form.age,
        sex: that.form.sex == "男" ? 1 : 2,
        advisory_content,
        symptoms,
      };


      if (pearms.name == "" || pearms.age == "" || pearms.sex == "") {
        that.$message.error({
          message: "请先填写个人信息！",
        });
        return;
      }
      let Services_Params = {
        "xm": pearms.name,
        "xb": pearms.sex,
        "nl": pearms.age,
        "csrq": that.form.csrq,
        "sfzh": that.form.sfzh,
        "bzyzsnl": that.form.bzyzsnl,
        "xsecstz": that.form.xsecstz,
        "xserytz": that.form.xserytz,
      }
      // 第三方检验接口
      that.DrumpServices_ZK(Services_Params);


      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        target: document.querySelector("body"),
      });
      clickFinishBtn(pearms).then((res) => {
          loading.close();
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
    // 点击西医问诊 预览按钮
    getUserAdvisory() {
      let that = this;
      let id = that.dataInfo_id;
      if (!id || id == 0) {
        that.$message.error({
          message: "请先点击保存后预览！",
        });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
        target: document.querySelector("body"),
      });
      getUserAdvisory({ id })
        .then((res) => {
          loading.close();
          if (res.data.code == 0) {
            that.getUserAdvisory_list = res.data.data.advisory_content; //疾病列表
            that.is_useradvisory = true;
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
    // 列表多选选项
    checkGroup(e) {
      let that = this;
      let checkGroupList = e;
      let checkList = that.checkList;
      if (checkGroupList.length > 5) {
        alert("最多选择5项！");
        checkList.pop();
        that.checkList = checkList;
        console.log(that.checkList);
      } else {
        console.log(that.checkList);
      }
      console.log(that.checkList);
    },
    // 搜索其他症状@input事件
    getInputBtn() {
      let that = this;
      if (that.inputOtherValue == "") {
        that.$message.error({
          message: "请填写内容",
        });
        return;
      }
      that.symptomSearch_data = "";
      that.is_symptomSearch = false;
      getchoosesymptomBtn({
        keyword: that.inputOtherValue,
      })
        .then((res) => {
          if (res.data.code == 0) {
            let symptomSearch_data = res.data.data;
            if (symptomSearch_data.length <= 0) {
              return;
            } else {
              that.symptomSearch_data = symptomSearch_data;
              that.is_symptomSearch = true;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 点击添加症状内 添加按钮
    getInputBtn_add(){
      let that = this;
      let symptomSearch_name = that.symptomSearch_name;
      let inputOtherValue = that.inputOtherValue;
      if (that.inputOtherValue == "") {
        that.$message.error({
          message: "请填写内容",
        });
        return;
      }
      symptomSearch_name.push(inputOtherValue);
      that.symptomSearch_name = symptomSearch_name;
      that.inputOtherValue = '';
    },
    // 点击其他症状列表项
    symptomSearchClick(n) {
      let symptomSearch_name = this.symptomSearch_name;
      symptomSearch_name.push(n);
      this.symptomSearch_name = symptomSearch_name;
      that.inputOtherValue = '';

    },

    // ================================================================

    // 点击疑似病例
    clickYsbl(n, i) {
      let that = this;
      // this.cdssMedication = '';
      // this.cdssInspection = '';
      that.click_ysbl(n, i);
    },
    // 点击疑似病例---  查看图谱
    clickCktp(n, i){
      let that = this;
      that.click_ysbl(n, i, that.d3jsonParser);
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
      })
      .catch((e) => {
        console.log(e);
      });
    },

    // 获取图谱数据
    d3jsonParser(data) {
      let that = this;
      let _name = that.hot_name;
      that.is_initial = 2;
      const labels = [];
      const linkTypes = [""];
      const nodes = []; // 存放节点
      const links = []; // 存放关系
      const nodeSet = []; // 存放去重后nodes的id
      // 重新更改data格式
      for (let segment of data) {
        if (nodeSet.indexOf(segment.start.identity) == -1) {
          nodeSet.push(segment.start.identity);
          let is_show = "";
          if (_name == segment.start.properties.name.text) {
            is_show = "2";
          } else {
            is_show = "1";
          }
          nodes.push({
            id: segment.start.identity,
            label: segment.start.labels[1],
            tag: segment.start.tag,
            properties: segment.start.properties,
            is_show: is_show,
          });
        }
        if (nodeSet.indexOf(segment.end.identity) == -1) {
          nodeSet.push(segment.end.identity);
          let is_show = "";
          if (_name == segment.end.properties.name.text) {
            is_show = "2";
          } else {
            is_show = "1";
          }
          nodes.push({
            id: segment.end.identity,
            label: segment.end.labels[1],
            tag: segment.end.tag,
            properties: segment.end.properties,
            is_show: is_show,
          });
        }
        links.push({
          source: segment.relationship.start,
          target: segment.relationship.end,
          type: segment.relationship.type,
          properties: segment.relationship.properties,
        });
        if (labels.indexOf(segment.end.labels[1]) == -1) {
          labels.push(segment.end.labels[1]);
        }
        if (linkTypes.indexOf(segment.relationship.type) == -1) {
          linkTypes.push(segment.relationship.type);
        }

        for (let key in segment.end.properties) {
          if (
            segment.end.properties[key].text != "" &&
            segment.end.properties[key].name != "作者"
          ) {
            if (nodeSet.indexOf(`${segment.end.identity}-${key}`) == -1) {
              nodeSet.push(`${segment.end.identity}-${key}`);
              let data_type = "";
              if (_name == segment.end.properties.name.text) {
                data_type = "no_show";
              } else {
                data_type = "is_show";
              }
              nodes.push({
                id: `${segment.end.identity}-${key}`,
                label: "Att",
                properties: {
                  name: segment.end.properties[key].text,
                },
                data_type,
              });
              links.push({
                source: segment.relationship.end,
                target: `${segment.end.identity}-${key}`,
                type: "att",
                properties: {
                  name: segment.end.properties[key].name,
                },
                data_type,
              });
            }
          }
        }
        if (labels.indexOf(segment.start.labels[1]) == -1) {
          labels.push(segment.start.labels[1]);
        }

        for (let key in segment.start.properties) {
          if (
            segment.start.properties[key].text != "" &&
            segment.start.properties[key].name != "作者" &&
            segment.start.properties[key].text != _name
          ) {
            if (nodeSet.indexOf(`${segment.start.identity}-${key}`) == -1) {
              nodeSet.push(`${segment.start.identity}-${key}`);
              let data_type = "";
              if (_name == segment.start.properties.name.text) {
                data_type = "no_show";
              } else {
                data_type = "is_show";
              }
              nodes.push({
                id: `${segment.start.identity}-${key}`,
                label: "Att",
                properties: {
                  name: segment.start.properties[key].text,
                },
                data_type,
              });
              links.push({
                source: segment.start.identity,
                target: `${segment.start.identity}-${key}`,
                type: "att",
                properties: {
                  name: segment.start.properties[key].name,
                },
                data_type,
              });
            }
          }
        }
      }
      labels.push("Att");
      linkTypes.push("att");
      that.linkTypes = linkTypes;
      that.labels = labels;
      that.data = { nodes, links };
      console.log(that.data.nodes);
    },
    // 点击疑似病例弹窗关闭按钮
    click_close() {
      this.is_casePop = false;
    },
    // 点击查看详情弹窗关闭按钮
    ypxqclick_close() {
      this.is_ypxq = false;
    },
    // 点击预览弹窗关闭按钮
    useradvisory_close() {
      this.is_useradvisory = false;
    },
    // 点击鉴别诊断查看详情
    click_identity(n){
      let that = this;
      let name = n;
      let getinfo_arr = [];
      getinfo_arr.push({
        is_list:0,
        name: '',
        text: name,
        tag: 'identity',
      });
      // that.name_1 = name.substring(0,15) + '...';
      that.getinfo = getinfo_arr;
      that.is_nofr = false;
      this.is_ypxq = true;
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
            let getinfo = res.data.data;
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
// ===================   西医知识 搜索事件 以下 ===========================

    // 西医知识全选按钮事件
    handleCheckAllChange(val) {
      let MedicineTagList = this.MedicineTagList;
      let newMedicineTagList = [];
      MedicineTagList.forEach((ele) => {
        newMedicineTagList.push(ele.tag);
      });
      this.checkMedicineTagList = val ? newMedicineTagList : [];
      this.isIndeterminate = false;
    },
    // 西医知识选项按钮事件
    checkMedicine(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.MedicineTagList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.MedicineTagList.length;
    },
    // 西医知识搜索事件
    getMedicineInputBtn() {
      let that = this;
      let checkMedicineTagList = that.checkMedicineTagList;
      let inputMedicineValue = that.inputMedicineValue;
      let pearms = {
        type:'',
        tag: checkMedicineTagList.join(","),
        keyword: inputMedicineValue,
      };
      if (pearms.keyword == "" || pearms.tag == "") {
        that.$message.error({
          message: "请先填写内容和选择选项！",
        });
        return;
      }
      getMedicineList(pearms).then((res) => {
          if (res.data.code == 0) {
            let list = res.data.data;
            let newList = [];
            for (let key in list) {
              newList.push({
                tag: key,
                tag_name: key == "MedicineProduction" ? "药品" : key == "Inspection" ? "检查" : key == "Identity" ? "诊断" : key == "Disease" ? "疾病" : "",
                list: list[key],
              });
            }
            that.MedicineIfoList = newList;
            console.log(that.MedicineIfoList);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 回车键点击
    searchEnterFun(e){
      var keyCode = window.event?e.keyCode:e.which;
      if(keyCode == 13){
        this.getMedicineInputBtn();
      }
    },
// ===================   西医知识 搜索事件 以上 ===========================

// ===================   中医知识 搜索事件 以下 ===========================

    // 中医知识全选按钮事件
    handleCnCheckAllChange(val) {
      let cnMedicineTagList = this.cnMedicineTagList;
      let newMedicineTagList = [];
      cnMedicineTagList.forEach((ele) => {
        newMedicineTagList.push(ele.tag);
      });
      this.checkCnMedicineTagList = val ? newMedicineTagList : [];
      this.cnMedicine_isIndeterminate = false;
    },
    // 中医知识选项按钮事件
    checkCnMedicine(value) {
      let checkedCount = value.length;
      this.cnMedicine_checkAll = checkedCount === this.cnMedicineTagList.length;
      this.cnMedicine_isIndeterminate = checkedCount > 0 && checkedCount < this.cnMedicineTagList.length;
    },
    // 中医知识搜索事件
    getCnMedicineInputBtn() {
      let that = this;
      let checkCnMedicineTagList = that.checkCnMedicineTagList;
      let inputcnMedicineValue = that.inputcnMedicineValue;
      let pearms = {
        type:'zh',
        tag: checkCnMedicineTagList.join(","),
        keyword: inputcnMedicineValue,
      };
      if (pearms.keyword == "" || pearms.tag == "") {
        that.$message.error({
          message: "请先填写内容和选择选项！",
        });
        return;
      }
      getMedicineList(pearms).then((res) => {
          if (res.data.code == 0) {
            let list = res.data.data;
            let newList = [];
            for (let key in list) {
              newList.push({
                tag: key,
                tag_name: key == "Constitution" ? "体质" : key == "Acupoint" ? "穴位" :
                  key == "ChannelCollateral" ? "经络" : key == "TonicDiet" ? "药膳" :
                  key == "Prescription" ? "方剂" : key == "CnPatentMedicine" ? "中成药" :
                  key == "CnMedicinalCrop" ? "中药" :key == "zySickNess" ? "疾病" :"",
                list: list[key],
              });
            }
            that.cnMedicineIfoList = newList;
            console.log(that.cnMedicineIfoList)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 回车键点击
    CnMedicinesearchEnterFun(e){
      var keyCode = window.event?e.keyCode:e.which;
      if(keyCode == 13){
        this.getCnMedicineInputBtn();
      }
    },
// ===================   中医知识 搜索事件 以上 ===========================



  },
};
</script>
