function balancedParens(n) {



 
    //==========================================================================//
    // напишем функцию всех сочетаний
    function permutator (arr) {
        var permutations = [];
        if (arr.length === 1) {
          return [ arr ];
        }
        for (var i = 0; i <  arr.length; i++) { 
          var subPerms = permutator(arr.slice(0, i).concat(arr.slice(i + 1)));
          for (var j = 0; j < subPerms.length; j++) {
            subPerms[j].unshift(arr[i]);
            permutations.push(subPerms[j]);
          }
        }
        return permutations;
    }
    //==========================================================================//
    let check = function(string){
        let stack = [];
        let openBracket = {
          "(" : ")",
        };
        let closeBracket = {
          ")" : "(",
        }
        for (let i = 0; i < string.length; i++) {
          const element = string[i];
          if(openBracket[element] ){
            stack.push(element);
          }
          if(closeBracket[element]){
            let lastBraket = stack.pop();
            if(closeBracket[element] !== lastBraket) return false;
      
          }
        }
        if( stack.length > 0  ) return false; 
        return true;
      }
    //==========================================================================//
    var input = "";
    for (let index = 0; index < n; index++) {
        input = input + "()";
    }
    var collection = permutator( input.split("") ) ;
    collection = collection.map(function(el) {
        return el.join("");
    }).filter(function(value, index, self) { 
        return self.indexOf(value) === index;
    }).filter(function(el){
        return check(el);
    });




    return collection.length > 0 ? collection : [""];
}


