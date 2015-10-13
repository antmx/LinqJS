/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper contains", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();

		items = [1, 2, 3];
	});

	it("Returns false when list does not contain value", function () {

		var result = helper.contains(items, 4);

		expect(result).toBeFalsy();
	});

	it("Returns true when list does contain value", function () {

		var result = helper.contains(items, 2);

		expect(result).toBeTruthy();
	});
});
