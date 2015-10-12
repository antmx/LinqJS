/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />

//describe("LinqHelper Where", function () {
//	it("Finds odd numbers", function () {
//		//expect(helloWorld()).toEqual("Hello world!");


//	});
//});

describe("LinqHelper helloWorld", function () {

	var helper;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
	});


	it("Displays hello world", function () {

		var result = helper.helloWorld();

		expect(result).toEqual("Hello, World!");
	});
});
