/// <reference path="../_references.js" />

describe("linqCore take", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		items = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];
	});

	it("Returns a specified number of contiguous elements from the start of a list - count == -1.", function () {

		var result = _linqCore.take(items, -1);
		var expected = [];

		expect(result).toEqual(expected);
	});

	it("Returns a specified number of contiguous elements from the start of a list - count == 0.", function () {

		var result = _linqCore.take(items, 0);
		var expected = [];

		expect(result).toEqual(expected);
	});

	it("Returns a specified number of contiguous elements from the start of a list - count == 1.", function () {

		var result = _linqCore.take(items, 1);
		var expected = ["Foo"];

		expect(result).toEqual(expected);
	});

	it("Returns a specified number of contiguous elements from the start of a list - count > list length.", function () {

		var result = _linqCore.take(items, 100);
		var expected = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];

		expect(result).toEqual(expected);
	});

});