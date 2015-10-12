/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper where", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Finds", function () {
		var result = helper.where(
			items,
			function (i) { return i % 2 == 0; });

		expect(result).toEqual(2, 4, 6, 8);
	});

});
