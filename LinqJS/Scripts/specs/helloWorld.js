/// <reference path="../_references.js" />

describe("LinqHelper helloWorld", function () {

	var helper;

	beforeEach(function () {
		helper = new LinqJS.LinqHelper();
	});


	it("Displays hello world", function () {

		var result = helper.helloWorld();

		expect(result).toEqual("Hello, World!");
	});
});
