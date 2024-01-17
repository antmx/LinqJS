/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqifyModule = require('../../Scripts/linqJs/linqify');

let _items = [];

beforeEach(function () {
    _items = [1, 2, 3, 4, 5, 6, 7, 8];
});

it("adds linqJs methods to an array", function () {

    linqifyModule.linqify(_items);

    expect(_items.where).toBeDefined();
    expect(typeof _items.where).toEqual("function");
});

it("can be called directly on an array", function () {

    _items.linqify();

    expect(_items.where).toBeDefined();
    expect(typeof _items.where).toEqual("function");

    let results = _items.where(function (i) { return i < 4 });

    expect(results.length).toEqual(3);
    expect(results[0]).toEqual(1);
    expect(results[1]).toEqual(2);
    expect(results[2]).toEqual(3);
});

it("supports method chaining", function () {

    _items.linqify();

    let firstOver4times10 = _items
        .where((i) => i > 4)
        .select((i) => i * 10)
        .first();

    expect(firstOver4times10).toEqual(50);
});