
let arr1 = new linqArray();
arr1[0] = "foo";
arr1[1] = "bar";
arr1[2] = "baz";

let result1 = arr1.where((itm) => itm.endsWith("z"));

console.log(...result1);



let arr2 = new linqArray(["foo", "bar", "baz"]);
//let arr2 = new linqArray(null);

let result2 = arr2.where((itm) => itm.endsWith("z"));

console.log(...result2);



let arr3 = new linqArray(["foo", "bar", "baz"]);

let result3 = arr3.where((itm) => itm.endsWith("z")).first();

console.log(result3);



let arr4 = new linqArray(["foo", "bar", "baz"]);

let result4 = arr4
    .where((itm) => itm.indexOf("a") > -1)
    .first();

console.log(result4);



let arr5 = new linqArray(["foo", "bar", "baz"]);

let result5 = arr5
    .first((itm) => itm.startsWith("b"));

console.log(result5);