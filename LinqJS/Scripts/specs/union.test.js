/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

let _linqCore;

beforeEach(function () {
	_linqCore = new linqCoreModule();
});

test("Produces the set union of two lists, i.e. a list that contains the elements from both lists, excluding duplicates.", function () {

	let firstItems = [1, 1, 2, 3, 4, 5, 5, 5];
	let secondItems = [1, 3, 5, 7, 9, 5, 5, 5, 11, 11, 11, 11, 11];
	let result = _linqCore.union(firstItems, secondItems);
	let expected = [1, 2, 3, 4, 5, 7, 9, 11];

	expect(result).toEqual(expected);
});

test("Produces the set union of two lists, i.e. a list that contains the elements from both lists, excluding duplicates, using the specified equality comparer function.", function () {

	let firstItems = ["One", "one", "Two", "Three", "Four", "Five", "five", "five"];
	let secondItems = ["one", "three", "five", "Seven", "Nine", "five", "Five", "five", "Eleven", "eleven", "eleven", "eleven"];
	let comparerLambda = function (first, second) { return first.toLowerCase() == second.toLowerCase(); };
	let result = _linqCore.union(firstItems, secondItems, comparerLambda);
	let expected = ["One", "Two", "Three", "Four", "Five", "Seven", "Nine", "Eleven"];

	expect(result).toEqual(expected);
});
