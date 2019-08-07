// Сумма чисел массива
// ([1, 2, '3x']) => 6
// ([1, 2, 'x3']) => 3
// ([1, [1, 2], 2]) => 6


let arrSum = function(arr){
    let sum = 0;
    function getvalue(arr){
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            // Является ли массивом
            if (element instanceof Array ){
                getvalue(element);
            }else{
                sum += parseFloat(element);
            }
        }
        return sum;
    }
    return getvalue(arr);
}
console.log( arrSum([1, [1, "2x"], [4,4]] )  );