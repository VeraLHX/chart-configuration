<template>
  <!--<div class="pic" @mousedown="move"> 
     </div>
    <img src="../assets/logo.png" @mousedown="move"> -->
  <div
    class="imgbox"
    :adsorbParent="true"
    v-for="(item, index) in imgSrc"
    :key="index"
    :id="index"
  >
    <DraggableContainer>
      <Vue3DraggableResizable
        :initW="110"
        :initH="120"
        v-model:x="x[index]"
        v-model:y="y[index]"
        v-model:w="w"
        v-model:h="h"
        v-model:active="active"
        :draggable="true"
        :resizable="false"
        :is-conflict-check="true"
        :lockAspectRatio="true"
        :referenceLineVisible="true"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @drag-start="print('drag-start')"
        @dragging="ondrag"
        @drag-end="endPosition(e, index)"
      >
        <img :src="item.src" :resizable="false" />

        <h2 style="left: 30px" :draggable="false">我是{{ imgName[index] }}</h2>
      </Vue3DraggableResizable>
    </DraggableContainer>
    <div class="about" id="main"></div>
  </div>
</template>

<script>
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
import { DraggableContainer } from "vue3-draggable-resizable";
//import * as echarts from 'echarts'
export default {
  el: "#pic",
  name: "chartpic",
  components: {
    Vue3DraggableResizable,
    DraggableContainer,
  },
  data() {
    return {
      positionX: 0,
      positionY: 0,
      x: [50, 50, 50, 50],
      y: [50, 200, 350, 500],
      h: 100,
      w: 100,
      active: false,
      type: 1,
      imgSrc: [
        { src: require("../assets/sandiantu.png") },
        { src: require("../assets/bingtu.png") },
        { src: require("../assets/zhexiantu.png") },
        { src: require("../assets/zhuxingtu.png") },
      ],
      imgName: ["散点图", "饼图", "折线图", "条形图"],
    };
  },

  methods: {
    move(e) {
      let odiv = e.target; //获取目标元素
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => {
        //鼠标移动
        let left = e.clientX - disX; //鼠标位置减去鼠标相对于元素的位置
        let top = e.clientY - disY;

        this.positionX = top;
        this.positionY = left;

        //移动当前元素
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    print(val) {
      console.log(val);
    },
    endPosition(e, index) {
      var elem = document.getElementById(index);
      //e.preventDefault()
      //let target=e.target
      //console.log(target.getAttribute("data-index"))
      console.log(index);
      console.log(elem);
      var y_init = [50, 200, 350, 500];
      this.x[index] = 50;
      this.y[index] = y_init[index];
      elem.style.left = this.x[index];
      elem.style.top = this.y[index];

      //this.x=100
      //this.y=100
      //this.w=100
      //this.h=100
      console.log(this.x[index]);
      var value = {
        type: index,
        positionX: this.positionX,
        positionY: this.positionY,
      };
      if (this.positionX > 450) {
        this.$emit("sendValue", value);
      }
      this.positionY = 0;
      this.positionX = 0;
    },
    ondrag(e) {
      console.log(e);
      this.positionX = e.x;
      this.positionY = e.y;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
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
  },
  mounted() {
    this.drawLine();
  },
};
</script>

<style>
.pic {
  position: relative;
  top: 10px;
  left: 10px;
  width: 200px;
  height: 200px;
  background: #666;
}
.imgbox {
  padding-bottom: 100%;
}
.imgbox img {
  width: 100%;
}
h2 {
  color: #515151;
}
</style>
