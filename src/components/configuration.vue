<template>
  <div class="config">
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
      height: this.size.h,
      width: this.size.w,
      title: "",
    };
  },
  props: {
    size: Number,
  },

  created() {
    this.$watch(
      "size",
      function (newValue, oldValue) {
        this.height = this.size.h;
        this.width = this.size.w;
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
  },
};
</script>

<style>
.config {
  margin-left: 10px;
}
</style>
