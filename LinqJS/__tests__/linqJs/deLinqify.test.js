/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqifyModule = require('../../Scripts/linqJs/linqify');

let _items;

beforeEach(function () {
    _items = [1, 2, 3, 4, 5, 6, 7, 8];
});

it("removes Linq methods from an array", function () {

    linqifyModule.linqify(_items);

    expect(_items.where).toBeDefined();

    linqifyModule.deLinqify(_items);

    expect(_items.where).toBeUndefined();
});

it("can be called directly from an array", function () {

    linqifyModule.linqify(_items);

    expect(_items.where).toBeDefined();

    _items.deLinqify();

    expect(_items.where).toBeUndefined();
});
