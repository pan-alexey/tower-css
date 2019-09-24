var getPrime = function(n){
    if (n < 2) return [];
    let result = [];
    flag: // Флаг для продолжения цикла;
    for (let i = 2; i <= n; i++) { // Для всех i
      for (let j = 2; j < i; j++) { // проверить, делится ли число..
        if (i % j == 0) continue flag; // не подходит, берём следующее
      }
      result.push( i ); 
    }
    return result;
}



// способ быстрее, т.к. использует проверка на квадратный корень
let getPrime2 = function(n){
    if (n < 2) return [];
    function isPrime(n) { 
        for (let i = 2; i <= Math.sqrt(n) + 1; i++) {
          if (n % i === 0) {
            return false;
          }
        }
        return true;
    }
    let result = [2]; // изначально добавляем 2 т.к. проверка издет с 2ки
    for (let i = 2; i <=n; i++) {
        if( isPrime(i) ){
            result.push(i);
        }
    }
    return result;
}


console.log( getPrime(10) );
console.log( getPrime2(10) );