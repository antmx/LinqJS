﻿/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper select", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();

		items = [
			 { Name: "One", Number: 1 },
			 { Name: "Two", Number: 2 },
			 { Name: "Three", Number: 3 },
			 { Name: "Four", Number: 4 }
		];
	});

	it("Projects each item into a new form", function () {

		var result = helper.select(
			items,
			function (o) { return o.Name; });

		var expected = ["One", "Two", "Three", "Four"];

		expect(result.length).toEqual(4);

		var e = helper.getEnumerator(result);

		while (e.MoveNext()) {
			expect(e.Current).toEqual(expected[e.CurrentIdx]);
		}
	});

});