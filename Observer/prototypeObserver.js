(function () {
    function Observer () {
        this.fns = [];
    }

    Observer.prototype = {
        subscribe: function (fn) {
            this.fns.push(fn);
        },

        unsubscribe: function (fn) {
            this.fns = this.fns.filter(function (el) {
                return el !== fn
            });
        },

        update: function (o, thisObj) {
            var scope = thisObj || window;
            this.fns.forEach(function (el) {
                el.call(scope, o);
            });
        }
    }

    var o = new Observer;
    var f1 = function (data) {
        console.log('Robbin: ' + data + ', 赶紧干活了！' ); 
    };

    var f2 = function (data) {
      console.log('Randall' + data + ', 找他加点工资去  ！' ); 
    };

    o.subscribe(f1);

    o.update("Tom回来了！");

    o.unsubscribe(f1)

    o.update("老板来啦！")
})()
