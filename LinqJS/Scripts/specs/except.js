/// <reference path="../LinqJS/LinqHelper.js" />
/// <reference path="../../lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper except", function () {

	var helper;
	var firstItems;
	var secondItems;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();

		firstItems = [1, 2, 2, 3, 4, 5];
		secondItems = [1, 3, 5, 7];
	});

	it("Produces the set difference of two lists", function () {

		var result = helper.except(firstItems, secondItems);
		var expected = [2, 4, 7];

		expect(result).toEqual(expected);
	});

});
