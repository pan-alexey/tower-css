
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


console.log(add(325,500));