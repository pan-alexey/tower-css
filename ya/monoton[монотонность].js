// Проверка массива на монотонность

let monoton = function(array){
    //let rules = 0;
    var rules = 0;
    for (let i = 0; i < array.length - 1; i++) {
        // Выбираем направление
        let _rules = array[i+1] >= array[i]  ? 1 : -1;
        if(rules == 0) {
            rules = _rules;
            continue;
        }
        if(rules !== _rules) return false;
    }
    return true;
}

console.log( monoton([0, 1, 5, 9, 15])  );
console.log( monoton([0, 1, 1, 5, 9, 9, 15])  );
console.log( monoton([15, 8, 4, 2, 1])  );
console.log( monoton([0, 1, 5, 15, 4])  );
