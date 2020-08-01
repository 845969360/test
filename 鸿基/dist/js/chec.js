define(["pages" , "jquery", "jquery-cookie"], function (pages,$) {
    
    
    
    
    function totalMoney() {
    var total_money = 0;
    // var btnAll = document.querySelectorAll(".shopp_com").children;
    console.log(document.getElementsByClassName(".boxBtn"));
    var btnAll = document.getElementsByTagName(".boxBtn");
    console.log(btnAll)
    // console.log(123)
    // var btnAll = $('.shopp_com').find('tr');
    // var btnAll =document.querySelector(".shopp_com")

    
    // console.log(btnAll)
    // btnAll.forEach((item)=>{

    // })
      
    //     if ($(this).is(':checked')) {
    //         var goods = parseInt($(this).parent().parent().find('.totalPrice').html());
    //         console.log(goods)
    //         total_money += goods;
    //     }
    //     $('.total .total_sum').html('￥' + total_money);
    // });og(goods)
    //         total_money += goods;
    //     }
    //     $('.total .total_sum').html('￥' + total_money);
    // });
}



return {
    totalMoney:totalMoney
  };
});
