/// <reference path="../_references.js" />

describe("LinqHelper groupBy", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqHelper();
		items = [
			{ Name: "Foo", Age: 6 },
			{ Name: "Bar", Age: 5 },
			{ Name: "Baz", Age: 6 },
			{ Name: "Qux", Age: 5 },
			{ Name: "Fiz", Age: 5 },
			{ Name: "Pop", Age: 8 }
		];
	});

	it("Groups the elements of a list according to a specified key selector function.", function () {

		var result = helper.groupBy(items, function (o) { return o.Age; });
		var expected = [{ Key: 6, Count: 2 }, { Key: 5, Count: 3 }, { Key: 8, Count: 1 }];

		expect(result).toEqual(expected);
	});

});