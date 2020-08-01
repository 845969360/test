define(["shopping","jquery","jquery-cookie"],function (shopping,$) {

    function scale(){
        $(".pages_littlebox").on("mouseenter","#small",function(){
            $("#shadow,#big").show();
        }).on("mouseleave","#small",function(){
            $("#shadow,#big").css("display","none");
        }).mousemove(function(ev){
            var l = ev.pageX - $(this).offset().left - 100;
            var t =  ev.pageY - $(this).offset().top - 150;
            //做一个简单的限制出界
            l = range(l, 0, 250);
            t = range(t, 0, 250);

            $("#shadow").css({
                left: l,
                top: t
            });
            //大图片，按照对应倍数的反方向移动
            $("#big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })
    }

    function range(iCur, iMin, iMax){
        if(iCur < iMin){
            return iMin;
        }else if(iCur > iMax){
            return iMax;
        }else{
            return iCur;
        }
    }
   


     // 获取id
     function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    function download(){
        var id = getUrlParam('id');
        $.ajax({
            url: "../data/list.json",
            dataType: 'json',
            success: function (res) {
                for(let i = 0;i<res.length;i++){
                    var arr = res[i].hots
                    console.log(arr)
                    for(let j =0;j<arr.length;j++){
                        var str = ""

                        if (id == arr[j].id) {
                            console.log(arr)
                            var str = `
                            <div id="small">
                                <img src="${arr[j].img}" alt="商品图片">
                                <div id="shadow"></div>
                            </div>
                            <div id="big">
                                <img src="${arr[j].img}" alt="">
                            </div>
                            <div class="data">
                                <h5 class="version"><p class="news">新品</p>${arr[j].version}</h5>
                                <h3 class="type">型号：${arr[j].type}</h3>
                                <p class="brief">配置：${arr[j].brief}</p>
                                <h4 class="price">价格￥：${arr[j].price}</h4>
                            </div>
                            <div class="sc">
                                <div id="${arr[j].id}" class="sc_btn"> 加入购物车</div>
                                <div class="account">立即结算</div>
                            </div>
                            `;
                        }
                        $('.pages_littlebox').append(str);
                    // });
                    }
                }
            },
        });  
    }

     //给购物车按钮添加点击
    function sc_btnHandleClick() {
        $(".pages_littlebox").on("click", ".sc_btn", function () {
            console.log(this.id)
          var id = this.id;
          //1、先去是否是第一次添加
          var first = $.cookie("goods") == null ? true : false;
        //   console.log(first)
          if (first) {
            var arr = [{ id: id, num: 1 }];
            console.log(arr)
            $.cookie("goods", JSON.stringify(arr), { expires: 7 });
          } else {
            //2、判断之前是否添加过
            var cookieArr = JSON.parse($.cookie("goods"));
            
            var findIndex = cookieArr.findIndex((item) => item.id == id);
            
            if (findIndex == -1) {
              var obj = { id: id, num: 1 };
              cookieArr.push(obj);
            } else {
              cookieArr[findIndex].num++;
            }
            //存回去
            $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 });
          }
          sc_num();
        //   sc_msg();
        });
      }

      //计算购物车中商品总数
        function sc_num() {
            var cookieStr = $.cookie("goods");
            if (!cookieStr) {
            $(".sc_right .sc_num").html(0);
            } else {
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            $(".sc_right .sc_num").html(sum);
            }
        }


         //进行抛物线运动的函数
        function ballMove(oBtn) {
            $("#ball")
            .show()
            .css({
                left: $(oBtn).offset().left,
                top: $(oBtn).offset().top,
            });

            var X = $(".sc_right .sc_pic").offset().left - $(oBtn).offset().left;
            var Y = $(".sc_right .sc_pic").offset().top - $(oBtn).offset().top;

            var bool = new Parabola({
            el: "#ball",
            offset: [X, Y],
            duration: 800,
            curvature: 0.001,
            callback: function () {
                $("#ball").hide();
            },
            });
            bool.start();
        }

        return {
            scale: scale,
            download:download,
            sc_btnHandleClick:sc_btnHandleClick,
            sc_num:sc_num,
          };
});