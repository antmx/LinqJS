/// <reference path="../linqjs/linq-all.js" />

describe("linqCore aggregate", function () {

	var _linqCore;
	var _items;

    beforeEach(function () {

		_linqCore = new linqJs.linqCore();
		_items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Combines the result of applying the lambda to each item", function () {

		var aggregateResult = _linqCore.aggregate(
			_items,
			function (result, current) {
				if (current % 2 === 0)
					return result + current;
				else
					return result;
			});

		var expected = 2 + 4 + 6 + 8;

		expect(expected).toEqual(aggregateResult);
    });

    it("Combines the result of applying the lambda to each item", function () {

        var chars = ["a", "b", "c", "d"];

        var aggregateResult = _linqCore.aggregate(
            chars,
            function (result, current) {
                //return result + ',' + current;
                return result !== null ? result + ',' + current : current;
            });
        
        var expected = "a,b,c,d";

        expect(expected).toEqual(aggregateResult);
    });

});
