//  [3, 2, 1, 5, 6, -1, 10] => [ [ -1 ], [ 1, 3 ], [ 5,  6 ], [ 10 ] ]
var compresArr = function(arr){
    let array = arr.sort(function(a, b){ return a-b;})
    let result = [];
    let memory = [];
    for (let i = 0; i < array.length; i++) {
        memory.push(array[i]);
        if( array[i + 1] - array[i] == 1 ){
            memory.push( array[ i + 1 ] );
        }else{
            if(memory.length > 1){
                result.push( [memory[0], memory[memory.length-1]  ] ); 
            }else{
                result.push( [memory[0] ] ); 
            }
            memory = []; // обнуляем массив
        }
    }
    return result;
}




console.log( compresArr([3, 2, 1, 5, 6, -1, 10]) );