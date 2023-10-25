﻿/// <reference path="../_references.js" />



	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		_items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	test("Returns first item", function () {
		var result = _linqCore.first(
			_items);

		var expected = 1;

		expect(result).toEqual(expected);
	});

	test("Returns first matching item", function () {
		var result = _linqCore.first(
			_items,
			function (i) { return i > 3 });

		var expected = 4;

		expect(result).toEqual(expected);
	});
