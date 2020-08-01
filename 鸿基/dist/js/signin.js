// 注册
import {$post, antiShake} from "./ajax.js";
var oBtn = document.querySelector(".login_submit");
var aInputs = document.querySelectorAll(".login_message input");
var aAlert = document.querySelector(".alert");

//函数防抖
oBtn.onclick = antiShake(download, 1000);

function download(){
    $post({
        url: "../PHP/signin.php",
        data: {
            username: aInputs[0].value,
            password: aInputs[1].value,
        },
        success: function(result){
            console.log(result);
            var obj = JSON.parse(result);
            aAlert.style.display = 'block';
            if(obj.code){
                //错误
                aAlert.style.color = 'red';
                aAlert.innerHTML = obj.msg;

            }else{
                aAlert.style.color = 'green';
                //成功
                aAlert.innerHTML = obj.msg;
            }
        },
        error: function(msg){
            console.log(msg);
        }
    })
}