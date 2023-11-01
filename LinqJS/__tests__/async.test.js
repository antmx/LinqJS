
test("Tests async function with await", async function () {

    let result = await asyncFunc();

    expect(result).toEqual(true);
});

test("Tests async function with then", async function () {

    return await asyncFunc().then(function(result){
        expect(result).toEqual(true);
    });
});

async function asyncFunc() {

    return new Promise(function (resolve, reject) {

        setTimeout(
            function () { 
                resolve(true); },
            100);
    });
}
