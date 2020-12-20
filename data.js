
class Collection {
    constructor(arr) {
        this.arr = [...arr];
      }

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  All @@@@@@@@@@@@@@@@@@@@@@@@@
    all() {
        return this.arr;
    } 
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Average @@@@@@@@@@@@@@@@@@@@@@@@@
    average() {
      return   this.arr.reduce((a, b) => a + b) / this.arr.length;
  } 
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Avg @@@@@@@@@@@@@@@@@@@@@@@@@
    avg() {
        return   this.arr.reduce((a, b) => a + b) / this.arr.length;
    } 
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Chunk @@@@@@@@@@@@@@@@@@@@@@@@@
 chunk(chunk) {
   const newArr = [];
  let i,j,temparray;
  j=this.arr.length
  for (i=0; i<j; i+=chunk) {
      temparray = this.arr.slice(i,i+chunk);
      // do whatever
     newArr.push(temparray);
  }
  return new Collection(newArr);
}   
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Collapse @@@@@@@@@@@@@@@@@@@@@@@@@
collapse() {
  const newArr = [];
     this.arr.map(el1 => {
       el1.map(el2 => {
         newArr.push(el2);
       });
     });
      return new Collection(newArr);
}   
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Collect @@@@@@@@@@@@@@@@@@@@@@@@@
collect() {
  return new Collection(this.arr);
}   
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  Concat @@@@@@@@@@@@@@@@@@@@@@@@@
concat(arg) {
  const concated = this.arr.concat(arg)
  return new Collection(concated);
}   

   // @@@@@@@@@@@@@@@@@@@@@@@@@@  Contains @@@@@@@@@@@@@@@@@@@@@@@@@
  contains(arg) {
      if(typeof arg == 'function'){
  return this.arr.every((el,indx,arr) =>{
  return arg(el,indx,arr);
  })
      }
     else if(typeof arg == 'object'){
      let first;
        let second = arg.every(el=> {
          first = this.arr.includes(el);
           return first;
        })
       return second;
     
                }
      else{
        
        let first;  
        first = this.arr.includes(arg); 
         return first;
      }
    
      };  
   // @@@@@@@@@@@@@@@@@@@@@@@@@@  containsLoose @@@@@@@@@@@@@@@@@@@@@@@@@
  containsLoose (arg) {
    if(typeof arg == 'function'){
return this.arr.some((el,indx,arr) =>{
return arg(el,indx,arr);
})
    }
   else if(typeof arg == 'object'){
    const arrIns = new Collection(this.arr);
    let first;
      let second = arg.every(el=> {
        first = arrIns.includesLoose(el);
        if(first){
return first;
        }
        else if (!(isNaN(el))){
          first = arrIns.includesLoose(parseFloat(el));
          if(first){
            return first;
          }
         else{
              first = arrIns.includesLoose(String(el));
              return first;
            }
              }
              else{  return false }
      })
return second;
   
              }
    else{
      const arrIns = new Collection(this.arr);
      let first;  
      first = arrIns.includesLoose(arg);
      if(first){
return first;
      }
      else if (!(isNaN(arg))){
        first = arrIns.includesLoose(parseFloat(arg));
        if(first){
          return first;
        }
       else{
            first = arrIns.includesLoose(String(arg));
            return first;
          }
            }
            else{  return false }
    }
  
    };  
   // @@@@@@@@@@@@@@@@@@@@@@@@@@  count   @@@@@@@@@@@@@@@@@@@@@@@@@         
   count() {
    return this.arr.length;
    };    
    // eachSpread
    eachSpread(callback) {
        var flattenedArray = [];
        var flatten = function(arg) {
          if (!Array.isArray(arg)) {
            flattenedArray.push(callback(arg));
          } else {
            for (var a in arg) {
              flatten((arg[a]));
            }
          }
        };
    this.arr.forEach(flatten);
    return new Collection(flattenedArray);
    }
    // @@@@@@@@@@@@@@@@@@@@@@ countOccurrences @@@@@@@@@@@@@@@@@@@@@@@@@         
    countOccurrences(val) {
      return  this.arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        };
    // @@@@@@@@@@@@@@@@@@@@@@ countOccurrencesLoose @@@@@@@@@@@@@@@@@@@@@@@@@         
    countOccurrencesLoose(val) {
      return  this.arr.reduce((a, v) => (v == val ? a + 1 : a), 0);
        };
    // @@@@@@@@@@@@@@@@@@@@@@@@@@  diff   @@@@@@@@@@@@@@@@@@@@@@@@@    
    diff(arg) {
      
      if(arg instanceof Collection){

        const diffArr =  this.arr.filter(el => {
          return  !(arg.contains(el)); 
        })
        return new Collection(diffArr);
      }
      else{
const argIns = new Collection(arg)
      const diffArr = this.arr.filter(el => {
         return  !(argIns.contains(el)); 
       })
       return new Collection(diffArr);
      }
      }; 
   // @@@@@@@@@@@@@@@@@@@@@@@@@@  diffLoose   @@@@@@@@@@@@@@@@@@@@@@@@@    
   diffLoose(arg) {
    if(arg instanceof Collection){
      const diffArr =  this.arr.filter(el => {
        return  !(arg.containsLoose(el)); 
      })
      return new Collection(diffArr);
    }
    else{
const argIns = new Collection(arg)
    const diffArr = this.arr.filter(el => {
       return  !(argIns.containsLoose(el)); 
     })
     return new Collection(diffArr);
    }
    };
   // @@@@@@@@@@@@ privet  numTimeRemove for duplicates   @@@@@@@@@@@@@@ 
#numTimeRemove(currarr,el,num,loose) {
  let index;
  while(num--){
    if(loose){
      const currarrIns = new Collection(currarr)
      index = currarrIns.indexOfLoose(el);
    }
    else{
      index = currarr.indexOf(el);
    }
    currarr.splice(index,1)
  }
  }  
   // @@@@@@@@@@@@@@@@@@@@@@@@@  duplicates   @@@@@@@@@@@@@@@@@@@@@@@@@@ 
duplicates() {
const darr = [];
const thisArr = new Collection(this.arr);
let el ,occur, i;
i = thisArr.arr.length;
while(i--){
el = thisArr.arr[i];
occur = thisArr.countOccurrences(thisArr.arr[i])
if(occur > 1 ){
darr.push(thisArr.arr[i]);
this.#numTimeRemove(thisArr.arr,thisArr.arr[i],occur,false);
}
}
return new Collection(darr.reverse());
      };
// @@@@@@@@@@@@@@@@@@@@@@@@@  duplicatesLoose   @@@@@@@@@@@@@@@@@@@@@@@@@@ 
duplicatesLoose() {
  const darr = [];
  const thisArr = new Collection(this.arr);
  let el ,occur, i;
  i = thisArr.arr.length;
  while(i--){
  el = thisArr.arr[i];
  occur = thisArr.countOccurrencesLoose(thisArr.arr[i])
  if(occur > 1 ){
  darr.push(thisArr.arr[i]);
  this.#numTimeRemove(thisArr.arr,thisArr.arr[i],occur,true);
  }
  }
return new Collection(darr.reverse());
        }; 
   // @@@@@@@@@@@@@@@@@@@@@@@@@@  each   @@@@@@@@@@@@@@@@@@@@@@@@@   
   each = function(callback) {
    const newArray = [];
    let length;
    length = this.arr.length;
      for (let i = 0; i < length; i++) {
        newArray.push(callback(this.arr[i],i,this.arr));
      }
      return new Collection(newArray);
    };  
  // @@@@@@@@@@@@@@@@@@@@@@@@@@  eachSpread   @@@@@@@@@@@@@@@@@@@@@@@@@   
  eachSpread = function(callback) {
    const newArray = [];
   let length;
   length = this.arr.length;
for (let i = 0; i < length; i++) {
  for (let j = 0; j < this.arr[i].length; j++) {
  
    newArray.push(callback(this.arr[i][j],[i,j],this.arr,this.arr[i]));
  }
   
  }
  return new Collection(newArray);
};   
// @@@@@@@@@@@@@@@@@@@@@@@@@@  eachSpreadDeep   @@@@@@@@@@@@@@@@@@@@@@@@@   
eachSpreadDeep(callback) {
  const flattenedArray = [];
  const flatten = function(arg) {
    if (!Array.isArray(arg)) {
      flattenedArray.push(callback(arg));
    } else {
      for (var a in arg) {
        flatten(arg[a]);
      }
    }
  };
this.arr.forEach(flatten);
return new Collection(flattenedArray);
};                           
      //   Index Of Loose
      indexOfLoose(arg) {
        let first;  
        const arrLoose = this.arr.map(el => {
          if(isNaN(el)){
return el.toLowerCase();
          }
          return el;
        })
        if(isNaN(arg)){
          arg = arg.toLowerCase();
          } 
        first = arrLoose.indexOf(arg);
        if(first !== -1){
     return first;
        }else if(!(isNaN(arg))){
          first = arrLoose.indexOf(parseFloat(arg));
         if(first !== -1){
           return first;
         }
         else { 
           first = arrLoose.indexOf(String(arg));
           return first;
         }
              }
              else {return -1}
    }  
       //   Includes Loose
       includesLoose(arg) {
        let first;  
        const arrLoose = this.arr.map(el => {
          if(isNaN(el)){
return el.toLowerCase();
          }
          return el;
        })
        if(isNaN(arg)){
          arg = arg.toLowerCase();
          } 
       first = arrLoose.includes(arg);  
       if(first){
         return first
       } 
       else if(!(isNaN(arg))){
        first = arrLoose.includes(parseFloat(arg));
        if(first){
          return first;
        }
        else { 
          first = arrLoose.includes(String(arg));
          return first;
        }
       }
       else{ return first}

    }  

}
const collect = (arr) => {
return new Collection(arr);
}
