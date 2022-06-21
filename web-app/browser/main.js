import R from "./common/ramda.js";
import Json_rpc from "./Json_rpc.js";


var chessBoard = [];//create a 2D list
//make sure next turn will not replace chess position of the last user round
var me= true;//inital is black

//initialize 2D list, 15*15二维数组
for (var i=0; i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
        chessBoard[i][j] = 0;//initialize empty list,没有落子
    }
}
var chess = document.getElementById("chess");
var context = chess.getContext("2d");

context.strokeStyle = "#BFBFBF";//change color of the line



//var DrawChessBoard=function(){
for (var i=0; i<15; i++) {
    context.moveTo(15 + i*30, 15);
    context.lineTo(15 + i*30, 435);
    context.stroke();
    context.moveTo(15, 15 + i*30);
    context.lineTo(435, 15 + i*30);
    context.stroke();
}


// for one turn of playing a chess
var oneStep = function (i,j,me) { //i and j= one chess x and y axis, me= black or white
    //draw the chess diagram on web page
    context.beginPath();//start a path/route 路径
    context.arc(15 + i*30, 15 + j*30, 13,0,2*Math.PI);//draw a arc to circle,x and y axis:15 + i*30, 15 + j*30. Radius=13, arc angle from 0 to 2pi
    context.closePath();//close a path/route

    //following describe a black chess with shadow on its surface, transition color
    var gradient = context.createRadialGradient(15 + i*30 +2, 15 + j*30 -2, 13, 15 + i*30 +2, 15 + j*30 -2, 0); //one outer chess color and inner chess color
    //if it is a black chess
    if (me) {
    gradient.addColorStop (0,"#0A0A0A"); //first chess color, outer black
    gradient.addColorStop (1, "#636766");//second chess color, inner white
    } else {
    gradient.addColorStop (0,"#D1D1D1"); //outer white
    gradient.addColorStop (1, "#F9F9F9");//inner black
    }
    
    context.fillStyle = gradient //渐变填充
    context.fill(); //fill the circle (black chess)
}


//click by user to see the postion of chess
chess.onclick = function(e){
    var x=e.offsetX;
    var y=e.offsetY;//calculate postion of black or white chess
    var i=Math.floor(x/30);//转换棋盘上的索引
    var j=Math.floor(y/30);

    //if equal to 0, then can onclick the chess on board
    //落子不重复, if and else to exstinguish
    if(chessBoard[i][j] ==0) {
        oneStep(i,j,me); //inital is black chess
        //点击30*30矩形内任意位置都代表一个点,floor=取整
        if(me){
            chessBoard[i][j] = 1;//black chess=1
        } else{
            chessBoard[i][j] = 2;//white chess=2
        }
        me = !me; // change to white
    }
   
}
