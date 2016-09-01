$(function () {
    //此处使用vuejs,实现页面无刷新效果
    var app = new Vue({
        el: "#app",
        data: { dirs: [] } ////此处定义一个空数据对象
    })

    initData();
    /**
     * 获取数据 
     */
    function initData() {
        $.getJSON("/notes/dir/all", function (res) {
            app.dirs = res.data;
        })
    }

    /////新建文件夹按钮点击
    $(".note-create-dir").click(function () {
        var p = new Prompt("新建文件夹", function (dirName) {
            //console.log(dirName);
            ////调用服务器端的接口 创建文件夹
            $.post('/notes/dir/new', { dirName: dirName }, function (res) {
                console.log(res);
                if (res.status == "y") {
                    app.dirs = res.data;
                }
                else {
                    (new Alert("提示", res.msg)).show();
                }
            }, "json");

        }, function () {

        });
        p.show();
    });
})