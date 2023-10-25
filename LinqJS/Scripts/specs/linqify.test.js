/// <reference path="../linqJs/linqify.js" />

const linqify = require('../linqJs/linqify');

let _items;

beforeEach(function () {
    _items = [1, 2, 3, 4, 5, 6, 7, 8];
});

it("Adds Linq methods to an array", function () {
    
    linqify.linqify(_items);

    expect(_items.where).toBeDefined();
});

it("Removes Linq methods to an array", function () {
    
    linqify.deLinqify(_items);

    expect(_items.where).toBeUndefined();
});
