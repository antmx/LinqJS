/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper aggregate", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Combines the result of applying the lambda to each item", function () {

		var aggregateResult = helper.aggregate(
			items,
			function (result, current) {
				if (current % 2 == 0)
					return result + current;
				else
					return result;
			});

		var expected = 2 + 4 + 6 + 8;

		expect(expected).toEqual(aggregateResult);
	});

});
