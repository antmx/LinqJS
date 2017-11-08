/// <reference path="../_references.js" />

describe("LinqHelper select", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqHelper();

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

		//var e = helper.getEnumerator(result);

		//while (e.MoveNext()) {
		//	expect(e.Current).toEqual(expected[e.CurrentIdx]);
		//}

        helper.forEach(result, function (indexInArray, valueOfElement) {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
	});

});
