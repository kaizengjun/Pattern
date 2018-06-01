(function() {
    var observer = {
        // 订阅
        addSubscriber: function (callback) {
            this.subscribers[this.subscribers.length] = callback;
        },

        // 退订
        removeSubscriber: function (callback) {
            for (var i = 0; i < this.subscribers.length; i++) {
                if (this.subscribers[i] === callback) {
                    delete (this.subscribers[i])
                }
            }
        },

        // 发布
        publish: function (what) {
            for (var i = 0; i <this.subscribers.length; i++) {
                if (typeof this.subscribers[i] === 'function') {
                    this.subscribers[i](what);
                }
            }
        },

        // 将对象o具有观察者功能
        make: function (o) {
            for (var i in this) {
                o[i] = this[i];
                o.subscribers = [];
            }
        }
    }

    var blogger = {
        recommend: function (id) {
            var msg = "dudu 推荐了的帖子： " + id;
            this.publish(msg);
        }
    };

    var user = {
        vote: function (id) {
            var msg = "有人投票了！ ID=" + id;
            this.publish(msg);
        }
    };

    observer.make(blogger);
    observer.make(user);

    var tom = {
        read: function (what) {
            console.log('Tom看到了如下信息： ' +  what);
        }
    }

    var mm = {
        show: function (what) {
            console.log('mm看到了如下信息：' + what);
        }
    };

    blogger.addSubscriber(tom.read);
    blogger.addSubscriber(mm.show);
    console.log(blogger);

    blogger.recommend(123);

    blogger.removeSubscriber(mm.show);
    blogger.recommend(456); //调用发布

    user.addSubscriber(mm.show);
    user.vote(789);
})()