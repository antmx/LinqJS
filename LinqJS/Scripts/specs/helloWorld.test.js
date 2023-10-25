/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;

beforeEach(function () {
	_linqCore = new linqCoreModule();
});

test("Displays hello world", function () {

	let result = _linqCore.helloWorld();

	expect(result).toEqual("Hello, World!");
});
