class MyPromise {
    constructor(fnc) {
        this.object = "promise";
        this.executorFn = fnc;
        this.status;
        this.value;
    }

    then(resolve, reject) {
        this.executorFn(resolve, reject);
        var returnVal = resolve() || reject() || undefined;
        
        //havent handled the condition when object other than promise object is returned
        if (typeof returnVal !== "object") {
            return new (function (res, rej) {
                res(returnVal);
            }); 
            
        } else if(typeof returnVal === "object" && returnVal.object === "prmise") {
            return returnVal;
        }
    }
}

var promise1 = new MyPromise(function (res, rej) {
    setTimeout(function () {
        res();
    }, 1000)
});

var promise2 = new MyPromise(function (res, rej) {
    setTimeout(function () {
        res();
    }, 2000)
});

var promise3 = new MyPromise(function (res, rej) {
    setTimeout(function () {
        res();
    }, 3000)
});


promise1.then(function(data){

  console.log("after promise 1",data);

}, function(){

   console.log("reject") ;

})

/*
Exception: TypeError: reject is not a function
then@Scratchpad/2:11:38
@Scratchpad/2:43:1
*/
/*
Exception: SyntaxError: redeclaration of let MyPromise
@Scratchpad/2:1:1
*/