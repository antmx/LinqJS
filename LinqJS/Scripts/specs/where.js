/// <reference path="../_references.js" />

describe("LinqCore where", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Finds matching items", function () {
		var result = helper.where(
			items,
			function (i) { return i % 2 == 0; });

		var expected = [2, 4, 6, 8];

		expect(result.length).toEqual(4);
        
        helper.forEach(result, function (indexInArray, valueOfElement) {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
	});

});
