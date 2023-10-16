/// <reference path="../_references.js" />

describe("linqCore zip", function () {

    var _linqCore;
    var numbers;
    var words;

    beforeEach(function () {

        _linqCore = new linqJs.linqCore();

        numbers = [1, 2, 3, 4];

        words = ["one", "two", "three"];
    });

    it("Merges two lists by using the specified predicate function.", function () {

        var result = _linqCore.zip(
            numbers,
            words,
            function (first, second) { return first + " " + second; });

        var expected = ["1 one", "2 two", "3 three"];

        expect(result).toEqual(expected);
    });

});
