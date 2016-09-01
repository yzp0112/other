/**
 * 修改jQuery.validate的默认设置参数
 * 加入bootstrap样式相关内容
 */
$.validator.setDefaults({
    errorElement: 'span',
    errorClass: 'help-block',
    ////结合bootstrap实现效果
    highlight: function (element) {
        /////closest() 方法获得匹配选择器的第一个祖先元素
        $(element).closest('.form-group').addClass('has-error');
    },
    success: function (label) {
        label.closest('.form-group').removeClass('has-error');
        label.remove();
    },
    errorPlacement: function (error, element) {
        element.parent('div').append(error);
    }
});

/*****
 * 在注册页面中新增了一个隐藏域 用于保存当前页面的pageName值
 * 注册页面特殊指定用户名的验证规则
 * 当前页面为注册页面的时候
 * 需要远程验证用户名是否已经存在
 * 此处使用三元运算符 注意代码技巧
 */
var userNameRule = $("#hfPageName").val() == "reg" ? {
    required: true,
    minlength: 5,
    remote: "/users/validateUserName"
} : {
        required: true,
        minlength: 5
    };


$(function () {
    //////通过js代码设置页面导航中a标签的href属性
    // $(".navbar a").first().attr("href", "/index.html");
    // $(".navbar-header .pull-right a").each(function (index) {
    //     if ($.cookie().userName) {
    //         if (index == 0) {
    //             $(this).attr("href", "/userInfo.html");
    //             $(this).html('<span class="glyphicon glyphicon-user"></span>个人中心');
    //             $(".navbar-header .pull-right a").first().css("float", "right");
    //             $(".navbar-header .pull-right a").first().attr("data-toggle", "dropdown");
    //             $(".navbar-header .pull-right").append($('<ul class="dropdown-menu">'
    //                 + '<li><a href="/userInfo.html">个人中心</a></li>'
    //                 + '<li><a href="javascript:void(0)" onclick="logOut()">退出</a></li>'
    //                 + '</ul>'));
    //         }
    //     }
    //     else {
    //         $(this).attr("href", "/login.html");
    //     }
    // });

    $("#mainForm").validate({
        rules: {
            userName: userNameRule,
            pwd: {
                required: true,
                digits: true,
                minlength: 6
            },
            repwd: {
                equalTo: "#pwd"
            },
            question: {
                required: true,
                minlength: 8,
                maxlength: 30
            },
            answer: {
                required: true,
                minlength: 8,
                maxlength: 30
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
            },
            question: {
                required: '提问内容不能为空',
                minlength: '提问内容最小长度为8个字',
                maxlength: '提问内容最大长度为30个字'
            },
            answer: {
                required: '回答内容不能为空',
                minlength: '回答内容最小长度为8个字',
                maxlength: '回答内容最大长度为30个字'
            }
        }
    });
});

/**
 * 退出登录 
 */
function logOut() {
    $.removeCookie('userName');
    window.location.reload();
}