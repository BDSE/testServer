var twoSum = function(nums, target) {
    var cache = {};
    for(var i = 0; i<nums.length; i++){
        if(cache[nums[i]]){
            return [cache[nums[i]]-1, i];
        }else{
           cache[target-nums[i]] = i+1;   
        }
    }
};

console.log(twoSum([-1,-2,-3,-4,-5], -8));