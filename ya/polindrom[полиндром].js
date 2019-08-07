var str = 'Уж истово вот - сижу';
function polindromChek(str){
	str = str.toLowerCase();
	var symbols = str.match(/[a-za-я0-9]/gi);
	var isPolindrom = true;
	for (var i = 0; i < symbols.length/2; i++) {
			if( symbols[i] != symbols[symbols.length-1-i] ) {
				isPolindrom = false;
				break;
			}
	}
	return isPolindrom;
}

//Если без pregMatch
function polindromChek2(str){
    str = str.toLowerCase();
    var dectonary = "qwertyuiopasdfghjklzxcvbnmйцукенгшщзхъфывапролджэячсмитьбю";
    var symbols = [];
    for (let i = 0; i < str.length; i++) {
       if( dectonary.indexOf(str[i]) > -1 ) symbols.push(str[i]);
    }
    if(symbols.length <= 0 )  return false;
    for (let i = 0; i < symbols.length/2 + 1; i++) {
        if( symbols[i] != symbols[symbols.length-1-i] ) {
            return false; // Не является полиндромом
        }
    }
    return true;
}

console.log( polindromChek(str) );
console.log( polindromChek2(str) );