var CustomEvents = (function () {
    var events = {},

        subscribe = function (name, cb) {
            var id;
            if (cb && typeof cb === 'function') {
                if (!events[name]) {
                    events[name] = [];
                }
                id = events[name].push(cb) - 1;
            } else {
                console.log('call back in not a function.');
            }
            return id;
        },

        publish = function (id, name, params) {
            var cbArray, cb;
            cbArray = events[name];
            if (cbArray) {
                if (id && name) {
                    cb = cbArray && cbArray[id] ? cbArray[id] : null;
                    if (cb) {
                        cb(params);
                    } else {
                        console.log("Invalid ID");
                    }
                } else if (name) {
                    if (cbArray && cbArray.length) {
                        for (var x of cbArray) {
                            x(params);
                        }
                    }
                }
            } else {
                console.log("Event not found");
            }
        };

    return {
        pub: publish,
        sub: subscribe
    };
})();

var cb1_event1 = CustomEvents.sub('Event1', function (params) {
    console.log("event 1: cb1", params);
});

var cb2_event1 = CustomEvents.sub('Event1', function (params) {
    console.log("event 1: cb2", params);
});

var cb3_event1 = CustomEvents.sub('Event1', function (params) {
    console.log("event 1: cb3", params);
});

CustomEvents.pub(false, "Event1", {
    params: 1
});

CustomEvents.pub(cb2_event1, "Event1", {
    params: 1
});

CustomEvents.pub(cb2_event1, "EventUnknow", {
    params: 1
});