<template>
  <!--<div class="pic" @mousedown="move"> 
     </div>
    <img src="../assets/logo.png" @mousedown="move"> --> 
    
    <div class="imgbox" :adsorbParent="true">
      <DraggableContainer>
        <Vue3DraggableResizable  
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
            :grid=[20,20]
            @activated="print('activated')"
            @deactivated="print('deactivated')"
            @drag-start="print('drag-start')"
            @resize-start="print('resize-start')"
            @dragging="ondrag"
            @resizing="resizing"
            
            @resize-end="print({h})"
        >
            <!--<img :src="imgSrc[index].src" :resizable="true"> -->
            <div class="about" :id="generateID()" style="width:300px; height:300px" :resizable="true" :visiable="true" ></div>
        </Vue3DraggableResizable> 
      </DraggableContainer>
        
    </div> 
</template>

<script>
import $ from 'jquery'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import {DraggableContainer} from 'vue3-draggable-resizable'
//import Vue3DraggableResizable from './vue3-draggable-resizable/Vue3DraggableResizable'
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
            no:this.data.no,
            h:100,    //高度
            w:100,    //宽度
            radius:50,
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
        },
        resizing(e){
            let id="#"+this.generateID()
            console.log(id)
            $(id).css("height","10px")
        },
        drawBar(){
        // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(this.generateID()))
            // 绘制图表 \
            myChart.resize() 
            myChart.setOption({
                title: { text: '条形图' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }); 
            
        },
        drawPie(){
             
            let myChart = this.$echarts.init(document.getElementById(this.generateID()))
            //console.log("drawLine:",document.getElementById('chart'))
            // 绘制图表 
            myChart.setOption({
            series : [
                {
                    name: '访问来源',
                    type: 'pie',    // 设置图表类型为饼图
                    radius: this.radius+"%",  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                    data:[          // 数据数组，name 为数据项名称，value 为数据项值
                        {value:235, name:'视频广告'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ]
                }
            ]
            })
        },
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById(this.generateID()))
            myChart.setOption({
                tooltip: {},
                xAxis: {
                name: "日期",
                nameLocation: "end",
                nameTextStyle: {
                    padding: -12
                },
                tooltip:{
                    trigger:'axis'
                }, 
                data: ["1", "2", "3", "4", "5"],
                type: "category",
                boundaryGap: false
                },
                color: ["#dcb7fe"],
                yAxis: {
                type: "value",
                name: "分数",
                nameLocation: "end",
                nameTextStyle: {
                    padding: -8
                }
                },
                series: [
                {
                    data: [54, 86, 36, 45, 75],
                    type: "line"
                }
                ]
            });
        },
        drawDot(){
            let myChart = this.$echarts.init(document.getElementById(this.generateID()))
            myChart.setOption({
                title: {
						text: '主标题',
						subtext: '副标题'
						},
						toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                            saveAsImage: {}
                            }
						},
						color:['#2f4554', '#61a0a8', '#d48265'],
						tooltip: {
							trigger: 'item',
							axisPointer: {
								type: 'cross'
							}
						},
						xAxis: {
							scale: true,
							name:'X轴名称',
							nameLocation:'end'
						},
						yAxis: {
							scale: true,
							name:'Y轴名称',
							nameLocation:'end'
						},
						series: [{
							type: 'scatter',
							data: [[1,2],[1.3,2.5],[1.8,2.8],[2.2,3.2],[3,4],[3.5,4.5],[4.5,5.5],[5,6]],
							markLine:{
								data:[
									{
										name:'1.3',
										yAxis:1.3
									}
								]
							}
						}] 
            });
        },
        generateID(){
            return "chart"+this.no
        }
    },
    mounted() {    
        this.$nextTick(()=>{
            if(this.index===3)
                this.drawBar()  
            else if(this.index===1)
                this.drawPie()
            else if(this.index===2)
                this.drawLine()
            else 
                this.drawDot()
        })
        
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