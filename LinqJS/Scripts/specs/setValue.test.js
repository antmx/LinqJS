/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;

beforeEach(function () {
	_linqCore = new linqCoreModule();
});

test("Sets the specified element in the current Array to the specified value - 1D", function () {

	let items = [];
	_linqCore.setValue(items, "three", 3);
	//let result = helper.GetValue(3);
	let result = items[3];
	let expected = "three";

	expect(result).toEqual(expected);
});

test("Sets the specified element in the current Array to the specified value - 2D", function () {

	let items = [["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"]]; // 2D array
	_linqCore.setValue(items, "three,one", [3, 1]);
	//let result = helper.GetValue(3);
	let result = items[3][1];
	let expected = "three,one";

	expect(result).toEqual(expected);
});
