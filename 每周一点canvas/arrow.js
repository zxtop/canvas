/**
 * 
 * 用canvas来画一个箭头
 */
function Arrow(){
    this.x=0;//初始位置
    this.y=0;
    this.rotation=0;
    this.color='red'
}
// 在原型上定义draw方法
Arrow.prototype.draw=function(context){
    context.save();
    context.translate(this.x,this.y);//将坐标移到this.x和this.y
    context.rotate(this.rotation);
    context.linWidth=5;
    context.fillStyle=this.color;
    context.beginPath();
    context.moveTo(-50,-25);
    context.lineTo(0,-25);
    context.lineTo(0,-50);
    context.lineTo(50,0);
    context.lineTo(0,50);
    context.lineTo(0,25);
    context.lineTo(-50,25);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
}
