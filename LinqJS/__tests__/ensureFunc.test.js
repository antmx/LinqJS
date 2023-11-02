/// <reference path="../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../Scripts/linqJs/linq-core');

let _linqCore;

beforeEach(function () {
	_linqCore = new linqCoreModule();
});

test("Function does not throw error", function () {

	expect(function () {

		_linqCore.ensureFunc(
			function () { }
		);

	}).not.toThrow("possibleFunc must be a function");
});

test("Arrow function does not throw error", function () {

	expect(function () {

		_linqCore.ensureFunc(
			() => { }
		);

	}).not.toThrow("possibleFunc must be a function");
});

test("Null does throw error", function () {

	expect(function () {

		_linqCore.ensureFunc(
			null
		);

	}).toThrow("possibleFunc must be a function");
});

test("Object does throw error", function () {

	expect(function () {

		_linqCore.ensureFunc(
			{ a: 1 }
		);

	}).toThrow("possibleFunc must be a function");
});


test("String does throw error", function () {

	expect(function () {

		_linqCore.ensureFunc(
			"foo"
		);

	}).toThrow("possibleFunc must be a function");
});
