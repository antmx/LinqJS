/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {

    _items = new linqArray([
        { Name: "One", Number: 1 },
        { Name: "Two", Number: 2 },
        { Name: "Three", Number: 3 },
        { Name: "Four", Number: 4 }
    ]);
});

it("Projects each item into a new form", function () {

    let result = _items.select(
        function (o) { return o.Name; });

    let expected = ["One", "Two", "Three", "Four"];

    expect(result.length).toEqual(4);

    result.forEachItem(function (indexInArray, valueOfElement) {

        expect(valueOfElement).toEqual(expected[indexInArray]);
    });
});
