
// Создать функцию, для проверки анаграмыы

let isAnagram = function(str1, str2){
    if(str1.length !== str2.length) return false;
    str1 = str1.toLowerCase();
    str1 = str1.split("").sort();
    str2 = str2.toLowerCase();
    str2 = str2.split("").sort();
    for (let i = 0; i < str1.length; i++) {
        if( str1[i] !== str1[i]) return false;
    }
    return true;
}