window.utils={};//在window上面定义一个属性，该属性是一个对象


// 在对象utils上定义captureMouse捕获鼠标的方法
window.utils.captureMouse=function(element){
    var mouse={x:0,y:0};
    // 为元素绑定mousemove事件
    element.addEventListener('mousemove',function(event){
        var x,y;
        // 获取鼠标位于当前屏幕的位置，并做兼容性处理
        if(event.pageX||event.pageY){
            x=event.pageX;
            y=event.pageY;
        }else{
            x=event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
            y=event.clientY+document.body.scrollTop+document.documentElement.scrollTop;
        }
        // 当前坐标减去元素的偏移位置，即为鼠标相对canvas上的位置
        x-=element.offsetLeft;
        y-=element.offsetTop;
        mouse.x=x;
        mouse.y=y;
    },false)
    return mouse;
}




// 在对象utils上定义captureTouch获取当前触摸位置的方法
window.utils.captureTouch=function(element){
    var touch={
        x:null,
        y:null,
        isPressed:false,
        event:null
    }
    var body_scrollLeft=document.body.scrollLeft,
        element_scrollLeft=document.documentElement.scrollLeft,
        body_scrollTop=document.body.scrollTop,
        element_scrollTop=document.documentElement.scrollTop,
        offsetLeft=element.scrollLeft,
        offsetLeft=element.scrollTop;

    // 绑定touchstart事件
    element.addEventListener('touchstart',function(event){
        touch.isPressed=true;
        touch.event=event;
    },false);
    // 绑定touchend事件
    element.addEventListener('touchend',function(event){
        touch.isPressed=false;
        touch.x=null;
        touch.y=null;
        touch.event=event;
    })
    // 绑定touchmove事件
    element.addEventListener('touchmove',function(event){
        var x,y,
            touch_event=event.touches[0];//第一次touch;
        if(touch_event.pageX||touch_event.pageY){
            x=touch_event.pageY;
            y=touch_event.pageY;
        }else{
            x=touch_event.clientX+body_scrollLeft+element_scrollLeft;
            y=touch_event.clientY+body_scrollTop+element_scrollTop;
        }
        // 减去偏移量
        x-=offsetLeft;
        y-=offsetTop;
        touch.x=x;
        touch.y=y;
        touch.event=event;
    },false)
    return touch;
}

// utils.captureTouch和utils.captureMouse这两个方法都是为了获取当前相对于canvas元素的位置
// 除了这两个方法，由于我们使用的requestAnimationFrame方法同样也涉及到兼容性的问题，我们将它一同添加到utils.js中当然，他们不需要卸载utils对象下。这两个方法都是做兼容性的处理，你只需要将他们添加进去就好。
//动画循环 
if (!window.requestAnimationFrame) { 
    window.requestAnimationFrame =  
    (window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.msRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    function (callback) { 
      return window.setTimeout(callback, 17 /*~ 1000/60*/); 
    }); 
  } 
   
  //动画循环取消 
  if (!window.cancelAnimationFrame) { 
    window.cancelAnimationFrame =  
    (window.cancelRequestAnimationFrame || 
    window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || 
    window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || 
    window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || 
    window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame || 
    window.clearTimeout); 
  }