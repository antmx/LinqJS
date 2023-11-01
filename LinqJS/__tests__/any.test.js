/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(() => {
    _linqCore = new linqCoreModule();
    _items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test('returns true when there are any items', () => {
    
    let result = _linqCore.any(
        _items);

    expect(result).toBeTruthy();
});

test("Returns true when there are matching items", function () {
    let result = _linqCore.any(
        _items,
        function (i) { return i % 3 == 0; });

    expect(result).toBeTruthy();
});

test("Returns false when there are no matching items", function () {
    let result = _linqCore.any(
        _items,
        function (i) { return i > 100; });

    expect(result).toBeFalsy();
});

test("Returns false when there are no items", function () {
    let result = _linqCore.any(
        []);

    expect(result).toBeFalsy();
});
