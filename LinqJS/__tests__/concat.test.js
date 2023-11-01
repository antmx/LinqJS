/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;
let _firstItems;
let _secondItems;

beforeEach(function () {
	_linqCore = new linqCoreModule();

	_firstItems = [1, 2, 3];
	_secondItems = [4, 5, 6];
});

test("Combines 2 lists into 1", function () {

	let result = _linqCore.concat(
		_firstItems,
		_secondItems);

	let expected = [1, 2, 3, 4, 5, 6];

	expect(result.length).toEqual(6);

	_linqCore.forEach(result, function (indexInArray, valueOfElement) {

		expect(valueOfElement).toEqual(expected[indexInArray]);
	});
});
