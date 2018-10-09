var str = "abcabcbb";

var lengthOfLongestSubstring = function(s) {
    var cache = {},
        maxLen = 0,
        currentStrLen = 0,
        i=0,
        cutOff= 0;
    while(s[i]){
        if(!cache[s[i]]){
            cache[s[i]] = i+1;
            ++currentStrLen;
        }else{
            //character is repeating
            cutOff = cache[s[i]] < cutOff ? cutOff : cache[s[i]];
            if(currentStrLen > maxLen){
               maxLen = currentStrLen;
            }
          currentStrLen = (i+1) - cutOff;
          cache[s[i]] = i+1;
        }
        ++i;
    }
    return maxLen > currentStrLen ? maxLen : currentStrLen;
};

console.log(lengthOfLongestSubstring(str));