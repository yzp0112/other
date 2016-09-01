$(function () {

    /****
     * cookie的过期时间按天计算
     * $.cookie('name', 'value', { expires: 7 }); ///创建一个cookie 生命周期为7天
     * $.cookie("userName","11"); ////设置cookie userName的值为"11"
     * $.cookie("userName"); /////获取cookie userName的值
     * $.cookie().userName; ////获取cookie userName
     * $.removeCookie('userName'); // => true 删除cookie userName
     * 
     */


    if ($.cookie().userName) {
        $("#nickName").val($.cookie().nickName);
        $("#imgCtrl").attr("src", $.cookie().avatar);
        $("#iAvatar").val($.cookie().avatar);
    }
    else {
        window.location.href = "/login.html";
    }

    $("#imgCtrl").click(function () {
        $("#selectFile").click();
    });

    ////html5Uploader 标准配置方法
    $("#selectFile").html5Uploader({
        name: "Filedata",
        postUrl: "/common/file/uploadfile", ////图片上传的post提交地址
        onSuccess: function (msg) { /////上传成功后的回调函数
            //console.log(msg);
            try {
                var url = JSON.parse(msg.currentTarget.response).url;
                $("#imgCtrl").attr("src", url); ////指定img控件的src属性
                $("#iAvatar").val(url); /////服务器端接收时需要获取的标签
            }
            catch (e) {
                console.log(e);
            }
        }
    });

})