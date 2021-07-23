<template>
  <div class="header">
    <h1>图标配置平台</h1>
  </div>
  <div class="divall">
    <div class="left">
      <h2>图表类型选择</h2>
      <chartpic @sendValue="getValue"></chartpic>
    </div>
    <div class="main" id="chart_placer">
      <chartgenerate
        @sendSize="getSize"
        :data="position"
        :size="size_hw"
        :title_c="title"
        :num="num"
        @remove="removeChart"
        @sendIndex="getIndex"
        v-for="(item, index) in chart"
        :key="index"
        v-show="chart[index].show"
      >
      </chartgenerate>
      <!--<div class="about" id="chart" style="width:500px; height:500px" ></div>-->
    </div>
    <div class="right">
      <h2>属性配置</h2>
      <div v-if="activeNo != 0">
        <config
          v-for="(item, index) in chart"
          :key="index"
          :size="size_hw"
          :no="activeNo"
          :n="index"
          @sendHeight="getHeight"
          @sendWidth="getWidth"
          @sendTitle="getTitle"
        ></config>
      </div>
    </div>
  </div>
  <div class="footer">
    <el-button id="print" :disabled="isAble" @click="printOut">导出</el-button>
  </div>
</template>

<script>
import chartpic from "../components/chartpicture.vue";
import chartgenerate from "../components/chartgenerate.vue";
import config from "../components/configuration.vue";
import html2canvas from "html2canvas";
export default {
  name: "Main",
  data() {
    return {
      type: -1,
      position: {
        x: 0,
        y: 0,
        type: -1,
        no: 0,
      },
      size_hw: {
        h: 300,
        w: 300,
      },
      positionX: 0,
      positionY: 0,
      chart: [],
      isAble: true,
      title: "",
      num: 0,
      activeNo: 0,
    };
  },
  components: {
    chartpic,
    chartgenerate,
    config,
  },
  methods: {
    addNode: function () {
      //console.log(this.positionX)
      //console.log(this.positionY)
      this.position.x = this.positionX;
      this.position.y = this.positionY;
      this.position.type = this.type;
      //console.log(typeof(this.position))
      this.chart.push({
        type: this.type,
        positionX: this.positionX,
        positionY: this.positionY,
        show: true,
      });
      //console.log(this.chart)
      this.position.no += 1;
      this.num += 1;
      this.isAble = false;
      //console.log("testactive",this.activeNo)
    },
    getValue(value) {
      console.log("from components:", value);
      this.type = value.type;
      this.positionX = value.positionX;
      this.positionY = value.positionY;
      this.addNode();
      this.type = 0;
    },
    getSize(size) {
      console.log("size:", size);
      this.size_hw.h = size.h;
      this.size_hw.w = size.w;
    },
    getHeight(h) {
      console.log("height changing");
      this.size_hw.h = h;
    },
    getWidth(w) {
      console.log("w:", w);
      this.size_hw.w = w;
    },
    getTitle(title) {
      this.title = "";
      for (var i = 0; i < title.length; i++) {
        this.title += title[i];
      }
      console.log(this.title);
    },
    getIndex(no) {
      this.activeNo = no;
    },
    removeChart(no) {
      this.chart[no].show = false; //设置为不显示
      this.num -= 1;
      if (this.num == 0) this.isAble = true;
    },
    dataURLToBlob(dataurl) {
      //ie 图片转格式
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },

    downloadResult(name) {
      let canvasID = document.getElementById("chart_placer");
      let a = document.createElement("a");
      html2canvas(canvasID).then((canvas) => {
        let dom = document.body.appendChild(canvas);
        dom.style.display = "none";
        a.style.display = "none";
        document.body.removeChild(dom);
        let blob = this.dataURLToBlob(dom.toDataURL("image/png"));
        a.setAttribute("href", URL.createObjectURL(blob));
        a.setAttribute("download", name + ".png");
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(blob);
        document.body.removeChild(a);
      });
    },

    printOut(name) {
      // 个人观察只是截取可见范围以及以下的区域，所以先将滚动条置顶
      $(window).scrollTop(0); // jQuery 的方法
      document.body.scrollTop = 0; // IE的
      document.documentElement.scrollTop = 0; // 其他
      this.downloadResult(name);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-size: 1em;
}

.header {
  /*头部 */
  width: 100%;
  height: 50px;
  background: #a9b7c0;
}

.divall {
  /*中间三列容器*/
  width: 100%;
  background: #fff;
  display: flex;
  position: absolute;
  top: 50px;
  bottom: 50px;
}

.footer {
  /*底部 */
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 50px;
  margin: 0 auto;
  background: #a9b7c0;
}

.main {
  /*中间 */
  flex: 1;
  background: #fff;
}

.left {
  /*左侧 */
  width: 450px;
  background: #efd9c1;
}

.right {
  /*右侧 */
  width: 450px;
  background: #c7d8c6;
}

#print {
  margin-top: 5px;
  margin-left: 76%;
}
</style>
