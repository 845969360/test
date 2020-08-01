console.log("加载成功");
//管理当前.html页面上模块
//先去配置引入的模块的路径
require.config({
  paths: {
    nav: "nav",
    pages: "pages",
    shopping: "shopping",
    jquery:"jquery-1.10.1.min",
    "jquery-cookie":"jquery.cookie"
  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    //某一个模块，不遵从AMD
    parabola: {
      exports: "_",
    },
  },
});

//引入模块
require(["shopping","pages"], function (shopping,pages) {
    pages.download();
    pages.scale();
    pages.sc_btnHandleClick();
    pages.sc_num();
});
require(["nav"], function (nav) {
  nav.download();
  nav.showlist();
});



// 从该页面转到js文件中，js是方法