/// <reference path="../_references.js" />

describe("LinqCore setValue", function () {

	var helper;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();
	});

	it("Sets the specified element in the current Array to the specified value - 1D", function () {

		var items = [];
		helper.setValue(items, "three", 3);
		//var result = helper.GetValue(3);
		var result = items[3];
		var expected = "three";

		expect(result).toEqual(expected);
	});

	it("Sets the specified element in the current Array to the specified value - 2D", function () {

		var items = [["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"]]; // 2D array
		helper.setValue(items, "three,one", [3,1]);
		//var result = helper.GetValue(3);
		var result = items[3][1];
		var expected = "three,one";

		expect(result).toEqual(expected);
	});

});
