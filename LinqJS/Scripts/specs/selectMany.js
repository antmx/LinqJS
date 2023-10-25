/// <reference path="../_references.js" />



	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		_items = [{ Name: "Higa, Sidney", Pets: ["Scruffy", "Sam"] },
					{ Name: "Ashkenazi, Ronen", Pets: ["Walker", "Sugar"] },
					{ Name: "Price, Vernette", Pets: ["Scratches", "Diesel"] }];
	});

	test("Projects each item to a new list and combines the resulting list into one list.", function () {
		var result = _linqCore.selectMany(
			_items,
			function (o) { return o.Pets; });

		var expected = ["Scruffy", "Sam", "Walker", "Sugar", "Scratches", "Diesel"];

		expect(result).toEqual(expected);
	});

	test("Projects item to a new list and combines the resulting list into one list, applying a transformation function to each item in the new list.", function () {
		var result = _linqCore.selectMany(
			_items,
			function (o) { return o.Pets; },
			function (p) { return p.toUpperCase(); });

		var expected = ["SCRUFFY", "SAM", "WALKER", "SUGAR", "SCRATCHES", "DIESEL"];

		expect(result).toEqual(expected);
	});

	test("Projects each to a new list and combines the resulting list into one sequence, applying a function that accepts an index to each item in the new list.", function () {
		var result = _linqCore.selectMany(
			_items,
			function (o) { return o.Pets; },
			function (p, index) { return index + " " + p; });

		var expected = ["0 Scruffy", "0 Sam", "1 Walker", "1 Sugar", "2 Scratches", "2 Diesel"];

		expect(result).toEqual(expected);
	});
