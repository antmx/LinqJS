/// <reference path="../_references.js" />

describe("LinqCore concat", function () {

	var helper;
	var firstItems;
	var secondItems;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();

		firstItems = [1, 2, 3];
		secondItems = [4, 5, 6];
	});

	it("Combines 2 lists into 1", function () {

		var result = helper.concat(
			firstItems,
			secondItems);

		var expected = [1, 2, 3, 4, 5, 6];

		expect(result.length).toEqual(6);

		//var e = helper.getEnumerator(result);

		//while (e.MoveNext()) {
		//	expect(e.Current).toEqual(expected[e.CurrentIdx]);
		//}

        helper.forEach(result, function (indexInArray, valueOfElement) {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
	});

});
