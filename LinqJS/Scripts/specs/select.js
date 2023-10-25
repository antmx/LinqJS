/// <reference path="../_references.js" />



    var _linqCore;
    var _items;

    beforeEach(function () {
        _linqCore = new linqJs.linqCore();

        _items = [
            { Name: "One", Number: 1 },
            { Name: "Two", Number: 2 },
            { Name: "Three", Number: 3 },
            { Name: "Four", Number: 4 }
        ];
    });

    it("Projects each item into a new form", function () {

        var result = _linqCore.select(
            _items,
            function (o) { return o.Name; });

        var expected = ["One", "Two", "Three", "Four"];

        expect(result.length).toEqual(4);

        _linqCore.forEach(result, function (indexInArray, valueOfElement) {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
    });
