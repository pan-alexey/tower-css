// Размен монет с ограничениями по номиналу


// Полный перебор массива
var terminal = function(total, limits){
    let _nominal = [];
    let _limit = [];
    let result = [];
    for (key in limits) {
        _nominal.push(key);
    }
    _nominal = _nominal.sort(function(a,b){return b-a;})
    for (let i = 0; i < _nominal.length; i++) {
        let nominal = _nominal[i];
        _limit[i] = limits[nominal];
        result[i] = 0;
    }

    // Инкрементатор,
    // bin - начальный массив
    // limit - лимит массива
    // i - индекс массива для увеличения
    function add(bin, limit, i = 0) {
        if (i >= bin.length) { return null; }
        if ( (bin[i] + 1 <= limit[i] ) &&  amount(bin, _nominal)<total  ) {
            bin[i] = bin[i] + 1;
            return bin;
        }else{
            bin[i] = 0;
            i++;
            return add(bin, limit ,i);
        }
    }
    // Сумма значений 
    function amount(count, nominal){
        let sum = 0;
        for (let i = 0; i < count.length; i++) {
            sum += count[i]*nominal[i];
        }
        return sum;
    }
    //--------------------------------------------------------//
    while( arr = add(result,_limit) ){
         // Все комбинации которые дают нам в сумме total;
        if(amount(arr, _nominal) === total){
            // т.к. нет дополнительных условий, то возвращаем первый найденный
            // он кстати будет удовлетворять пожеланию - самыми крупными
            let result = {};
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                const key = _nominal[i];
                if( element ==0 ) continue;
                result[key] = element;
            }
            return result;
        }
    }
    //--------------------------------------------------------//
    return null;
}


var limits = {
    5000: 4,
    1000: 5,
    500: 2,
    100: 5,
    50: 100,
    30: 23
};
console.log( terminal(120, limits) );
