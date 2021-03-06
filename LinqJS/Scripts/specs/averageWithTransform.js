﻿/// <reference path="../_references.js" />

describe("LinqCore averageWithTransform", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();
		items = [2, 4, 6, 8];
	});

	it("Calculates the average of the items after transforming each", function () {

		var result = helper.averageWithTransform(
			items,
			function (i) { return i * 10; });

		var expected = 50;

		expect(expected).toEqual(result);
	});

});
