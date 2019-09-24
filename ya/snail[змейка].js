snail = function(array) {
    // enjoy
    var arrow = function(array){
        var newArr = [];
        //-------------------------------------//
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                let index = (array[i].length - 1) - j;
                newArr[j] = array.map(function(e){
                    return e[index] ? e[index] : null;
                });
            }
        }
        //------------------------------------//
        return newArr;
    }

    var result = [];
    while (  line = array.shift() ){
        result = result.concat(line);
        console.log(line, );
        array = arrow(array);
    }





    console.log( result );
}



snail([
    [1, 2, 3, 4], 
    [5, 6, 7, 8], 
    [9, 10, 11, 12], 
    [13, 14, 15, 16], 
]);