let obj = {};
function groupAnagram (arr){
    arr.forEach(element => {
        if (typeof(element)==="string"){
            let sorted = element.split("").sort().join("");
            Object.keys(obj).includes(sorted) ? obj[sorted].push(element) :  obj[sorted] = [element];
        }
        console.log( Object.values(obj))
        return Object.values(obj);
    });

}

const arr = ['cat', 'act', 'bat'];
groupAnagram(arr);