var devicetype = 'typec';

var obj = {
    devicetype: 'typeb',
    test1: {
        devicetype: 'typea',
        test: function () {
            console.log(this.devicetype);
        }
    }
};

var test2 = obj.test1.test;

obj.test1.test(); // typea

//test2(); // typea

test2.call(obj);//typeb