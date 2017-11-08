/// <reference path="../_references.js" />

describe("LinqHelper single", function () {

	var helper;

	beforeEach(function () {
		helper = new LinqJS.LinqHelper();
	});

	it("Throws error when list is null", function () {

		expect(function () { helper.single(null) }).toThrow(new Error("Array must not be null"));
	});

	it("Throws error when list is empty", function () {

		expect(function () { helper.single([]) }).toThrow(new Error("Array must contain at least one item"));
	});

	it("Throws error when no match", function () {

		expect(function () {
            helper.single(
                [1, 2, 3],
                function (o) { return o > 4; });
		}).toThrow(new Error("No match found"));
	});

	it("Throws error when more than 1 match", function () {

		expect(function () {
            helper.single(
                [1, 2, 3, 4, 5, 6],
                function (o) { return o > 4; });
		}).toThrow(new Error("More than 1 match found"));
	});

	it("Returns first item", function () {

		expect(helper.single([1])).toEqual(1);
	});

	it("Returns first matching item", function () {

		expect(helper.single(
			[1, 2, 3],
			function (o) { return o > 2; })).toEqual(3);
	});

});
