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


  
  var pushStack = function(char){}
  var popStack = function(char){}


  for (let i = 0; i < string.length; i++) {
    const element = string[i];

    console.llog(element);
  }


  console.log(string);



}



check('{z(/x/(ka"z"ak)x)z}');