/// <reference path="../_references.js" />

describe("linqCore isArray", function () {

	var _linqCore;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
	});

	it("Confirms an empty array", function () {

		var result = _linqCore.isArray([])

		expect(result).toEqual(true);
	});

	it("Confirms a non-empty array", function () {

		var result = _linqCore.isArray([1, 2, 3]);

		expect(result).toEqual(true);
	});

	it("Confirms a non-empty array of arrays", function () {

		var result = _linqCore.isArray([[1, 2, 3], 2, 3]);

		expect(result).toEqual(true);
	});

	it("Confirms a string is not an array", function () {

		var result = _linqCore.isArray("foo");

		expect(result).toEqual(false);
	});

	it("Confirms an object is not an array", function () {

		var result = _linqCore.isArray({ foo: "bar", baz: [] });

		expect(result).toEqual(false);
	});

	it("Confirms a number is not an array", function () {

		var result = _linqCore.isArray(123);

		expect(result).toEqual(false);
	});

	it("Confirms null is not an array", function () {

		expect(function () {
			_linqCore.isArray(null);
		}).toThrowError("obj must not be null");
	});

	it("Confirms undefined is not an array", function () {

		expect(function () {
			_linqCore.isArray(undefined);
		}).toThrowError("obj must not be null");
	});
});
