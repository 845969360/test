define(["jquery"],function ($) {

    // 原生js 的方法
        // define(function () {
        // function scale(small) {
        //     var small = document.getElementById("small")
        //     var shadow = document.getElementById("shadow")
        //     var big = document.getElementById("big")
        //     var bigImg = document.querySelector("#big img")
        //     //设置鼠标移入移出
        //     small.onmouseenter = function(){
        //         shadow.style.display = "block"
        //         big.style.display = "block"
        //     }
        //     small.onmouseleave =function(){
        //         shadow.style.display = "none"
        //         big.style.display = "none"
        //     }
        //     //鼠标阴影在里面运动时
        //     small.onmousemove = function(ev){
        //         var e = ev || window.event
        //         var l = e.clientX - small.offsetLeft - 180;
        //         if(l <= 0){
        //             l = 0
        //         }
        //         if(l >= 200){
        //             l = 200
        //         }
        //         var t = e.clientY - small.offsetTop - 100
        //         if(t <= 0){
        //             t = 0
        //         }
        //         if(t >= 200){
        //             t = 200
        //         }
        //         shadow.style.left = l + "px"
        //         shadow.style.top = t + "px"
        //         bigImg.style.left = -2 * l + "px"
        //         bigImg.style.top = -2 * t + "px"
        //     }
        // }
        // }
    // 22222222222222222222222222222222222222222222222
    // function download(){
    //     // console.log("我是下载");
    //     $.ajax({
    //       url: "../data/list.json",
    //       success: function(arr){
    //         console.log(arr)
    //         for(let i = 0; i < arr.length; i++){
    //           //返回值就是我创建的这个节点
    //           var node = $(`
    //                 <div class="pages_littlebox">
    //                     <div id="small">
                            
    //                     </div>
    //                     <div id="big">
                            
    //                     </div>
    //                     <div class="data">
                            
    //                     </div>
    //                 </div>
                
              
              
    //           <div class = 'list_item'>
    //           <h4>${arr[i].title}</h4>
    //           <div class="detail_page">
    //           </div>
    //       </div> `);
    //           node.appendTo($("#list_pages"));
    
    //           // 取出商品列表
    //           var hots = arr[i].hots;
    //           console.log(hots)
    //           for(let k = 0; k < hots.length; k++){
    
    //             $(`
    //             <img src="${hots[k].img}" alt="商品图片">
    //              <div id="shadow"></div> 
    //             `).appendTo(node.find("#small"));
    
    //             $(`
    //             <img src="${hots[k].img}" alt="">
    //             `).appendTo(node.find("#big"));
    
    //             $(`
    //             <h5 class="version"><p class="news">新品</p>战斧300 PH317-53</h5>
    //             <h3 class="type">型号：PH317</h3>
    //             <p class="brief">配置：掠夺者（Predator）17.3英寸游戏笔记本电脑</p>
    //             <h4 class="price">价格￥：15999.0</h4>
    //             `).appendTo(node.find("#data"));
    
    //           }
    //         }
    //       },
    //       error: function(msg){
    //         console.log(msg);
    //       }
    //     })
    
    //   }
      /*划入显示,移出隐藏*/
      //实现事件委托
      
    //     function showlist(){
    //       $("#list_nav").on("mouseenter",".list_item",function(){
    //         console.log($(this))  
    //         $(this).find(".childlist").show();
          
    //     }),
    //     $("#list_nav").on("mouseleave",".list_item",function(){  
    //       $(this).find(".childlist").hide();
      
    //   })
    //   }
    
    
    
    //用jq写放大镜 
    function scale(){
        $("#small").hover(function(){
            $("#shadow").animate({
                #shadow.style.display = "block";
                #big.style.display = "block"
            }
        })
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
            for(let j =0;j<arr.length;j++){
            // $.each(arr[j].goods, function (idx, val) {
                if (id == arr[j].id) {
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
                    `;
                }
                $('.pages_littlebox').append(str);
            // });
        }
    }
        },
    });  
    }
    
    
    
    
    
    
      return {
        download: download,
        scale:scale
      //   showlist:showlist,
              };
    });