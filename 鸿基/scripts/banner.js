define(["jquery"],function ($) {


// define(["startMove"],function () {


//     function banner(){

  //  111111111111111111111111111111111111111111111
    // 获取html中的元素
  //   var oUl = document.querySelector(".slideshow ul");
  //   var aBtns = document.querySelectorAll(".dot li");
  //   // var aLRBtns = document.querySelectorAll(".leftRightTabs a");
  //   var oBanner = document.querySelector(".slideshow");
  //   // 当前图片的位置
  //   var iNow = 1;
  //   // 定时器
  //   var timer = null;

  //   //整个banner图添加移入移出
  //   oBanner.onmouseenter = function(){
  //     clearInterval(timer);
  //   }
  //   oBanner.onmouseleave = function(){
  //     timer = setInterval(timerInner, 2000);
  //   }


  //   //通过循环给每一个按钮添加点击
  //   for(var i = 0; i < aBtns.length; i++){
  //     aBtns[i].index = i;
  //     aBtns[i].onclick = function(){
  //         iNow = this.index + 1;
  //         tab();
  //     }
  //   }
    
  //   //启动定时器
  //   timer = setInterval(timerInner, 2000);


  //   function timerInner(){
  //       iNow++;
  //       tab();
  //   }

  //   function tab(){
  //       for(var i = 0; i < aBtns.length; i++){
  //           aBtns[i].className = '';
  //       }
  //       //从右向左滚动：1 2 3 4 5 1
  //       //从左向右滚动：1 0/5 4 3 2 1

  //       if(iNow == aBtns.length + 1){
  //           aBtns[0].className = 'active';
  //       }else if(iNow == 0){
  //           aBtns[aBtns.length - 1].className = 'active';
  //       }else{
  //           aBtns[iNow - 1].className = 'active';
  //       }
        

  //       startMove(oUl, {left: -iNow * 1533}, function(){
  //           if(iNow == aBtns.length + 1){
  //               iNow = 1;
  //               oUl.style.left = "-1533px"
  //           }
  //           if(iNow == 0){
  //             iNow = 5;
  //             oUl.style.left = -8 * 1533 + 'px';
  //           }
  //       })
  //   }
    
// 2222222222222222222222222222222222222222222222

function banner() {
  $(function () {
    var aBtns = $(".slideshow").find("ol li");
    var oUl = $(".slideshow").find("ul");
    var iNow = 1; //用于代表显示的图片的下标
    var timer = null;

    aBtns.click(function () {
      iNow = $(this).index();
      tab();
    });
    //自动轮播
    timer = setInterval(function () {
      iNow++;
      tab();
    }, 2000);

    $(".slideshow")
      .mouseenter(function () {
        clearInterval(timer);
      })
      .mouseleave(function () {
        timer = setInterval(function () {
          iNow++;
          tab();
        }, 2000);
      });
    function tab() {
      aBtns.removeClass("active").eq(iNow).addClass("active");
      if (iNow == aBtns.size()) {
        aBtns.eq(0).addClass("active");
      }
      oUl.animate({ left: iNow * -1533 }, 500, function () {
        if (iNow == aBtns.size()) {
          iNow = 0;
          oUl.css("left", 0);
        }
        
      });
    }
  });

 }
    return {
        // scale: scale,
        // range:range,
        banner:banner,
      };
});