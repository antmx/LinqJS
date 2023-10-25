/// <reference path="../_references.js" />

describe("linqCore.helloWorld", function () {

	var _linqCore;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
	});

	it("Displays hello world", function () {

		var result = _linqCore.helloWorld();

		expect(result).toEqual("Hello, World!");
	});
});
