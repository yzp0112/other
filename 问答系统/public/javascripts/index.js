
$(function () {
    $(".navbar a").first().attr("href", "/index.html");
    $(".navbar-header .pull-right a").each(function (index) {
        if ($.cookie().userName) {
            if (index == 0) {
                $(this).html('<span class="glyphicon glyphicon-user"></span>个人中心');
                $(".navbar-header .pull-right a").first().css("float", "right");
                $(".navbar-header .pull-right a").first().attr("data-toggle", "dropdown");
                $(".navbar-header .pull-right").append($('<ul class="dropdown-menu">'
                    + '<li><a href="/userInfo.html">个人中心</a></li>'
                    + '<li><a href="javascript:void(0)" onclick="logOut()">退出</a></li>'
                    + '</ul>'));
            }
        }
        else {
            $(this).attr("href", "/login.html");
        }
    });
    $.get("/questions/getList", {}, function (res) {
        if (res.status == "y") {
            var html = template('tmlQuestionList', { qList: res.data });
            $("#questionList").html(html);
        }
        else {
            ////自行使用bootstrap进行美化
            $("#questionList").html("暂无内容");
        }
    }, "json");
})

/**
 * 退出登录 
 */
function logOut() {
    $.removeCookie('userName');
    window.location.reload();
}
