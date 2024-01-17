

test("Tests async function with then", function () {

    return asyncFunc().then(function (result) {
        expect(result).toEqual(true);
    });
});

test("Tests async function with await", async function () {

    let result = await asyncFunc();

    expect(result).toEqual(true);
});

test("Tests async function with await and timeout", async function () {

    let result = await asyncFunc(6000);

    expect(result).toEqual(true);
}, 10_000);

async function asyncFunc(timeout) {

    timeout = timeout || 1000;

    return new Promise(function (resolve, reject) {

        setTimeout(
            function () { resolve(true); },
            timeout);
    });
}
