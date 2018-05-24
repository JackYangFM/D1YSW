<?php
    //header("Access-Control-Allow-Origin:*")

    $usr = @$_POST["username"];
    $pwd = @$_POST["password"];   
    $type = @$_POST["type"];
    if($type !== "login" && $type !== "register"){
        $res = array("error"=>"i don't know what you want !");
        die(json_encode($res));
    }
    require("./_connect.php");
    $pwd = md5($pwd);//MD5加密
    
    //查询是用户名密码是否已经存在
    $sql_login = "SELECT username,pwd FROM user_data";
    
    //将用户名密码插入数据库
    $sql_register = "INSERT user_data(
        username,pwd
    )
        VALUES 
    ('{$usr}','{$pwd}')
    ";
    $result_login = $conn->query($sql_login);
    
    $hasuser = FALSE; //用户名是否存在;
    $select_res = FALSE;//储存用户信息;
    $haspwd = FALSE;//该用户名密码是否正确;
    
    while($row = $result_login->fetch_assoc()){
        //array("username"=>yangshuisheng,"pwd":"123456")
        if($row["username"] == $usr){
            $hasuser = TRUE;
            echo "登录成功";
            //如果是注册，没必要判断密码;
            if($type == "register"){
                break;
            }
            if($row["pwd"] == $pwd){
                $select_res = json_encode($row);
                $haspwd = TRUE;
                break;
            }
        }
    }

    if($type == "login" &&  $haspwd == TRUE){
        //die($select_res);//返回 用户名,密码
    }else if($type == "login"){
        die("用户名不存在，请先注册！！！");
    }

    if($type == "register" && $hasuser == TRUE){
        //用户名重名; => 2;
        echo "用户名重名";
    }else if($hasuser == FALSE ){
        //注册成功成功;=>1
        echo "恭喜你注册成功";
        if($type == "register"){
             $result_register = $conn->query($sql_register);
            
        }
    }

?>