/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper aggregateWithSeed", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Combines the result of applying the lambda to each item", function () {

		var seed = 10;

		var aggregateResult = helper.aggregateWithSeed(
			items,
			function (result, current) {
				if (current % 2 == 0)
					return result + current;
				else
					return result;
			},
			seed);

		var expected = 2 + 4 + 6 + 8 + seed;

		expect(expected).toEqual(aggregateResult);
	});

});
