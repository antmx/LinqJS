/// <reference path="../LinqJS/LinqHelper.js" />
/// <reference path="../../lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper max", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();

		items = [1, 1, 2, 5, 4, 5];
	});

	it("Returns the maximum value in a list", function () {

		var result = helper.max(items);
		var expected = 5;

		expect(result).toEqual(expected);
	});

});
