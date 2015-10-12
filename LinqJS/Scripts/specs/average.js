/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper average", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [2, 4, 6, 8];
	});

	it("Calculates the average of the items", function () {

		var result = helper.average(items);

		var expected = 5;

		expect(expected).toEqual(result);
	});

});
