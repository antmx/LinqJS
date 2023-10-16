/// <reference path="../_references.js" />

describe("linqCore last", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		_items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns last item", function () {
		var result = _linqCore.last(
			_items);

		var expected = 8;

		expect(result).toEqual(expected);
	});

	it("Returns last matching item", function () {
        var result = _linqCore.last(
            _items,
            function (i) { return i < 7; });

		var expected = 6;

		expect(result).toEqual(expected);
	});

});
