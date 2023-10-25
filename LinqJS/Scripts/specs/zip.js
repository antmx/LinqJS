/// <reference path="../_references.js" />



    var _linqCore;
    var _numbers;
    var _words;

    beforeEach(function () {

        _linqCore = new linqJs.linqCore();

        _numbers = [1, 2, 3, 4];

        _words = ["one", "two", "three"];
    });

    it("Merges two lists by using the specified predicate function.", function () {

        var result = _linqCore.zip(
            _numbers,
            _words,
            function (first, second) { return first + " " + second; });

        var expected = ["1 one", "2 two", "3 three"];

        expect(result).toEqual(expected);
    });
