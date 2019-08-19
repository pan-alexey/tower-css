
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