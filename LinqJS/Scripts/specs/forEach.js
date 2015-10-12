/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper forEach", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Applies lambda to each item", function () {

		var arrayToPopulate = [];

		var result = helper.forEach(
			items,
			function (i) { arrayToPopulate.push(i * 10) });

		expect(items.length).toEqual(arrayToPopulate.length);

		var e = helper.getEnumerator(items);

		while (e.MoveNext()) {
			expect(e.Current * 10).toEqual(arrayToPopulate[e.CurrentIdx]);
		}
	});

});
