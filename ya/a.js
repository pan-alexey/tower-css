function add(a) {
    let currentSum = a;
    function f(b) {
      currentSum += b;
      return f;
    }
    // f.toString = function() {
    //   return currentSum;
    // };
    return f;
}


console.log( add(1)(2)(7)  );