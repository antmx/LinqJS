/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;
let _firstItems;
let _secondItems;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_firstItems = [1, 2, 2, 3, 4, 5];
	_secondItems = [1, 3, 5, 7];
});

test("Produces the set difference of two lists", function () {

	let result = _linqCore.except(_firstItems, _secondItems);
	let expected = [2, 4, 7];

	expect(result).toEqual(expected);
});
