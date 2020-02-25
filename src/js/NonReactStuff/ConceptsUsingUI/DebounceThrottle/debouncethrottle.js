const howerEle = document.getElementById('mosemove-box');
const rawEle = document.querySelector('#result .raw span');
const throtleEle = document.querySelector('#result .throttle span');
const debounceEle = document.querySelector('#result .debounce span');

let rawValue = 0,
    throttleValue= 0,
    debounceValue= 0;

const dt = {
    debounce: function (fn, interval) {
        var debounceId;

        return function () {
            clearTimeout(debounceId);
            debounceId = setTimeout(fn, interval);
        };
    },
    throttle: function (fn, interval) {
        var throttleId, allow = true;
        return  function () {
            if (allow) {
                allow = false;
                var later = function () {
                    allow = true;
                    fn();
                };
                setTimeout(later, interval);
            }
        };
    }
};

const updateRawValue = function () {
    rawEle.innerHTML = ++rawValue+"";
};

const updateThrottleVaLue = dt.throttle(function () {
    throtleEle.innerHTML = ++throttleValue+"";
}, 500);

const updateDebounceValue = dt.debounce(function () {
    debounceEle.innerHTML = ++debounceValue+"";
}, 1000);


const handleMousemove = function () {
    updateRawValue();
    updateThrottleVaLue();
    updateDebounceValue();
};

howerEle.addEventListener('mousemove', handleMousemove);


