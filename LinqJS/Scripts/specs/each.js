﻿/// <reference path="_references.js" />

describe("LinqHelper each", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Applies lambda to each item", function () {

		var arrayToPopulate = [];

		var result = helper.each(
			items,
			function (i) { arrayToPopulate.push(i * 10) });

		expect(items.length).toEqual(arrayToPopulate.length);

		var e = helper.getEnumerator(items);

		while (e.MoveNext()) {
			expect(e.Current * 10).toEqual(arrayToPopulate[e.CurrentIdx]);
		}
	});

});