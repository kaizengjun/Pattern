var pubsub = {};

(function (q) {
    var topics = {},
        subUid = -1;

    // 发布或广播事件，包含特定的topic名称和参数
    q.publish = function (topic, args) {
        if (!topics[topic]) {
            return false;
        }
        
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }

        return this;  
    };

    // 通过特定的名称和回调函数订阅事件
    q.subscribe = function (topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });

        return token;
    };

    // 基于订阅上的标记引用，通过特定topic取消订阅
    q.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }                   
                }
            }
        }

        return this;
    }
}(pubsub))

// 消息记录器
var messageLogger = function (topics, data) {
    console.log("Logging: " + topics + ": " + data);
};

var subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

pubsub.publish("inbox/newMessage", "hello world!")

pubsub.unsubscribe(subscription)

pubsub.publish("inbox/newMessage", "hello again!")



