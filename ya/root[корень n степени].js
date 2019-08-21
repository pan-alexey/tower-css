function root(val, power){
    var x = 1;
    for (var i = 0; i < 100; i++){
        if (x == (
            x = (1.0 / power) * (
                ((power - 1) * x) + (val / Math.pow(x, power - 1))
                )
            )
        ) break;
    }
    return x;
}




console.log( root(64, 3) );

//exp(ln(x)/n).