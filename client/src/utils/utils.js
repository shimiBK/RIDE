
//check if a string contains numbers
export function hasNumber(myString){
    return /\d/.test(myString);
}


// make title by the query 

export function getTitle(ename) {
    return ename && hasNumber(ename) ? "YOU" 
    : ename ? ename.replaceAll("-"," ").toUpperCase()  
    : "ALL EVENTS" 
}

export function convertTitle(title){
    if(title){
        const words =  title.replaceAll("-"," ").split(" ");

         return words.map((word) => { 
            return word[0].toUpperCase() + word.substring(1); 
        }).join(" ");     

    }

    return "";
   
}