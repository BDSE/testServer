var userInputInterval;

var debounce = function (fn, interval) {
    var debounceId;

    return function () {
        clearTimeout(debounceId);
        debounceId = setTimeout(fn, interval);
    };
};

var throttle = function (fn , interval) {
    var throttleId, allow = true;

    var throttled = function () {
        if(allow){
            allow = false;
            var later = function() {
                allow = true;
                fn();
            };
            setTimeout(later, interval);
        }
    };

    return throttled;
};

var userInputEventHandler = function () {
    console.log(new Date().getTime());
};

var debouncedEventHandler = debounce(userInputEventHandler, 1000);

var throttledEventHandler = throttle(userInputEventHandler, 2000);


var emulateUserInput = function () {
    userInputInterval = setInterval(throttledEventHandler, 200);    
};



emulateUserInput();

setTimeout(function() {
    clearInterval(userInputInterval);
}, 8000);