<template>
  <!--<div class="pic" @mousedown="move"> 
     </div>
    <img src="../assets/logo.png" @mousedown="move"> --> 
    <div class="imgbox" :adsorbParent="true">
      <DraggableContainer>
        <Vue3DraggableResizable  
            :initW="110"
            :initH="120" 
            v-model:x="x"
            v-model:y="y"
            v-model:w="size_hw.w"
            v-model:h="size_hw.h"
            v-model:active="active"
            :draggable="true"
            :resizable="true"  
            :on-remove="handleRemove"
            :referenceLineVisible="true"
            :grid=[20,20]
            @activated="print('activated')"
            @deactivated="print('deactivated')"
            @drag-start="print('drag-start')"
            @resize-start="print('resize-start')"
            @dragging="ondrag"
            @resizing="print('resizing')"
            
            @resize-end="print({h})"
        >
            <img :src="imgSrc[index].src" :resizable="true"> 
        </Vue3DraggableResizable> 
      </DraggableContainer>   
    </div>
</template>

<script>

//import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {DraggableContainer} from 'vue3-draggable-resizable'
import Vue3DraggableResizable from './vue3-draggable-resizable/Vue3DraggableResizable'
export default {
    el:'#pic',
    name:"chartgenerate",
    components:{
        Vue3DraggableResizable,
        DraggableContainer,
         
    }, 
    data(){
        return {
            positionX:0,
            positionY:0,
            x:this.data.x-450,
            y:this.data.y,
            index:this.data.type,
            h:100,    //高度
            w:100,    //宽度
            size_hw:{
                h:100,
                w:100
            },
            active:false,
            imgSrc:[ 
                {src:require('../assets/sandiantu.png')},
                {src:require('../assets/bingtu.png')},
                {src:require('../assets/zhexiantu.png')},
                {src:require('../assets/zhuxingtu.png')} 
            ]
        }
    },
    props:{
        data:Number,
        size:Number
    },
    methods:{
        print(val){
            console.log(val)
        },
        
        ondrag(e){  
            this.positionX=e.x;
            this.positionY=e.y;
        }
    },
    //watch:{
    //    h:function(){
    //        console.log(this.h)
    //    }
    //},
    created(){
        this.$watch("size_hw",function(newValue,oldValue){ 
                this.$emit("sendSize", newValue); 
        },{deep:true,immediate: true})
        this.$watch("size",function(newValue,oldValue){ 
            if(this.active){
                this.size_hw.h=this.size.h
                this.size_hw.w=this.size.w
            }
                
        },{deep:true,immediate: true})
    }
}
</script>

<style> 
.imgbox{  
    position: absolute;
    padding-bottom: 100%; 
}
.imgbox img{
    width:100%; 
}
</style>