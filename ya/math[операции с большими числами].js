let BMath = function(){}


var expFormat = function(a){
    let numb = a.split('e');
    let plus = numb[1][0] == "-" ? false : true;

    numb[0] = numb[0].replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ).toString();
    numb[1] = numb[1].replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ).toString();

    let zero = [];
    for (let i = 0; i < parseInt(numb[1]); i++) {
        zero.push(0);
    }
    
    if( plus ){
        let n = numb[0].split('.');
        let whole = n[0].toString();
        let fraction = n[1].toString();
        let j = 0;
        for ( let i = 0 ; i < fraction.length ; i++){
            zero[j++] = fraction[i];
        } 
        for ( let i = whole.length -1 ; i >= 0 ; i--){
            zero.unshift( whole[i]);
        } 
        return zero.join('');
    }
    else{
        console.log(zero);
        console.log(a);
        console.log("0.000125251");

    }

}


BMath.__proto__.$base = function(a){

    // Типы представления могут быть
    // 1.5e-29 / -1.4e+28
    // 1.5000 / 1,00000040


    // Уладяем лишние проблеы
    a = a.toString().replace(/\s/g, '').toString().toLowerCase();
    // сохраняем знак
    let isPositive = a[0]=="-" ? false : true;
    a = a.replace(/^-*/,'').toString();
    // Если число представленно через экспоненту: 
    if( a.indexOf('e') > -1 ) {
        expFormat(a);
    }




    return a;
}



console.log( BMath.$base("125.251e-1") );




// BigMath.__proto__.$$format = function(a,b){
//     let _a = a.toString().replace(/[^.\-\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ).replace(/--+/g, '-');
//     let _b = b.toString().replace(/[^.\-\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ).replace(/--+/g, '-');

//     let A = {};
//     let B = {};

//     A.input  =  _a;
//     B.input  =  _b;

//     A.isPositive  =  _a[0] == '-' ? false : true;
//     B.isPositive  =  _b[0] == '-' ? false : true;

//     A.int =  _a[0] == '-' ? _a.slice( -_a.length + 1 ).split('.')[0] :_a.split('.')[0] ;
//     B.int =  _b[0] == '-' ? _b.slice( -_b.length + 1 ).split('.')[0] :_b.split('.')[0] ;

//     A.fract = _a.split('.')[1] ;
//     B.fract = _b.split('.')[1] ;

//     let fractLength = Math.max(A.fract.length, B.fract.length);
//     let intLength = Math.max(A.int.length, B.int.length);
//     while (A.fract.length<fractLength){ A.fract = A.fract + "0"; }
//     while (B.fract.length<fractLength){ B.fract = B.fract + "0"; }

//     return {
//         a : A,
//         b : B
//     };
// }





// BigMath.__proto__.add = function(a,b){
//     let number = this.$$format(a,b);

//     //let _a = number.intA + number.fractA;
//     //let _b = number.intB + number.fractB;


//     //console.log(_a, _b);

//     return number;
// }






// console.log(  BigMath.add(100.0002,'--1000.00.034')  );