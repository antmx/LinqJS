/// <reference path="../_references.js" />

describe("LinqCore skipWhile", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();

		items = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
	});

	it("Bypasses elements in a list as long as a specified condition is true and then returns the remaining elements.", function () {

        var result = helper.skipWhile(items, function (o) { return o != "orange"; });
		var expected = ["orange", "passionfruit", "grape"];

		expect(result).toEqual(expected);
	});

	it("Bypasses elements in a list as long as a specified condition is true and then returns the remaining elements, passing each element's index to the predicate function.", function () {

		var result = helper.skipWhile(items, function (o, i) { return i < 4; });
		var expected = ["passionfruit", "grape"];

		expect(result).toEqual(expected);
	});

});
