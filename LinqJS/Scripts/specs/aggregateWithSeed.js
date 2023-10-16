/// <reference path="../_references.js" />

describe("linqCore aggregateWithSeed", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		_items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Combines the result of applying the lambda to each item", function () {

		var seed = 10;

		var aggregateResult = _linqCore.aggregateWithSeed(
			_items,
			function (result, current) {
				if (current % 2 == 0)
					return result + current;
				else
					return result;
			},
			seed);

		var expected = 2 + 4 + 6 + 8 + seed;

		expect(expected).toEqual(aggregateResult);
	});

});
