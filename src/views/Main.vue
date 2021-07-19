<template>
    <div class="header">header</div>
    <div class="divall">
        <div class="left">
            <chartpic @sendValue="getValue"></chartpic>
        </div>
        <div class="main"> 
                <chartgenerate :data="position" v-for="(item,index) in chart" :key="index"> 
                     
                <h2 style="left:30px;" :draggable="false">我是图{{index}}</h2> 
                </chartgenerate> 
        </div>
        <div class="right">right</div>
    </div>
    <div class="footer">footer</div>
</template>

<script>
import chartpic from "../components/chartpicture.vue"
import chartgenerate from "../components/chartgenerate.vue"
export default {
    name:"Main",
    data(){
        return{
            type:-1,
            position:{
                x:0,
                y:0,
                type:-1
            },
            positionX:0,
            positionY:0,
            chart:[ 
            ],
            
        }
    },
    components:{
        chartpic,
        chartgenerate
    },
    methods:{ 
        addNode:function() {
            console.log(this.positionX)
            console.log(this.positionY)
            this.position.x=this.positionX
            this.position.y=this.positionY
            this.position.type=this.type
            console.log(typeof(this.position))
            this.chart.push({type: this.type, positionX:this.positionX , positionY:this.positionY});
            console.log(this.chart)
        },
        getValue(value){
            console.log("from components:",value)
            this.type=value.type
            this.positionX=value.positionX
            this.positionY=value.positionY
            this.addNode()
            this.type=-1
        }
    },
    created(){
        this.$watch("type",function(newValue,oldValue){
            if(this.type!=-1){
                console.log("add")
            }
        })
    }

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
    width:1100px;
    float: left;
    margin-left: 450px;
    background: #C4C4FF;
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
    width:340px;
    float:right;
    margin-left: 1550px;
    background: lightcyan;
}

</style>