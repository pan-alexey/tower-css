
function multiply(a, b) {
    var aa = a.toString().split('').reverse();
    var bb = b.toString().split('').reverse();
    var stack = [];
    for (var i = 0; i < aa.length; i++) {
        for (var j = 0; j < bb.length; j++) {
            var m = aa[i] * bb[j];
            stack[i + j] = (stack[i + j]) ? stack[i + j] + m : m;
        }
    }
    for (var i = 0; i < stack.length; i++) {
        var num = stack[i] % 10;
        var move = Math.floor(stack[i] / 10);
        stack[i] = num;
        if (stack[i + 1])
            stack[i + 1] += move;
        else if (move != 0)
            stack[i + 1] = move;
    }
    return stack.reverse().join('');
}




function add(a, b) {
    var aa = a.toString().split('').reverse();
    var bb = b.toString().split('').reverse();
    var maxLength = Math.max(aa.length, bb.length);
    var stack = [];
    for (let i = 0; i < maxLength; i++) {
        let num1 = aa[i] ? parseInt(aa[i]) : 0;
        let num2 = bb[i] ? parseInt(bb[i]) : 0;
        stack[i] = num1 + num2;
    }

    for (var i = 0; i < stack.length; i++) {
        var num = stack[i] % 10;
        var move = Math.floor(stack[i] / 10);
        stack[i] = num;
        if (stack[i + 1])
            stack[i + 1] += move;
        else if (move != 0)
            stack[i + 1] = move;
    }
    return stack.reverse().join('');
}



function pow(base, exp) {
    if (exp == 0) return 1;
    var result = base;
    for (let i = 1; i < exp; i++) {
        result = multiply(result.toString(), base.toString());
    }
    return result;
}







//Функция сложения (действительные числа)
function add(a, b) {
  var aa = a.toString().split('').reverse();
  var bb = b.toString().split('').reverse();
  var maxLength = Math.max(aa.length, bb.length);
  var stack = [];
  for (let i = 0; i < maxLength; i++) {
      let num1 = aa[i] ? parseInt(aa[i]) : 0;
      let num2 = bb[i] ? parseInt(bb[i]) : 0;
      stack[i] = num1 + num2;
  }
  for (var i = 0; i < stack.length; i++) {
      var num = stack[i] % 10;
      var move = Math.floor(stack[i] / 10);
      stack[i] = num;
      if (stack[i + 1])
          stack[i + 1] += move;
      else if (move != 0)
          stack[i + 1] = move;
  }
  return stack.reverse().join('');
}

//Функция вычиатния (действительные числа)
function difference(max, min) {
  max = max.split('')
      .reverse();
  min = min.split('')
      .reverse();
  var len = max.length,
      result = [];
  for (var i = 0, b = 0, c = 0; i < len; i++) {
      b = max[i] - (min[i] || 0) + c;
      result[i] = b < 0 ? (c = -1, 10 + b) : (c = 0, b)
  }
  return result.reverse()
      .join('')
      .replace(/^0+/, '');
}

//Приведения чисел к общему порядку
function norm(a,b){
  var A = a.split('.');
  var B = b.split('.');
  A[1] = A[1] ? A[1] : "";
  B[1] = B[1] ? B[1] : "";
  let frac =  Math.max(A[1].length-1,B[1].length-1);
  a2 = "";
  b2 = "";
  for (let i = 0; i <= frac; i++) {
    a2 = i < A[1].length ? a2 + A[1][i] : a2 +"0";
    b2 = i < B[1].length ? b2 + B[1][i] : b2 +"0";
  }
  return {
    a: A[0] + "" +a2,
    b: B[0] + "" +b2,
    frac : frac+1
  }
}



function _sum(a,b){
  Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
  };
  let operator = "add";
  if(b[0] == "-"){
    b = b.substring(1);
    operator = "difference";
  }
  var data = norm(a,b);
  if(operator == "add"){
    var res = add(data.a, data.b);
    res = res.split("").reverse()
    if(data.frac){
      res.insert(data.frac, '.')
    }
    return res.reverse().join('');
  }
  if(operator == "difference"){
    var res = difference(data.a, data.b);
    res = res.split("").reverse()
    if(data.frac){
      res.insert(data.frac, '.')
    }
    return res.reverse().join('');
  }
}