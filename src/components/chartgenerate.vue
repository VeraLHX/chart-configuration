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
            v-model:w="w"
            v-model:h="h"
            v-model:active="active"
            :draggable="true"
            :resizable="true" 
            :lockAspectRatio="true"
            :on-remove="handleRemove"
            :referenceLineVisible="true"
            :grid=[20,20]
            @activated="print('activated')"
            @deactivated="print('deactivated')"
            @drag-start="print('drag-start')"
            @resize-start="print('resize-start')"
            @dragging="ondrag"
            @resizing="print('resizing')"
            
            @resize-end="print('resize-end')"
        >
            <img :src="imgSrc[index].src" :resizable="true"> 
        </Vue3DraggableResizable> 
      </DraggableContainer>  
    </div>
</template>

<script>

import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {DraggableContainer} from 'vue3-draggable-resizable'
export default {
    el:'#pic',
    name:"chartgenerate",
    components:{
        Vue3DraggableResizable,
        DraggableContainer
    },
    data(){
        return {
            positionX:0,
            positionY:0,
            x:this.data.x-450,
            y:this.data.y,
            index:this.data.type,
            h:100,
            w:100, 
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
        data:Number
    },
    methods:{
         
        print(val){
            console.log(val)
        },
        
        ondrag(e){  
            this.positionX=e.x;
            this.positionY=e.y;
            console.log(this.positon)
        }
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