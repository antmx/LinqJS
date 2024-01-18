/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _numbers;

/**
 * @type {linqArray}
 */
let _words;

beforeEach(function () {

    _numbers = new linqArray([1, 2, 3, 4]);

    _words = ["one", "two", "three"];
});

it("Merges two lists by using the specified predicate function.", function () {

    let result = _numbers.zip(
        _words,
        function (first, second) { return first + " " + second; });

    let expected = ["1 one", "2 two", "3 three"];

    expect(result).toEqual(expected);
});
