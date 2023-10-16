/// <reference path="../_references.js" />

describe("linqCore getEnumerator", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		_items = [1, 2, 3];
	});
	
	it("Returns an Enumerator", function () {

		var e = _linqCore.getEnumerator(_items);
		
        expect(e.Current).toBeNull();
	});

	it("Enables enumerating", function () {

		var e = _linqCore.getEnumerator(_items);

		while (e.MoveNext()) {
			expect(e.Current !== null).toBeTruthy();
		}
	});

	it("Enables resetting", function () {

		var e = _linqCore.getEnumerator(_items);

		expect(e.MoveNext()).toBeTruthy();

		expect(e.Current !== null).toBeTruthy();

		e.reset();

		expect(e.CurrentIdx).toEqual(-1);
		expect(e.Current).toBeNull();
	});
});
