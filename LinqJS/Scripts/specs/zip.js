/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _numbers;
let _words;

beforeEach(function () {

    _linqCore = new linqCoreModule();

    _numbers = [1, 2, 3, 4];

    _words = ["one", "two", "three"];
});

it("Merges two lists by using the specified predicate function.", function () {

    let result = _linqCore.zip(
        _numbers,
        _words,
        function (first, second) { return first + " " + second; });

    let expected = ["1 one", "2 two", "3 three"];

    expect(result).toEqual(expected);
});
