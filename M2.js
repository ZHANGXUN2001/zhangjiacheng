// JavaScript Document
(function($){
    $.bulletScreen={
        timers:[],    //定时数组
        /**
         * 添加弹幕
         * @param odiv 当前弹幕元素
         * @param container 弹幕墙容器
         */
        add:function(odiv,container){
            odiv.css({                          //定义弹幕元素的基本样式
                position:'absolute',
                fontSize:'20px',
                display:'block',
                whiteSpace:'nowrap'
            });
            var r = Math.floor(Math.random() * 254);
            var g = Math.floor(Math.random() * 254);
            var b = Math.floor(Math.random() * 254);
            odiv.css({                        //定义弹幕元素的随机样式（top位置,颜色）
                color: "rgb(" + r + "," + g + "," + b + ")",
                top: (Math.floor(Math.random() * container.height())-24) + "px",
                width:odiv.width(),
                right: 0
            });
            container.append(odiv);
            this.move(odiv,container);
        },
        /**
         * 暴露给外层调用的方法
         * @param val 弹幕内容
         * @param container 弹幕墙容器
         */
        send:function(val,container){
            var odiv = $("<div class='bullet'></div>");       //创建弹幕元素
            odiv.html(val);
            this.add(odiv,container);
        },
        /**
         * 定时改变弹幕的位置（right+1）,到达左侧时清除弹幕，清除定时任务
         * @param odiv 当前弹幕元素
         * @param container 弹幕墙容器
         */
        move:function(odiv,container){
            var i = 0;
            var timer = setInterval(function() {
                odiv.css({
                    right: (i += 1) + "px"
                });
                if ((odiv.offset().left + odiv.width()) < container.offset().left) {
                    odiv.remove()
                    clearInterval(timer)
                }
            }, 10);
            this.timers.push(timer);
        },
        /**
         * 清除弹幕墙上的所有弹幕
         * @param container 弹幕墙容器
         */
        clear:function(container){
            for (var i = 0; i < this.timers.length; i++) {  //遍历定时素组，清除所有定时任务
                clearInterval(this.timers[i])
            }
            container.find('.bullet').remove();
        }
    }
})(jQuery);