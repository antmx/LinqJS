/// <reference path="../_references.js" />

describe("linqCore each", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Applies lambda to each item", function () {

		var arrayToPopulate = [];

		var result = _linqCore.each(
			items,
            function (i) { arrayToPopulate.push(i * 10); });

		expect(items.length).toEqual(arrayToPopulate.length);

		//var e = helper.getEnumerator(items);

		//while (e.MoveNext()) {
		//	expect(e.Current * 10).toEqual(arrayToPopulate[e.CurrentIdx]);
		//}
        
        _linqCore.forEach(items, function (indexInArray, valueOfElement) {
            
            expect(valueOfElement * 10).toEqual(arrayToPopulate[indexInArray]);
        });
	});

});
