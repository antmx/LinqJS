/// <reference path="../_references.js" />



	var _linqCore;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
	});

	test("Throws error when list is null", function () {

        expect(function () { _linqCore.reverse(null); }).toThrow(new Error("Array must not be null"));
	});

	test("Returns empty list when when list is empty", function () {

		var result = _linqCore.reverse([]);

		var expected = [];

		expect(result).toEqual(expected);
	});

	test("Returns list reversed", function () {

		var result = _linqCore.reverse(['a', 1, 'b', 2, 'c', 3]);

		var expected = [3, 'c', 2, 'b', 1, 'a'];

		expect(result).toEqual(expected);
	});
