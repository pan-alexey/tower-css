let BigMath = function(){}

BigMath.__proto__.$$format = function(a,b){
    let _a = a.toString().replace(/[^.\-\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ).replace(/--+/g, '-');
    let _b = b.toString().replace(/[^.\-\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ).replace(/--+/g, '-');

    let A = {};
    let B = {};

    A.input  =  _a;
    B.input  =  _b;

    A.isPositive  =  _a[0] == '-' ? false : true;
    B.isPositive  =  _b[0] == '-' ? false : true;

    A.int =  _a[0] == '-' ? _a.slice( -_a.length + 1 ).split('.')[0] :_a.split('.')[0] ;
    B.int =  _b[0] == '-' ? _b.slice( -_b.length + 1 ).split('.')[0] :_b.split('.')[0] ;

    A.fract = _a.split('.')[1] ;
    B.fract = _b.split('.')[1] ;

    let fractLength = Math.max(A.fract.length, B.fract.length);
    let intLength = Math.max(A.int.length, B.int.length);
    while (A.fract.length<fractLength){ A.fract = A.fract + "0"; }
    while (B.fract.length<fractLength){ B.fract = B.fract + "0"; }

    return {
        a : A,
        b : B
    };
}





BigMath.__proto__.add = function(a,b){
    let number = this.$$format(a,b);

    //let _a = number.intA + number.fractA;
    //let _b = number.intB + number.fractB;


    //console.log(_a, _b);

    return number;
}






console.log(  BigMath.add(100.0002,'--1000.00.034')  );