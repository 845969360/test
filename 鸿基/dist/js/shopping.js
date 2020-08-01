define(["pages" , "jquery", "jquery-cookie"], function (pages,$) {
// define([ "jquery", "jquery-cookie"], function ($) {
  //加载右侧的购物车列表                  购物车的js
  //cookie 只存储id和num，商品数据服务器上
  //再去下载数据，从数据中筛选已经加入购物车的数据。
  function sc_msg() {
    $.ajax({
      url: "../data/list.json",
      success: function (arr) {
        // console.log(arr)
        var cookieStr = $.cookie("goods");
        if (cookieStr) {
          // 把json数据转化成对应的数据结构
          var cookieArr = JSON.parse(cookieStr);
          // console.log(cookieArr)
          var newArr = []; //符合条件数据
          // 循环json数据里面的和cookie里面的id判断两者相等，提取num
          for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i].hots)
            var hot = arr[i].hots
            for(var k=0;k<hot.length;k++){
              // console.log(hot[k].id)
              for (var j = 0; j < cookieArr.length; j++) {
                if (hot[k].id == cookieArr[j].id) {
                  hot[k].num = cookieArr[j].num;
                  newArr.push(hot[k]);
                  // console.log(hot[k].img)
                  break;
                }
              }
            }
          }
          // console.log(newArr)
          // a是总价
          var str = ``; var a = 0;
          for (var i = 0; i < newArr.length; i++) {
            str += `
            <tr id="${newArr[i].id}" class="cab">
              <td><input  type="checkbox" class="boxBtn" nane="lan1" checked="true"></td>
              <td><img src="${newArr[i].img}" alt=""></td>
              <td>${newArr[i].brief}</td>
              <td class = "shopCar-subtotal">${newArr[i].price}</td>
              <td>
                  <div class="sc_goodsNum">
                      <button id="shopCar-sub">-</button>
                      <span>${newArr[i].num}</span>
                      <button id="shopCar-add">+</button>
                  </div>
              </td>
              <td class="totalPrice">${newArr[i].num*newArr[i].price}</td>
              <td><div class="delete_goodsBtn">删除</div></td>
            </tr>
                    `;
             
              a += newArr[i].num*newArr[i].price  
          }
          var total_money = 0;
    // var btnAll = document.querySelector(".shopp_com");
    // // var btnAll = $('.shopp_com').find('tr');
    // // var btnAll =document.querySelector(".shopp_com")


    // // console.log(Array.from(btnAll))
    // console.log(btnAll)
          console.log(a)
          $(".shopp_com").html(str);
          var btnAll = document.querySelector(".shopp_com");
          console.log($(btnAll).find())
          $(".total .total_sum").html(a);
        }
      },
      error: function (msg) {
        console.log(msg);
      },
    });
  }




 


  //给右侧购物车的按钮添加删除功能
  function rightBtnRemoveClick() {
    $(".shopp_com").on("click", ".delete_goodsBtn", function () {
      var id = $(this).closest("tr").remove().attr("id");
      console.log(id);
      //在cookie中删除这个数据
      var cookieArr = JSON.parse($.cookie("goods"));
      cookieArr = cookieArr.filter((item) => item.id != id);

      cookieArr.length
        ? $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 })
        : $.cookie("goods", null);
      pages.sc_num();
      sc_msg();
    });
  }



   //给右侧购物车的+和-按钮添加点击
   function rightGoodsAdd_subtract() {
    $(".shopp_com").on("click", ".sc_goodsNum button", function () {
      var id = $(this).closest("tr").attr("id");
      //找到cookie中的商品
      var cookieArr = JSON.parse($.cookie("goods"));
      var res = cookieArr.find((item) => item.id == id);
      // console.log(res)//信息没穿进来
      if (this.innerHTML == "+") {
        res.num++;
      } else {
        res.num == 1 ? alert("数量为1，不能减少") : res.num--;
      }
      $(this).siblings("span").html(`${res.num}`);

      $.cookie("goods", JSON.stringify(cookieArr), {
        expires: 7,
      });

      pages.sc_num();
      sc_msg();
    });
  }



  function clearBtnHandleClick() {
    //清空购物车按钮
    $("#clearCar").click(function () {
      //清空购物车
      //1、清空cookie
      $.cookie("goods", null);
      //2、清空页面
      // $(".sc_right ul").html("");
      $(".sc_right ul").empty();
      sc_num();
    });
  }


//   function checkbox() {
    
//     $('.boxAll').click(function () {
//         var $checkboxs = $('.sc_goodsPic').find('input[type="checkbox"]');
//         if ($(this).is(':checked')) {
//             $checkboxs.prop("checked", true);
//         } else {
//             $checkboxs.prop("checked", false);
//         }
//         totalMoney();
//     });

//     // 判断单个复选框有一个未选中，全选按钮取消选中，若全都选中，则全选打对勾 
//     $("#ball").each(function () {
//         $("#ball").on("click", ".boxBtn", function () {
//             var $btnAll = $('#ball').find('input[type="checkbox"]')
//             if ($(this).is(':checked')) {
//                 // $(this).next('label').addClass('mark');
//                 var num = 0;
//                 var len = $btnAll.length;
//                 $btnAll.each(function () {
//                     if ($(this).is(':checked')) {
//                         num++;
//                     }
//                 });
//                 if (num == len) {
//                     $(this).parents('#ball').prev().find('.boxAll').prop("checked", true);
//                     // $(this).parents('#ball').prev().find('.boxAll').next('label').addClass('mark');
//                 }

//             } else {
//                 //否则，店铺全选取消
//                 $(this).parents('#ball').prev().find('.boxAll').prop("checked", false);
//                }
//             totalMoney();

//         });
//     })

// }
// function totalMoney() {
//     var total_money = 0;
//     // $("#ball").on("click", ".boxBtn",function(){
//     var $btnAll = $('#ball').find('input[type="checkbox"]');
//     $btnAll.each(function () {
//         if ($(this).is(':checked')) {
//             var goods = parseInt($(this).parent().parent().find('.totalPrice').html());
//             total_money += goods;
//         }
//         // });
//         $('.buyBottom .totalMoney').html('￥' + total_money);
//     });
// }


      function buttonAll(){
        $('#boxAll').click(function(){
          var $checkboxs = $('.shopp_com').find('input[type="checkbox"]');
            if ($(this).is(':checked')) {
                $checkboxs.prop("checked", true);
            } else {
                $checkboxs.prop("checked", false);
            }
            // totalMoney();
        })

        // 判断单个复选框有一个未选中，全选按钮取消选中，若全都选中，则全选打对勾 
    $(".shopp_com").each(function () {
        $(".shopp_com").on("click", ".boxBtn", function () {
            var $btnAll = $('.shopp_com').find('input[type="checkbox"]')
            if ($(this).is(':checked')) {
                var num = 0;
                // num = Number(num)
                // parseInt
                var len = $btnAll.length;
                // console.log(len)
                $btnAll.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                      }
                    });
                    // console.log(num)
                if (num == len) {
                  console.log(this)
                    $(this).closest('.shopp_com').prev().find('.boxAll').prop("checked", true);
                    $(".total .total_sum").html(a);
                    }

            } else {
                //否则，店铺全选取消
                $(this).parents('.shopp_com').prev().find('.boxAll').prop("checked", false);
               }
            // totalMoney();

        });
    })

}


// function totalMoney() {
//     var total_money = 0;
//     // var btnAll = document.querySelectorAll(".shopp_com").children;
//     var btnAll = document.getElementsByClassName(".hhhhhh");
//     console.log(btnAll)

//     // var btnAll = $('.shopp_com').find('tr');
//     // var btnAll =document.querySelector(".shopp_com")

    
//     // console.log(btnAll)
//     // btnAll.forEach((item)=>{

//     // })
      
//     //     if ($(this).is(':checked')) {
//     //         var goods = parseInt($(this).parent().parent().find('.totalPrice').html());
//     //         console.log(goods)
//     //         total_money += goods;
//     //     }
//     //     $('.total .total_sum').html('￥' + total_money);
//     // });og(goods)
//     //         total_money += goods;
//     //     }
//     //     $('.total .total_sum').html('￥' + total_money);
//     // });
// }




  return {
    rightBtnRemoveClick: rightBtnRemoveClick,
    clearBtnHandleClick: clearBtnHandleClick,
    rightGoodsAdd_subtract: rightGoodsAdd_subtract,
    sc_msg:sc_msg,
    buttonAll:buttonAll,
    // totalMoney:totalMoney
  };
});
