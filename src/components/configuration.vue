<template>
  <div class="config" v-show="activeNo === noo">
    <el-form class="size">
      <el-form-item label="高度：">
        <el-col :span="8">
          <el-input v-model="height"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="宽度：">
        <el-col :span="8">
          <el-input v-model="width"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="标题：">
        <el-col :span="12">
          <el-input v-model="title"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "config",
  data() {
    return {
      activeNo: this.no, //记录当前激活的图表序号
      height: 300,
      width: 300,
      title: "",
      noo: -1,
    };
  },
  props: {
    size: Number,
    no: Number,
    n: Number, //本配置项的编号
  },

  created() {
    this.$watch(
      "size",
      function (newValue, oldValue) {
        console.log("sizzzzzchange");
        if (this.noo === this.activeNo) {
          this.height = this.size.h;
          this.width = this.size.w;
        }
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "height",
      function (newValue, oldValue) {
        this.$emit("sendHeight", newValue);
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "width",
      function (newValue, oldValue) {
        this.$emit("sendWidth", newValue);
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "title",
      function (newValue, oldValue) {
        this.$emit("sendTitle", newValue);
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "n",
      function (newValue, oldValue) {
        console.log(this.activeNo, newValue);
        if (this.noo == -1) {
          this.noo = newValue;
        }
      },
      { deep: true, immediate: true }
    );
    this.$watch(
      "no",
      function (newValue, oldValue) {
        this.activeNo = this.no - 1;
      },
      { deep: true, immediate: true }
    );
  },
};
</script>

<style>
.config {
  margin-left: 10px;
}
</style>
