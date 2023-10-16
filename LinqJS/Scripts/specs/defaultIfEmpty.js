﻿/// <reference path="../_references.js" />

describe("linqCore defaultIfEmpty", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [1, 2, 3];
	});

	it("Returns default value when list is empty", function () {

		var result = _linqCore.defaultIfEmpty([], 1);
		var expected = [1];

		expect(result.length).toEqual(1);
		expect(result).toEqual(expected);
	});

	it("Returns list when list is not empty", function () {

		var result = _linqCore.defaultIfEmpty(_items, 1);
		var expected = _items;

		expect(result.length).toEqual(3);
		expect(result).toEqual(expected);
	});
});
