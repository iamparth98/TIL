function groupAnagrams(arr){
    let res = {};
    for (let string of arr){
        let counter = new Array(26).fill(0);
        for (let char of string){
            counter[char.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
        }
        const key = counter.join("");
        Object.keys(res).includes(key) ? res[key].push(string) : res[key] = [string];
        
    }
    console.log(Object.values(res))
    return Object.values(res);
}

let arr = ["act","pots","tops","cat","stop","hat"];
groupAnagrams(arr);