
<template>
  <div class="yearPicker" ref="yearPicker">
    <input
      class="_inner"
      ref="inputLeft"
      v-model="startShowYear"
      @focus="onFocus"
      @blur="onBlur"
      type="text"
      name="yearInput"
      @keyup="checkStartInput($event)"
      placeholder="选择年份"
    />
    <span>{{ sp }}</span>
    <input
      class="_inner"
      ref="inputRight"
      v-model="endShowYear"
      @focus="onFocus"
      @blur="onBlur"
      type="text"
      name="yearInput"
      @keyup="checkEndInput($event)"
      placeholder="选择年份"
    />
    <!-- <i class="dateIcon el-icon-date"></i> 按照自己标准库里面的图标设置-->
    <span class="_inner labelText">{{ labelText }}</span>
    <div class="_inner floatPanel" v-if="showPanel">
      <div class="_inner leftPanel">
        <div class="_inner panelHead">
          <i class="_inner el-icon-d-arrow-left" @click="onClickLeft"></i>
          {{ leftYearList[0] + "-" + leftYearList[9] }}
        </div>
        <div class="_inner panelContent">
          <div :class="{
              oneSelected: item === startYear && oneSelected,
              startSelected: item === startYear,
              endSelected: item === endYear,
              betweenSelected: item > startYear && item < endYear,}"
            v-for="item in leftYearList"
            :key="item">
            <a :class="{ cell: true,_inner: true,selected: item === startYear || item === endYear,}" @click="onClickItem(item)" @mouseover="onHoverItem(item)">
              {{ item }}
            </a>
          </div>
        </div>
      </div>
      <div class="_inner rightPanel">
        <div class="_inner panelHead">
          <i class="_inner el-icon-d-arrow-right" @click="onClickRight"></i>
          {{ rightYearList[0] + "-" + rightYearList[9] }}
        </div>
        <div class="_inner panelContent">
          <div :class="{ startSelected: item === startYear,endSelected: item === endYear, betweenSelected: item > startYear && item < endYear,}"
            v-for="item in rightYearList" :key="item">
            <a :class="{ cell: true,_inner: true,selected: item === endYear || item === startYear,}" @click="onClickItem(item)"
              @mouseover="onHoverItem(item)">
              {{ item }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import moment from "moment";
const SELECT_STATE = {
  unselect: 0,
  selecting: 1,
  selected: 2,
};
export default {
  name: "yearPicker",
  computed: {
    oneSelected() {
      return (
        this.curState === SELECT_STATE.selecting &&
        (this.startYear === this.endYear || this.endYear == null)
      );
    },
    startDate() {
      return this.startYear;
    },
    leftYearList() {
      return this.yearList.slice(0, 10);
    },
    rightYearList() {
      return this.yearList.slice(10, 20);
    },
    startYearFormat() {
      if (this._.isNil(this.startYear)) {
        return null;
      }
      return moment(this.startYear).startOf("year").format("yyyy");
    },
    endYearFormat() {
      if (this._.isNil(this.endYear)) {
        return null;
      }
      return moment(this.endYear).endOf("year").format("yyyy");
    },
  },
  props: {
    labelWidth: {
      default: 80,
    },
    labelText: {
      default: "时间标签",
    },
    sp: {
      default: "至",
    },
    initYear: {
      default: null,
    },
  },
  data() {
    return {
      itemBg: {},
      startShowYear: null,
      endShowYear: null,
      yearList: [],
      showPanel: false,
      startYear: null,
      endYear: null,
      curYear: 0,
      curSelectedYear: 0,
      curState: SELECT_STATE.unselect,
    };
  },
  methods: {
    checkStartInput(event) {
      if (isNaN(this.startShowYear)) {
        this.startShowYear = this.startYear;
      } else {
        this.startYear = this.startShowYear * 1;
        this.changeYear();
      }
    },
 
    checkEndInput() {
      if (isNaN(this.endShowYear)) {
        this.endShowYear = this.endYear;
      } else {
        this.endYear = this.endShowYear * 1;
        this.changeYear();
      }
    },
    changeYear() {
      if (this.startYear > this.endYear) {
        let tmp = this.endYear;
        this.endYear = this.startYear;
        this.startYear = tmp;
        this.startShowYear = this.startYear;
        this.endShowYear = this.endYear;
      }
      this.$emit("updateTimeRange", {
          startYear: this.startShowYear,
          endYear: this.endShowYear,
        });
      // if (this.startYear && this.endYear) {
      //    this.$emit("updateTimeRange", {
      //     startYear: this.startShowYear,
      //     endYear: this.endShowYear,
      //   });
      // } else {
      //   console.warn("WARN:年份不合法", this.startYear, this.endYear);
      // }
    },
    onHoverItem(iYear) {
      if (this.curState === SELECT_STATE.selecting) {
        let tmpStart = this.curSelectedYear;
        this.endYear = Math.max(tmpStart, iYear);
        this.startYear = Math.min(tmpStart, iYear);
      }
    },
    onClickItem(iYear) {
      if (
        this.curState === SELECT_STATE.unselect ||
        this.curState === SELECT_STATE.selected
      ) {
        this.startYear = iYear;
        this.curSelectedYear = iYear;
        this.endYear = null;
        this.curState = SELECT_STATE.selecting;
      } else if (this.curState === SELECT_STATE.selecting) {
        this.endShowYear = this.endYear;
        this.startShowYear = this.startYear;
        this.curState = SELECT_STATE.selected;
        // this.$emit("updateTimeRange", {
        //   startYear: moment(this.startYear + "")
        //     .startOf("year")
        //     .valueOf(),
        //   endYear:
        //     moment(this.endYear + "")
        //       .endOf("year")
        //       .valueOf() + 1,
        // });
        this.$emit("updateTimeRange", {
          startYear: this.startShowYear,
          endYear: this.endShowYear,
        });
        setTimeout(() => {
          //为动画留的时间，可优化
          this.showPanel = false;
        }, 300);
      }
    },
    onFocus() {
      this.$nextTick(() => {
        this.showPanel = true;
      });
    },
    onBlur() {
      //   this.showPanel = false;
    },
    updateYearList() {
      let iStart = Math.floor(this.curYear / 10) * 10 - 10;
      iStart = iStart < 0 ? 0 : iStart;
      this.yearList = [];
      for (let index = 0; index < 20; index++) {
        this.yearList.push(iStart + index);
      }
    },
    closePanel(e) {
      if (!this.showPanel) {
        return;
      }
      if (typeof e.target.className !== "string") {
        this.$nextTick(() => {
          this.showPanel = false;
        });
        return;
      }
      if (
        e.target.className.indexOf("_inner") === -1 ||
        (e.target.name === "yearInput" &&
          e.target !== this.$refs.inputLeft &&
          e.target !== this.$refs.inputRight)
      ) {
        this.$nextTick(() => {
          this.showPanel = false;
        });
      }
 
      e.stopPropagation();
      return false;
    },
    onClickLeft() {
      this.curYear = this.curYear * 1 - 10;
      this.updateYearList();
    },
    onClickRight() {
      this.curYear = this.curYear * 1 + 10;
      this.updateYearList();
    },
 
    //------------------对外接口------------------------
    //直接传时间戳
    setYear(startYearStamp, endYearStamp) {
      if (!isNaN(startYearStamp) && !isNaN(endYearStamp)) {
        let startYear = moment(startYearStamp).format("yyyy");
        let endYear = moment(endYearStamp).format("yyyy");
        this.startYear = startYear * 1;
        this.endYear = endYear * 1;
        this.endShowYear = endYear * 1;
        this.startShowYear = startYear * 1;
      }
    },
  },
 
  created() {
    this.curYear = moment().format("yyyy");  // 获取当前年份
    this.updateYearList();
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closePanel.bind(this));
  },
 
  mounted() {
    // this.$refs.yearPicker.style = "padding-left:" + this.labelWidth/20 + "rem";
    document.addEventListener("click", this.closePanel.bind(this));
  },
};
</script>
<style lang="scss" scoped>
.yearPicker {
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  position: relative;
  transition: all 0.3s;
  // input:first-child {
  //   text-align: right;
  // }
  .labelText {
    position: absolute;
    left: 0.4rem;
  }
  background-color: #fff;
  span {
    padding: 0 0.4rem;
    height: 32px;
    line-height: 32px;
  }
  border: 1px solid #eff1f3;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  padding: 0 1.4rem 0 0.4rem;
  box-sizing: border-box;
  .floatPanel {
    > div {
      width: 50%;
    }
    padding: 0 0.8rem;
    position: absolute;
    display: flex;
    background-color: #fff;
    z-index: 2000;
    border-radius: 4px;
    width: 32.5rem;
    height: 12.5rem;
    top: 3rem;
    right: -50%;
    box-shadow: 0 2px 10px 0 #cfcfcf20;
    .panelContent {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      height: calc(100% - 3.5rem);
      .oneSelected {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      .startSelected {
        background-color: #f6f6f7;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      .endSelected {
        background-color: #f6f6f7;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      .betweenSelected {
        background-color: #f6f6f7;
      }
      > div {
        width: 3.75rem;
        height: 32px;
        line-height: 32px;
        margin: 0.15rem 0;
        // border-radius: 24px;
        text-align: center;
        a {
          display: inline-block;
          width: 3rem;
          height: 30px;
          cursor: pointer;
          line-height: 30px;
          border-radius: 4px;
        }
        .selected {
          background-color: #3664D9;
          color: #fff;
        }
      }
    }
    .panelHead {
      position: relative;
      height: 2.3rem;
      line-height: 2.3rem;
      text-align: center;
      i {
        position: absolute;
        cursor: pointer;
        top: 50%;
        transform: translateY(-50%);
        &:hover {
          color: #3664D9;
        }
      }
    }
    .rightPanel {
      padding-left: 0.4rem;
    }
    .leftPanel .panelHead i {
      left: 1rem;
    }
    .rightPanel .panelHead i {
      right: 1rem;
    }
  }
  .floatPanel::before {
    content: "";
    height: 100%;
    position: absolute;
    left: 50%;
    width: 1px;
    border-left: 1px solid #e4e4e4;
  }
}
input {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    border: none;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    background-color: transparent;

}
input:focus {
  outline: none;
  background-color: transparent;
}
.yearPicker:hover {
  border-color: #3664D9;
}
.dateIcon {
  position: absolute;
  right: 0.8rem;
  top: 0.45rem;
  color: #adb2bc;
}
</style>
