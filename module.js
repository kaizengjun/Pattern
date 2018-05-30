var basketModule = (function () {
    var basket = [];

    function doSomethingPrivate () {
        console.log('heihei');
    }

    return {
        addItem: function (values) {
            basket.push(values);
        },

        getItemCount: function () {
            return basket.length;
        },
        
        doSomething: doSomethingPrivate,

        getTotal: function () {
            var itemCount = this.getItemCount();
            var total = 0;

            while (itemCount--) {
                total += basket[itemCount].price;
            }

            return total;
        }
    };
})();

basketModule.addItem({
    item: "break",
    price: 0.3
});

basketModule.addItem({
  item: "apple",
  price: 0.7
});

function library(module) {
    $(function () {
        if (module.init) {
            module.init();
        }
    })      

    return module;
}

var myLibrary = library(function () {
    return {
        init: function () {

        }
    }
})();

console.log(myLibrary)