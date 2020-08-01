define(["jquery"], function($){
    function download(){
      // console.log("我是下载");
      $.ajax({
        url: "./data/list.json",
        success: function(arr){
          console.log(arr)
          for(let i = 0; i < arr.length; i++){
            //返回值就是我创建的这个节点
            var node = $(`<div class = 'list_item'>
            <h4>${arr[i].title}</h4>
            <div class="detail_page">
            </div>
        </div> `);
            node.appendTo($("#list_nav"));
  
            // 取出商品列表
            var hots = arr[i].hots;
            console.log(hots)
            for(let k = 0; k < hots.length; k++){
              $(`
              <ul class = 'childlist'>
                    <a href="./pages.html?id=${hots[k].id}">
                    <li>
                        <img src="${hots[k].img}" alt="商品图片">
                        <h6>型&nbsp;&nbsp;号：${hots[k].version}</h6>
                        <span>介&nbsp;&nbsp;&nbsp;绍：${hots[k].brief}</span>
                        <span>售价￥：${hots[k].price}</span>
                    </li>
                    </a>
                </ul> 
            `).appendTo(node.find(".detail_page"));
            }
          }
        },
        error: function(msg){
          console.log(msg);
        }
      })
  
    }
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
  
    return {
      download: download,
    //   showlist:showlist,
   
  
  
    }
  })



