/// <reference path="../_references.js" />

describe("linqCore.singleOrDefault", function () {

	var _linqCore;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
	});

	it("Throws error when list is null", function () {

		expect(function () { _linqCore.singleOrDefault(null) }).toThrow(new Error("Array must not be null"));
	});

	//it("Throws error when list is empty", function () {

	//	expect(
	//		function () {
	//			debugger;
	//			helper.singleOrDefault([])
	//		}).toThrow(new Error("Array must contain at least one item"));
	//});

	it("Returns non-null default value when no match", function () {
		
		expect(_linqCore.singleOrDefault(
			[1, 2, 3],
			function (o) { return o > 4; },
			0)
		).toEqual(0);
	});

	it("Returns null default value when no match", function () {

		expect(_linqCore.singleOrDefault(
			[1, 2, 3],
			function (o) { return o > 4; },
			null)
		).toEqual(null);
	});

	it("Throws error when more than 1 match", function () {

		expect(function () {
			_linqCore.singleOrDefault(
				[1, 2, 3, 4, 5, 6],
				function (o) { return o > 4; },
				null)
		}).toThrow(new Error("More than 1 match found"));
	});

	it("Returns first item", function () {

		expect(_linqCore.singleOrDefault([1], null, 0)).toEqual(1);
	});

	it("Returns first matching item", function () {

		expect(_linqCore.singleOrDefault(
			[1, 2, 3],
			function (o) { return o > 2; },
			0)).toEqual(3);
	});

});
