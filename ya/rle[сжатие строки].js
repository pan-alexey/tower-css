function rle(str) {
    let sum = [];
    let char = [];
    for (let i = 0; i < str.length; i++) {
        if( str[i] == str[i-1] ){
            sum[sum.length-1]++;
        }else{
            char.push(str[i]);
            sum.push(0);
        }
    }
    let result = "";
    char.forEach(function(el, i){
        let item = sum[i] ? char[i]+ (sum[i]+1) : char[i];
        result += item;
    });
    return result;
}