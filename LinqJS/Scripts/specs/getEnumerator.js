/// <reference path="../_references.js" />

describe("linqCore getEnumerator", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		items = [1, 2, 3];
	});
	
	it("Returns an Enumerator", function () {

		var e = _linqCore.getEnumerator(items);
		
        expect(e.Current).toBeNull();
	});

	it("Enables enumerating", function () {

		var e = _linqCore.getEnumerator(items);

		while (e.MoveNext()) {
			expect(e.Current !== null).toBeTruthy();
		}
	});

	it("Enables resetting", function () {

		var e = _linqCore.getEnumerator(items);

		expect(e.MoveNext()).toBeTruthy();

		expect(e.Current !== null).toBeTruthy();

		e.reset();

		expect(e.CurrentIdx).toEqual(-1);
		expect(e.Current).toBeNull();
	});
});
