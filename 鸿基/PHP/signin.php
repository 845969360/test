<?php
   
header('content-type:text/html;charset="utf-8"');

    $responseData = array("code" => 0, "msg" => "");
    /*
        在后台再进行一次数据校验
    */
    $username = $_POST['username'];
    $password = $_POST['password'];
    // $repassword = $_POST['repassword'];
    $createTime = $_POST['createTime'];
    //1、判断用户名是否存在
    if(!$username){
        $responseData['code'] = 1;
        $responseData['msg'] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData['code'] = 2;
        $responseData['msg'] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }

    //天龙八部
    //1、链接数据库
    $link = mysqli_connect("127.0.0.1", "root", "123456");

    //2、判断数据库是否链接成功
    if(!$link){
        $responseData['code'] = 4;
        $responseData['msg'] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }
    //3、设置访问字符集
    mysqli_set_charset($link, "utf8");

    //4、选择我们要访问的数据库
    mysqli_select_db($link, "xing");

    //5、准备sql注册
    $sql = "SELECT * FROM signin WHERE username='{$username}'";
    //mysql result
    $res = mysqli_query($link, $sql);
    //取出一行
    $row = mysqli_fetch_assoc($res);

    //已经注册
    if($row){
        $responseData['code'] = 5;
        $responseData['msg'] = "用户名已经存在";
        echo json_encode($responseData);
        exit;
    }


    //准备sql，插入
    $sql2 = "INSERT INTO signin (username,password,createTime) VALUES('{$username}','{$password}',{$createTime})";


    $res = mysqli_query($link, $sql2);
    if($res){
        $responseData['msg'] = "注册成功";
        echo json_encode($responseData);
    }else{
        $responseData['code'] = 6;
        $responseData['msg'] = "注册失败";
        echo json_encode($responseData);
        exit;
    }

    mysqli_close($link);
?>