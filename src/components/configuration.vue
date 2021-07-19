<template>
    <div class="config">
        高度：<el-input v-model="height" :span="6"></el-input> 
        宽度：<el-input v-model="width" :span="6"></el-input> 
    </div>
</template>

<script>
export default {
    name:"config",
    data(){
        return{
            height:this.size.h,
            width:this.size.w,

        }
    },
    props:{ 
        size:Number
    },

    created(){
        this.$watch("size",function(newValue,oldValue){ 
                this.height=this.size.h
                this.width=this.size.w
        },{deep:true,immediate: true})
        this.$watch("height",function(newValue,oldValue){ 
                this.$emit("sendHeight", newValue); 
        },{deep:true,immediate: true})
        this.$watch("width",function(newValue,oldValue){ 
                this.$emit("sendWidth", newValue); 
        },{deep:true,immediate: true})
    }
}
</script>

<style>
#config{
    display: inline-block;
}
</style>