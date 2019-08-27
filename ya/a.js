function getPINs(observed) {
    // TODO: This is your job, detective!
    
    let key = {
      1: [1,4,4],
      2: [1,3,5,2],
      3: [2,6,3],
      4: [1,5,7,4],
      5: [2,4,6,8,5],
      6: [3,5,9,6],
      7: [4,8,7],
      8: [5,7,9,0,8],
      9: [6,8,9],
      0: [0,8],
    }
    
    var input=observed.split("");
    
    
    
    var limit = input.map(function(element){
            return key[element].length-1;
    });
    var bin = input.map(function(){ return 0});

    
    function add(bin, limit, i = 0) {
        if (i >= bin.length) { return null; }
        if ( bin[i] + 1 <= limit[i]  ) {
            bin[i] = bin[i] + 1;
            return bin;
        }else{
            bin[i] = 0;
            i++;
            return add(bin, limit ,i);
        }
    }



    var result = [];

    var comb = "";
    bin.forEach( (e,i) => {
        comb = comb + key[input[i]][e];
    });
    result.push(comb)

    while( arr = add(bin,limit) ){
        
        var comb = "";
        arr.forEach( (e,i) => {
            comb = comb + key[input[i]][e];
        });
        result.push(comb)
    }



    function unique(arr) {
        let result = [];
      
        for (let str of arr) {
          if (!result.includes(str)) {
            result.push(str);
          }
        }
      
        return result;
      }



return unique(result);

}



//"369": ["339","366","399","658","636","258","268","669","668","266","369","398","256","296","259","368","638","396","238","356","659","639","666","359","336","299","338","696","269","358","656","698","699","298","236","239"]


console.log( getPINs("11") );