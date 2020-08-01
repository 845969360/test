console.log('加载成功')

//管理当前.html页面上模块
//先去配置引入的模块的路径

require.config({
    paths:{
        banner: "banner",
        jquery: "jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"],

    },
});

    // 引入模块
    require(["banner"] , function(banner){
        pages.banner();
    })










