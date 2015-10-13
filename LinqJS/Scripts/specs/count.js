/// <reference path="../LinqJS/LinqHelper.js" />
/// <reference path="../../lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper count", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();

		items = [1, 2, 3];
	});

	it("Returns correct number of items in list", function () {

		var result = helper.count(items);

		expect(result).toEqual(3);
	});
});
