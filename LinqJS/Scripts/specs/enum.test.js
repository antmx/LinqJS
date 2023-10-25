
let _language;

(function (language) {
	language.enUS = "en-US";
	language[language["Amber"] = "2"] = "Amber";
	language[language["Green"] = "3"] = "Green";
})(_language || (_language = {}));


test("returns expected member", function () {

	let u = _language.enUS;
	expect(u).toEqual("en-US");

	u = _language.Amber;
	expect(u).toEqual("2");

	u = _language.Green;
	expect(u).toEqual("3");
});
