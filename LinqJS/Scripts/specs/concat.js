/// <reference path="../_references.js" />

describe("linqCore.concat", function () {

	var _linqCore;
	var _firstItems;
	var _secondItems;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_firstItems = [1, 2, 3];
		_secondItems = [4, 5, 6];
	});

	it("Combines 2 lists into 1", function () {

		var result = _linqCore.concat(
			_firstItems,
			_secondItems);

		var expected = [1, 2, 3, 4, 5, 6];

		expect(result.length).toEqual(6);

		//var e = helper.getEnumerator(result);

		//while (e.MoveNext()) {
		//	expect(e.Current).toEqual(expected[e.CurrentIdx]);
		//}

        _linqCore.forEach(result, function (indexInArray, valueOfElement) {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
	});

});
