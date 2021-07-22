<template>
  <!--<div class="pic" @mousedown="move"> 
     </div>
    <img src="../assets/logo.png" @mousedown="move"> -->

  <div class="imgbox">
    <DraggableContainer :adsorbParent="true" class="ddd">
      <Vue3DraggableResizable
        class="ccc"
        :initW="300"
        :initH="300"
        v-model:x="x"
        v-model:y="y"
        v-model:w="size_hw.w"
        v-model:h="size_hw.h"
        v-model:active="active"
        :draggable="true"
        :resizable="true"
        :on-remove="handleRemove"
        :referenceLineVisible="true"
        :grid="[20, 20]"
        :common-class-name="commonClassName"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @drag-start="print('drag-start')"
        @resize-start="print('resize-start')"
        @dragging="ondrag"
        @drag-end="dragend"
        @resizing="resizing"
        @resize-end="setHeight"
      >
        <!--<img :src="imgSrc[index].src" :resizable="true"> -->
        <div
          class="echart"
          :id="generateID()"
          style="width: 300px; height: 300px"
          :resizable="true"
          :visiable="true"
        ></div>
        <i v-show="active" class="close el-icon-error" @click="remove()"></i>
      </Vue3DraggableResizable>
    </DraggableContainer>
  </div>
</template>

<script>
import $ from "jquery";
//import Vue3DraggableResizable from "vue3-draggable-resizable";
//import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
// import { DraggableContainer } from "vue3-draggable-resizable";
//import Vue3DraggableResizable from './vue3-draggable-resizable/Vue3DraggableResizable'
export default {
  el: "#pic",
  name: "chartgenerate",
  components: {
    //Vue3DraggableResizable,
    // DraggableContainer,
  },
  data() {
    return {
      positionX: 0,
      positionY: 0,
      x: this.data.x - 450,
      y: this.data.y,
      index: this.data.type,
      no: this.data.no,
      Cnum: this.data.num,
      h: 300, //高度
      w: 300, //宽度
      radius: 50,
      title: this.title_c,
      size_hw: {
        h: 300,
        w: 300,
      },
      active: false,
      imgSrc: [
        { src: require("../assets/sandiantu.png") },
        { src: require("../assets/bingtu.png") },
        { src: require("../assets/zhexiantu.png") },
        { src: require("../assets/zhuxingtu.png") },
      ],
    };
  },
  props: {
    data: Number,
    size: Number,
    num: Number,
    title_c: String,
  },
  methods: {
    print(val) {
      console.log(val);
    },
    setHeight() {
      this.h = this.size_hw.h;
      this.w = this.size_hw.w;
    },
    remove() {
      this.$emit("remove", this.no - 1);
    },
    ondrag(e) {
      console.log(e.x);
      if (e.x <= 0) {
        console.log("out");
        this.x = 0;
        this.positionX = 0;
        this.positionY = e.y;
        //this.positionY = e.y;
      } else {
        this.positionX = e.x;
        this.positionY = e.y;
      }
    },
    dragend(e) {
      console.log("end");
      console.log(e);
    },
    resizing(e) {
      let id = "#" + this.generateID();
      console.log(id, this.size_hw.h);
      let timeh = e.h / this.h;
      let timew = e.w / this.w;
      console.log(this.h);
      //$(id).css("height", "10px");
      $(id).css("transform", "scale(" + timew + "," + timeh + ")");
    },
    drawBar() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById(this.generateID())
      );
      // 绘制图表
      myChart.resize();
      myChart.setOption({
        title: { text: this.title },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},

        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    drawPie() {
      let myChart = this.$echarts.init(
        document.getElementById(this.generateID())
      );
      //console.log("drawLine:",document.getElementById('chart'))
      // 绘制图表
      myChart.setOption({
        title: { text: this.title },
        series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: this.radius + "%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" },
            ],
          },
        ],
      });
    },
    drawLine() {
      let myChart = this.$echarts.init(
        document.getElementById(this.generateID())
      );
      myChart.setOption({
        title: { text: this.title },
        tooltip: {},
        xAxis: {
          name: "日期",
          nameLocation: "end",
          nameTextStyle: {
            padding: -12,
          },
          tooltip: {
            trigger: "axis",
          },
          data: ["1", "2", "3", "4", "5"],
          type: "category",
          boundaryGap: false,
        },
        color: ["#dcb7fe"],
        yAxis: {
          type: "value",
          name: "分数",
          nameLocation: "end",
          nameTextStyle: {
            padding: -8,
          },
        },
        series: [
          {
            data: [54, 86, 36, 45, 75],
            type: "line",
          },
        ],
      });
    },
    drawDot() {
      let myChart = this.$echarts.init(
        document.getElementById(this.generateID())
      );
      myChart.setOption({
        title: { text: this.title },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            saveAsImage: {},
          },
        },
        color: ["#2f4554", "#61a0a8", "#d48265"],
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          scale: true,
          name: "X轴名称",
          nameLocation: "end",
        },
        yAxis: {
          scale: true,
          name: "Y轴名称",
          nameLocation: "end",
        },
        series: [
          {
            type: "scatter",
            data: [
              [1, 2],
              [1.3, 2.5],
              [1.8, 2.8],
              [2.2, 3.2],
              [3, 4],
              [3.5, 4.5],
              [4.5, 5.5],
              [5, 6],
            ],
            markLine: {
              data: [
                {
                  name: "1.3",
                  yAxis: 1.3,
                },
              ],
            },
          },
        ],
      });
    },
    generateID() {
      return "chart" + this.no;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.index === 3) this.drawBar();
      else if (this.index === 1) this.drawPie();
      else if (this.index === 2) this.drawLine();
      else this.drawDot();
    });
  },
  created() {
    this.$watch(
      "size_hw",
      function (newValue, oldValue) {
        this.$emit("sendSize", newValue);
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "size",
      function (newValue, oldValue) { 
        if (this.active) {
          let id = "#" + this.generateID();
          let timeh = this.size.h / this.h;
          let timew = this.size.w / this.w;
          $(id).css("transform", "scale(" + timew + "," + timeh + ")");
          this.size_hw.h = this.size.h;
          this.size_hw.w = this.size.w;
        }
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "title_c",
      function (newValue, oldValue) {
        console.log("1111111111newValue");
        if (newValue === "" && this.title != "") {
          if (this.index === 3) this.drawBar();
          else if (this.index === 1) this.drawPie();
          else if (this.index === 2) this.drawLine();
          else this.drawDot();
        }
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "num",
      function (newValue, oldValue) {
        if (this.active == true) {
          this.active = false;
        }
        if (this.no == this.num) {
          this.active = true;
        }
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "active",
      function (newValue, oldValue) {
        if (newValue === true) {
          //更换被选中组件
          this.$emit("sendIndex", this.no);
        }
      },
      { deep: true, immediate: true }
    );
  },
};
</script>

<style>
.imgbox {
  position: absolute;
  padding-bottom: 100%;
}
.imgbox img {
  width: 100%;
}
.echart {
  text-align: center;
}
.el-icon-error {
  font-size: 16px;
  position: absolute;
  top: -20px;
  right: -18px;
  z-index: 100;
  cursor: pointer;
}
</style>
