/// <reference path="../_references.js" />

describe("LinqCore helloWorld", function () {

	var helper;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();
	});


	it("Displays hello world", function () {

		var result = helper.helloWorld();

		expect(result).toEqual("Hello, World!");
	});
});
