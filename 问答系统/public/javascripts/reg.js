$(function () {
    $("form").validate({       
        rules: {
            userName: {
                required: true,
                minlength: 5,
                remote: "/users/validateUserName"
            },
            pwd: {
                required: true,
                digits: true,
                minlength: 6
            },
            repwd: {
                equalTo: "#pwd"
            }
        },
        messages: {
            userName: {
                required: "用户名不能为空",
                minlength: "用户名最小长度为5",
                remote: "用户名已存在"
            },
            pwd: {
                required: "密码不能为空",
                digits: "密码只能为数字",
                minlength: "密码最小长度为6"
            },
            repwd: {
                equalTo: "两次输入的密码不一致"
            }
        },
        /////验证通过后执行的方法
        submitHandler: function () {
            ////提交到服务器端
            /****
             * $.post 参数一 请求地址，参数二 传递的数据，参数三 成功后回掉函数
             */
            $.post('/users/reg',$("form").serialize(),function(res){
                console.log(res);
                if(res.status == "y"){
                    alert(res.msg);
                }
                else{
                    alert(res.msg);
                }
            })
            // $.ajax({
            //     url:"/users/reg",
            //     type:"post",
            //     data:$("form").serialize(),
            //     dataType:"json",
            //     success:function(res){
            //         console.log(res);
            //     },
            //     error:function(err){
            //         console.log(err);
            //     }
            // })
        }
    });
});