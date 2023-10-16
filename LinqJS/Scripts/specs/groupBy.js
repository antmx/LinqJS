/// <reference path="../_references.js" />

describe("linqCore groupBy", function () {

    var _linqCore;
    var items;

    beforeEach(function () {
        _linqCore = new linqJs.linqCore();
        items = [
            { Name: "Foo", Age: 6 },
            { Name: "Bar", Age: 5 },
            { Name: "Baz", Age: 6 },
            { Name: "Qux", Age: 5 },
            { Name: "Fiz", Age: 5 },
            { Name: "Pop", Age: 8 }
        ];
    });

    it("Groups the elements of a list according to a specified key selector function.", function () {

        var result = _linqCore.groupBy(items, function (o) { return o.Age; });

        var expected = [
            { Key: 6, Items: [{ Name: "Foo", Age: 6 }, { Name: "Baz", Age: 6 }] },
            { Key: 5, Items: [{ Name: "Bar", Age: 5 }, { Name: "Qux", Age: 5 }, { Name: "Fiz", Age: 5 }] },
            { Key: 8, Items: [{ Name: "Pop", Age: 8 }] }
        ];

        expect(result).toEqual(expected);
    });

});