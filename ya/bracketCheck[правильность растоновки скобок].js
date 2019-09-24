let check = function(string){
    let stack = [];
    let openBracket = {
      "(" : ")",
      "[" : "]",
      "{" : "}"
    };
    let closeBracket = {
      ")" : "(",
      "]" : "[",
      "}" : "{",
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
  
  
  
  
  check('[{z(/x/(ka"z"ak)x)z}');