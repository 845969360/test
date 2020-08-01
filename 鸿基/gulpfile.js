const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
// 对当前的html文件进行压缩
gulp.task("copy-html",function(){
    return gulp
    .src("*.html")
    .pipe(
        htmlmin({
          removeEmptyAttibutes: true, // 移出所有空属性
          collapseWhitespace: true, // 压缩 html
        })
      )
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
});
// 处理图片
gulp.task("images",function(){
    return gulp
    .src("images/*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})
// 处理js
gulp.task("scripts",function(){
    return gulp
    .src(["scripts/*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

// 处理数据文件
gulp.task("data",function(){
    return gulp
    .src(["json/*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

// 处理php
gulp.task("PHP",function(){
  return gulp
  .src("PHP/*.php")
  .pipe(gulp.dest("dist/PHP"))
  .pipe(connect.reload());
})

// 处理css     gulp-sass gulp-minify-css gulp-rename
// 如果不重命名，可以批量处理，如果重命名，一个文件一个任务，任务名不能重复
const scss = require("gulp-sass");
gulp.task("scss",function(){
    return gulp
    .src("css/*.{scss,sass ,css}")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});


//先让上面的任务都执行一次，这过程 build
gulp.task(
    "build",
    ["copy-html", "scripts", "images", "data", "scss","PHP"],
    function () {
      console.log("项目建立成功");
    }
  );

//实现监听
gulp.task("watch", function () {
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("./images/*.{jpg,png}", ["images"]);
    gulp.watch(["./scripts/*.js", "!gulpfile.js"], ["scripts"]);
    gulp.watch(["./json/*.json", "!package.json"], ["data"]);
    gulp.watch("./css/*.{scss,sass,css}", ["scss"]);
    gulp.watch("./PHP/*.php", ["PHP"]);
  });
  


//启动一个临时的服务器
const connect = require("gulp-connect");

gulp.task("server", function () {
  connect.server({
    root: "dist",
    port: 8888,
    livereload: true,
  });
});

gulp.task("default",["watch", "server"])