/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

beforeEach(function () {
    _items = new linqArray([
        { Name: "Foo", Age: 6 },
        { Name: "Bar", Age: 5 },
        { Name: "Baz", Age: 6 },
        { Name: "Qux", Age: 5 },
        { Name: "Fiz", Age: 5 },
        { Name: "Pop", Age: 8 }
    ]);
});

it("Groups the elements of a list according to a specified key selector function.", function () {

    let result = _items.groupBy(function (o) { return o.Age; });

    let expected = [
        { Key: 6, Items: [{ Name: "Foo", Age: 6 }, { Name: "Baz", Age: 6 }] },
        { Key: 5, Items: [{ Name: "Bar", Age: 5 }, { Name: "Qux", Age: 5 }, { Name: "Fiz", Age: 5 }] },
        { Key: 8, Items: [{ Name: "Pop", Age: 8 }] }
    ];

    expect(result).toEqual(expected);
});
