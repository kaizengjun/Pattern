var mySingleton = (function () {
    var instance;

    function init() {
        function privateMethod() {
            console.log('I am private');
        }

        var privateVariable = 'I am also private';
        var privateRandomNumber = Math.random();
        
        return {
            //公有方法好变量
            publicMethod: function () {
                console.log('The public can see me');
            },
            publicProperty: 'I am also public',
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    };

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

var myBadSingleton = (function () {
    var instance;
    function init() {
        var privateRandomNumber = Math.random();
        return {
            getRandomNumber: function () {
                return privateRandomNumber;
            }
        };
    }
    return {
        getInstance: function () {
            instance = init();
            return instance;
        }
    }
})();

var SingletonTester = (function () {
    function Singleton(options) {
        options = options || {};
        
        this.name = 'GingletonTester';
        this.pointX = options.pointX || 6;
        this.pointY = options.pointY || 10;
    }

    var instance;

    var _static = {
        name: 'SingletonTester',

        getInstance: function (options) {
            if (instance === undefined) {
                instance = new Singleton(options);
            }

            return instance;
        }   
    }

    return _static;
})();

var singletonTest = SingletonTester.getInstance({
    pointX: 5
});

console.log(singletonTest) //{name: "GingletonTester", pointX: 5, pointY: 10}

console.log(SingletonTester.getInstance({
    pointX: 8
}))  //{name: "GingletonTester", pointX: 5, pointY: 10}