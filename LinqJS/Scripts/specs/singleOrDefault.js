/// <reference path="../_references.js" />



	var _linqCore;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
	});

	test("Throws error when list is null", function () {

		expect(function () { _linqCore.singleOrDefault(null) }).toThrow(new Error("Array must not be null"));
	});
	
	test("Returns non-null default value when no match", function () {
		
		expect(_linqCore.singleOrDefault(
			[1, 2, 3],
			function (o) { return o > 4; },
			0)
		).toEqual(0);
	});

	test("Returns null default value when no match", function () {

		expect(_linqCore.singleOrDefault(
			[1, 2, 3],
			function (o) { return o > 4; },
			null)
		).toEqual(null);
	});

	test("Throws error when more than 1 match", function () {

		expect(function () {
			_linqCore.singleOrDefault(
				[1, 2, 3, 4, 5, 6],
				function (o) { return o > 4; },
				null)
		}).toThrow(new Error("More than 1 match found"));
	});

	test("Returns first item", function () {

		expect(_linqCore.singleOrDefault([1], null, 0)).toEqual(1);
	});

	test("Returns first matching item", function () {

		expect(_linqCore.singleOrDefault(
			[1, 2, 3],
			function (o) { return o > 2; },
			0)).toEqual(3);
	});
