/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;
let _items;

beforeEach(function () {
	_linqCore = new linqCoreModule();
	_items = [1, 2, 3];
});

test("Returns an Enumerator", function () {

	let e = _linqCore.getEnumerator(_items);

	expect(e.Current).toBeNull();
});

test("Enables enumerating", function () {

	let e = _linqCore.getEnumerator(_items);

	while (e.MoveNext()) {
		expect(e.Current !== null).toBeTruthy();
	}
});

test("Enables resetting", function () {

	let e = _linqCore.getEnumerator(_items);

	expect(e.MoveNext()).toBeTruthy();

	expect(e.Current !== null).toBeTruthy();

	e.reset();

	expect(e.CurrentIdx).toEqual(-1);
	expect(e.Current).toBeNull();
});
