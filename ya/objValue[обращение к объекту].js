// Обращение к свойству объекта
/*
const o = {
  a: {
    b: {},
    c: 42
  },
  z: null
};
(o, 'a.c') => 42
(o, 'a.d') => undefined
(o, 'z') => null
*/

var getValues = function(obj, value){
    let key = value.split('.');
    let localObj = obj;
    for (let i = 0; i < key.length - 1; i++) {
        const _key = key[i];
        if (typeof localObj[_key] == undefined) return undefined;
        localObj = localObj[_key]
    }
    let lastKey = key[key.length-1];
    return localObj[lastKey];
}



const o = {
    a: {
      b: {},
      c: 42,
      'azaza' : [1,2,3]
    },
    z: null
};




console.log(  getValues(o, 'a.c') );
console.log(  getValues(o, 'a.d') );
console.log(  getValues(o, 'z') );
console.log(  getValues(o, 'a.azaza.4') );