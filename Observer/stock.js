var grid = {
    addGridRow: function (data) {
        grid.addRow(data);
        console.log("updated grid component with: ", data);
    },

    updateCounter: function (data) {
        grid.updateLastChanged(getCurrentTime());
        console.log("data last updated at: " + getCurrentTime() + " with ", data);
    },

    addRow: function (data) {
        $('#stock_table').append(
            "<tr><td>" + data.summay +
            "</td><td>" + data.identifier +
            "</td><td>" + data.stockPrice +
            "</td></tr>"
        )
    },

    updateLastChanged(time) {
        $('.update-time span').html(time)
    }
}

var getCurrentTime = function () {
    var date = new Date(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        y = date.getFullYear(),
        t = date.toLocaleTimeString().toLowerCase();

    return (m + "/" + d + "/" + y + " " + t);
};

var gridUpdate = function (topic, data) {
    if (data !== "undefined") {
        grid.addGridRow(data);
        grid.updateCounter(data);
    }
};

var subscriber = pubsub.subscribe("newDataAvailable", gridUpdate);

pubsub.publish("newDataAvailable", {
    summay: "Apple made $5 billion",
    identifier: "APPL",
    stockPrice: 570.91
});

pubsub.publish("newDataAvailable", {
    summay: "Microsoft made $20 millon",
    identifier: "MSFT",
    stockPrice: 30.85
});