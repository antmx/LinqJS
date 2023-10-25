/// <reference path="../_references.js" />

describe("linqCore.where", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		_items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Finds matching items", function () {
		var result = _linqCore.where(
			_items,
			function (i) { return i % 2 == 0; });

		var expected = [2, 4, 6, 8];

		expect(result.length).toEqual(4);
        
        _linqCore.forEach(result, function (indexInArray, valueOfElement) {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
	});

});
