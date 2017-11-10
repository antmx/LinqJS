/// <reference path="../_references.js" />

describe("LinqCore firstOrDefault", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns first item", function () {
		var result = helper.firstOrDefault(
			items);

		var expected = 1;

		expect(result).toEqual(expected);
	});

    it("Returns first matching item", function () {
        var result = helper.firstOrDefault(
            items,
            function (i) { return i > 3; });

        var expected = 4;

        expect(result).toEqual(expected);
    });

	it("Returns default item", function () {
		var result = helper.firstOrDefault(
			items,
            function (i) { return i > 10; },
			-1);

		var expected = -1;

		expect(result).toEqual(expected);
	});

});
