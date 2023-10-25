/// <reference path="../_references.js" />



	var _linqCore;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
	});

	test("Throws error when list is null", function () {

		expect(function () { _linqCore.single(null) }).toThrow(new Error("Array must not be null"));
	});

	test("Throws error when list is empty", function () {

		expect(function () { _linqCore.single([]) }).toThrow(new Error("Array must contain at least one item"));
	});

	test("Throws error when no match", function () {

		expect(function () {
            _linqCore.single(
                [1, 2, 3],
                function (o) { return o > 4; });
		}).toThrow(new Error("No match found"));
	});

	test("Throws error when more than 1 match", function () {

		expect(function () {
            _linqCore.single(
                [1, 2, 3, 4, 5, 6],
                function (o) { return o > 4; });
		}).toThrow(new Error("More than 1 match found"));
	});

	test("Returns first item", function () {

		expect(_linqCore.single([1])).toEqual(1);
	});

	test("Returns first matching item", function () {

		expect(_linqCore.single(
			[1, 2, 3],
			function (o) { return o > 2; })).toEqual(3);
	});
