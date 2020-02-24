var arr = ["a", "b", "C", "d", "e", 1,2,3,4,5,6,7];

function randomChooseFromArr(){
    var randomIndex = Math.floor(Math.random() * arr.length);
    console.log(arr[randomIndex]);
}

randomChooseFromArr();
randomChooseFromArr();
randomChooseFromArr();
randomChooseFromArr();