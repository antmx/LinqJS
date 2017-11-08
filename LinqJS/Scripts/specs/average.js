﻿/// <reference path="../_references.js" />

describe("LinqHelper average", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqHelper();
		items = [2, 4, 6, 8];
	});

	it("Calculates the average of the items", function () {

		var result = helper.average(items);

		var expected = 5;

		expect(expected).toEqual(result);
	});

});
