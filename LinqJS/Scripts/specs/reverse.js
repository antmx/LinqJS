/// <reference path="../_references.js" />

describe("LinqCore reverse", function () {

	var helper;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();
	});

	it("Throws error when list is null", function () {

        expect(function () { helper.reverse(null); }).toThrow(new Error("Array must not be null"));
	});

	it("Returns empty list when when list is empty", function () {

		var result = helper.reverse([]);

		var expected = [];

		expect(result).toEqual(expected);
	});

	it("Returns list reversed", function () {

		var result = helper.reverse(['a', 1, 'b', 2, 'c', 3]);

		var expected = [3, 'c', 2, 'b', 1, 'a'];

		expect(result).toEqual(expected);
	});

});
