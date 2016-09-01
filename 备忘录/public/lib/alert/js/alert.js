/****
 * Alert对象
 *
 * title /////弹出的标题
 * msg  ////弹出的提示内容
 * callback //////回调函数
 */
function Alert(title, msg, callback) {
    this.title = title;
    this.msg = msg;
    this.callback = callback;

    /////定义一个输入框控件 在Prompt的时候使用
    this.inputCtrl = null;
}
Alert.prototype = {
    //////弹出遮罩层
    showModalCover: function () {
        document.documentElement.style.overflow = 'hidden'
        var mask = document.createElement('div')
        mask.className = 'modal-mask'
        document.body.appendChild(mask)
    },
    //////alert的主体，借助css技巧实现美化的效果
    showAlertBody: function () {
        var box = document.createElement('div')
        box.className = 'modal-box'
        document.body.appendChild(box)

        var title = document.createElement('div')
        title.className = 'modal-title'
        title.innerText = this.title
        box.appendChild(title)

        var msg = document.createElement('div')
        msg.className = 'modal-message'
        msg.innerText = this.msg
        box.appendChild(msg)

        var btnBox = document.createElement('div')
        btnBox.className = 'modal-button-box'
        box.appendChild(btnBox)


    },
    /////alert按钮
    showButton: function () {
        var btn = document.createElement('div')
        btn.innerText = '确定'
        document.querySelector('.modal-button-box').appendChild(btn)

        var that = this ////把当前的对象赋值给that用于onclick中使用
        btn.onclick = function (e) {
            that.close()

            if (typeof that.callback == 'function') {
                that.callback()
            }
        }
    },
    ////alert关闭
    close: function () {
        var modal = document.querySelector('.modal-mask')
        var box = document.querySelector('.modal-box')
        document.body.removeChild(modal)
        document.body.removeChild(box)

        document.documentElement.style.overflow = 'auto'
    },
    /////展示整个效果
    show: function () {
        this.showModalCover();
        this.showAlertBody();
        this.showButton();
    }
}

/*****
 * Confirm对象
 * title 标题
 * msg 提示内容
 * callback 确定按钮的回调函数
 * cancelCallBack  取消按钮的回掉函数
 *
 */
function Confirm(title, msg, callback, cancelCallBack) {
    Alert.call(this, title, msg, callback);
    this.cancelCallBack = cancelCallBack;
}
Confirm.prototype = Object.create(Alert.prototype);
Confirm.prototype.constructor = Confirm;
/////处理此处的内容
Confirm.prototype.showButton = function () {
    var btnBox = document.querySelector('.modal-button-box')
    var separator = document.createElement('span')
    separator.className = 'modal-separator'
    btnBox.appendChild(separator)

    var okBtn = document.createElement('span')
    okBtn.innerText = '确定'
    okBtn.className = 'modal-left-button'
    btnBox.appendChild(okBtn)

    var cancelBtn = document.createElement('span')
    cancelBtn.innerText = '取消'
    cancelBtn.className = 'modal-right-button'
    btnBox.appendChild(cancelBtn)

    var that = this
    okBtn.onclick = function () {

        /////处理Prompt调用,点击确定按钮的时候 返回输入的内容
        var res = "";
        if(that.inputCtrl){
            res = that.inputCtrl.value;
            if(res.trim()==""){ /////当输入内容为空的时候 返回 不做任何操作
                return;
            }
        }

        that.close()
        if (typeof that.callback === 'function') {
            that.callback(res)
        }
    }
    cancelBtn.onclick = function () {
        that.close()
        if (typeof that.cancelCallBack === 'function') {
            that.cancelCallBack()
        }
    }

}

//////自定义Prompt控件
function Prompt(title, callback, cancelCallBack) {
    Confirm.call(this, title, "", callback, cancelCallBack);
}
Prompt.prototype = Object.create(Confirm.prototype);
Prompt.prototype.constructor = Prompt;
Prompt.prototype.showAlertBody = function () {
    var box = document.createElement('div')
    box.className = 'modal-box'
    document.body.appendChild(box)

    var title = document.createElement('div');
    title.className = 'modal-title';
    title.innerText = this.title;
    box.appendChild(title);

    var input = document.createElement('input');
    input.className = 'modal-input';
    input.placeholder = '请输入您的内容';
    box.appendChild(input);
    input.focus();   //光标直接锁定input框
    this.inputCtrl = input;

    var btnBox = document.createElement('div');
    btnBox.className = 'modal-button-box';
    box.appendChild(btnBox)
};

