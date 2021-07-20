<template>
    <div class="header">
        <h1>图标配置平台</h1>
    </div>
    <div class="divall">
        <div class="left">
            <chartpic @sendValue="getValue"></chartpic>
        </div>
        <div class="main"> 
                <chartgenerate @sendSize="getSize" :data="position" :size="size_hw" v-for="(item,index) in chart" :key="index"> 
                     
                </chartgenerate> 
                <!--<div class="about" id="chart" style="width:500px; height:500px" ></div>-->
        </div>
        <div class="right">
            <config v-if="type!=-1" :size="size_hw" @sendHeight="getHeight" @sendWidth="getWidth"></config>
        </div>
    </div>
    <div class="footer">footer</div>
</template>

<script>
import chartpic from "../components/chartpicture.vue"
import chartgenerate from "../components/chartgenerate.vue"
import config from "../components/configuration.vue"
export default {
    name:"Main",
    data(){
        return{
            type:-1, 
            position:{
                x:0,
                y:0,
                type:-1,
                no:0
            },
            size_hw:{
                h:100,
                w:100
            },
            positionX:0,
            positionY:0,
            chart:[ 
            ],
            
        }
    },
    components:{
        chartpic,
        chartgenerate,
        config
    },
    methods:{ 
        addNode:function() {
            //console.log(this.positionX)
            //console.log(this.positionY)
            this.position.x=this.positionX
            this.position.y=this.positionY
            this.position.type=this.type
            //console.log(typeof(this.position))
            this.chart.push({type: this.type, positionX:this.positionX , positionY:this.positionY});
            //console.log(this.chart)
            this.position.no+=1
        },
        getValue(value){
            console.log("from components:",value)
            this.type=value.type
            this.positionX=value.positionX
            this.positionY=value.positionY
            this.addNode()
            this.type=0
        },
        getSize(size){
            console.log("size:",size)
            this.size_hw.h=size.h
            this.size_hw.w=size.w
        },
        getHeight(h){
            console.log("h:",h)
            this.size_hw.h=h 
        },
        getWidth(w){
            console.log("w:",w) 
            this.size_hw.w=w
        },
        drawLine(){
        // 基于准备好的dom，初始化echarts实例
            //console.log("drawLine")
            let myChart = this.$echarts.init(document.getElementById('chart'))
            // 绘制图表
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
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
        }
    },
    mounted() {    
        //this.drawLine() 
    },

}
</script>

<style >
*{
  margin:2;
  padding:0;
  font-size:1em;
}

.header{
    width:95%;
    height:50px;
    margin:0 auto;
    background:rgb(54,108,179);
}

.divall{
    width:95%;
    height:91vh;
    margin: 0 auto;
    background: #fff;
}

.footer{
    width: 95%;
    height:50px;
    margin:0 auto;
    background: rgb(54,108,179);
}

.main{
    box-sizing: border-box;
    
    height:91vh;
    width:1500px;
    float: left;
    margin-left: 450px;
    background: #fff;
}

.left{
    box-sizing: border-box;
    
    height:91vh;
    position: absolute;
    width:450px;

    float:left;
    background:#ffcc99
}

.right{
    box-sizing: border-box;
    
    height:91vh;
    position: absolute;
    width:465px;
    float:right;
    margin-left: 1950px;
    background: lightcyan;
}

</style>