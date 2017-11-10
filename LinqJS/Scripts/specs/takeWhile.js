/// <reference path="../_references.js" />

describe("LinqCore takeWhile", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();

		items = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
	});

	it("Returns elements from a list as long as a specified condition is true.", function () {

		var result = helper.takeWhile(items, function (o) { return o != "orange" });
		var expected = ["apple", "banana", "mango"];

		expect(result).toEqual(expected);
	});

	it("Returns elements from a list as long as a specified condition is true, passing the each item's index to the predicate function.", function () {

		var result = helper.takeWhile(items, function (o, i) { return i < 4; });
		var expected = ["apple", "banana", "mango", "orange"];

		expect(result).toEqual(expected);
	});

});
