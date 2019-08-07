/*
Напишите функцию, которая из произвольного входящего массива выберет все комбинации чисел, сумма которых равна 10.
*/

function combine(arr, etalon = 10) {
    //--------------------------------------------//
    //-------------  helpers  --------------------//
    // Создание бинарного вектора
    // Create binnary array
    function createBin(length) {
        let bin = [];
        for (let i = 0; i < length; i++) {
            bin[i] = false;
        }
        return bin;
    }
    //Бинарное увеличение на 1 
    //Binnary add 1 bit
    function binAddBit(bin, i = 0) {
        if (i >= bin.length) { return null; }
        if (bin[i] == false) {
            bin[i] = true;
            return bin;
        } else {
            bin[i] = false;
            i++;
            return binAddBit(bin, i);
        }
    }

    function iniq(arr) {
        let result = [];
        let object = {};

        arr.forEach(vector => {
            value = vector.sort(function(a, b) { return a - b });
            key = value.join(',');
            object[key] = value;
        });

        for (var key in object) {
            result.push(object[key]);
        }
        return result;
    }


    // Нахождение комбинаций
    // Ограничение:
    // На вход только положительные без нулей
    // На вход массив осортированный по возрастанию
    // в качестве суммы только положительное значение
    function _combine(arr, sum = 10) {

        
        let result = [];

        // Частный случай
        if (arr[0] > sum) return [];
        if (arr[0] == sum) return [
            [sum]
        ];

        //1. Ограничиваем вектор 
        let $aKey = {};
        let $a = [];
        let $sum = 0;

        // Нулевой элемент массива
        $aKey[arr[0]] = arr[0];
        $a.push(arr[0]);
        $sum += arr[0];

        let $eqSum = false;
        for (let i = 1; i < arr.length; i++) {
            if ((arr[i] + arr[0]) <= sum) {
                //-----------------------------//
                // count*element < sum
                $aKey[arr[i]] = $aKey[arr[i]] != undefined ? $aKey[arr[i]] += arr[i] : arr[i];
                if ($aKey[arr[i]] < sum) {
                    $a.push(arr[i]);
                    $sum += arr[i];
                }
                //-----------------------------//

                //-----------------------------//
                // count*element = sum
                if ($aKey[arr[i]] === sum) {
                    let $res = [];
                    for (let j = 0; j < (sum / arr[i]); j++) {
                        $res.push(arr[i]);
                    }
                    result.push($res);
                }
                //-----------------------------//
            }
            if (arr[i] == sum) { $eqSum = true; }
        }

        if ($eqSum) { result.push([sum]); }
        if ($sum < sum) return result;
        if ($sum == sum) {
            result.push($a);
            return result;
        }

        // Бинарный инкримент
        let bin = createBin($a.length);
        while (change = binAddBit(bin)) {
            let $sum = 0;
            let $comb = [];
            for (let i = 0; i < change.length; i++) {
                if (change[i] == false) continue;
                $sum += $a[i];
                if ($sum > sum) break; // exit in accumulate
                $comb.push($a[i]);
                if ($sum == sum) {
                    result.push($comb);
                }
            }
        }
        return result;
    }




    //-------------  helpers  --------------------//
    //--------------------------------------------//



    let result = [];
    // Сначала разбиваем массив на положительные и отрицательные значения
    // Потом сортируем - так быстрее
    let zero = false; // Существует ли в массиве нулевые значения
    let posetive = [];
    let negative = [];

    let sumPosetive = 0;
    arr.forEach(element => {
        if (element === 0) { zero = true; }
        if (element < 0) { negative.push(element); }
        if (element > 0) {
            posetive.push(element);
            sumPosetive += element;
        }
    });

    // Сортируем векторы (по модулю)
    posetive.sort(function(a, b) { return a - b });
    negative.sort(function(a, b) { return b - a });

    // Если сумма всех положительных элементов меньше эталона, то 
    // Вектор не имеет значений удовлетворяющих условию
    if (sumPosetive < etalon) return [];

    // Частный случай равенства всех положительных значений
    if (sumPosetive == etalon) {

        result.push(posetive);
        if (zero) {
            let _clone = posetive.slice();
            _clone.push(0);
            result.push(_clone);
        }
        return result;
    }

    // Поиск в векторе из положительных элементов;
    result = result.concat(_combine(posetive, etalon));

    // SUPPLE - Ограничение вектора с положительными числами реализован в методе перебора combinPosetiveLim
    negative = negative.filter(function(value) { return -value <= (sumPosetive + etalon); });

    // Находим все сочетания (использую биннарный инкремент)
    let bin = createBin(negative.length); // Булевый вектор

    while (changeBin = binAddBit(bin)) {
        let sum = etalon;
        let vector = []; // Сохраняем вектор из отрициталеьных чисел 

        for (let i = 0; i < changeBin.length; i++) {
            if (changeBin[i] == false) continue;
            sum -= negative[i];
            vector.push(negative[i]);
        }

        if (sum > (sumPosetive + etalon)) continue;
        let lines = _combine(posetive, sum);
        lines.forEach(value => {
            result.push(vector.concat(value));
        });
    }

    // добавляем элементы с 0
    if (zero) {
        result.forEach(item => {
            let _clone = item.slice();
            _clone.push(0);
            result.push(_clone);
        });
    }
    result = iniq(result);
    return result;
}




console.log(combine([-1,2,2,5,8,1,8,5861569,1,2,65,1,2,0,56,1,0,56,], 10)  );