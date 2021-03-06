﻿/// <reference path="../_references.js" />

describe("LinqCore all", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns true when all match", function () {
		var result = helper.all(
			items,
            function (i) { return i <= 8; });

		var expected = true;

		expect(result).toEqual(expected);
	});

	it("Returns false when not all match", function () {
		var result = helper.all(
			items,
            function (i) { return i <= 7; });

		var expected = false;

		expect(result).toEqual(expected);
	});

});



var Language;
(function (language) {
	language.enUS = "en-US";
	//language[language["Amber"] = 2] = "Amber";
	language[language["Green"] = "3"] = "Green";
})(Language || (Language = {}));

describe("enum", function () {

    it("returns expected member", function () {

        var u = Language.enUS;
        expect(u).toEqual("en-US");

        u = Language.Green;
        expect(u).toEqual('3');
    });
});

