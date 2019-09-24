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



var reversRle = function(str){
    var n = 0;
    var numb = '0123456789';

    var char = [];
    var count = [];

    var m = "";// Строковое представление числа
    for (let i = 0 ;  i < str.length; i++) {
        if( numb.indexOf(str[i]) == -1  ) {
            m = "0";
            char[n] = str[i];
            count[n] = m;
            n++;
            continue;
        };
        m = m + str[i];
        count[n-1] = parseInt( m );
    }

    var result = "";
    for (let n = 0; n < count.length; n++) {
        var length = count[n] == 0 ? 1 : count[n];
        for (let m = 0; m < length; m++) {
            result += char[n];
        }
    }
    return result;
}



str = "aaaaaaaaaabbbcccavs";
console.log(str);
var z = rle(str);

//console.log(z);

str2 = reversRle(z)
console.log( str2 );


console.log( str == str2 );