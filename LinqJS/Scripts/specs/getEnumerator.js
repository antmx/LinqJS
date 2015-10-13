﻿/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

describe("LinqHelper getEnumerator", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3];
	});
	
	it("Returns an Enumerator", function () {

		var e = helper.getEnumerator(items);
		
		expect(e.Current).toBeNull()
	});

	it("Enables enumerating", function () {

		var e = helper.getEnumerator(items);

		while (e.MoveNext()) {
			expect(e.Current !== null).toBeTruthy();
		}
	});

	it("Enables resetting", function () {

		var e = helper.getEnumerator(items);

		expect(e.MoveNext()).toBeTruthy();

		expect(e.Current !== null).toBeTruthy();

		e.reset();

		expect(e.CurrentIdx).toEqual(-1);
		expect(e.Current).toBeNull();
	});
});