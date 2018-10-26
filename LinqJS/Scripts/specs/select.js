/// <reference path="../_references.js" />

describe("LinqCore select", function () {

    var helper;
    var items;

    beforeEach(function () {
        helper = new LinqJS.LinqCore();

        items = [
            { Name: "One", Number: 1 },
            { Name: "Two", Number: 2 },
            { Name: "Three", Number: 3 },
            { Name: "Four", Number: 4 }
        ];
    });

    it("Projects each item into a new form", function () {

        var result = helper.select(
            items,
            function (o) { return o.Name; });

        var expected = ["One", "Two", "Three", "Four"];

        expect(result.length).toEqual(4);

        helper.forEach(result, function (indexInArray, valueOfElement) {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
    });

});