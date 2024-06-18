
//beforeEach(() =>
	//_items = new linqArray([1, 2, 3, 4, 5, 6, 7, 8])
//);

// test("Finds matching items", () => {

// 	expect(true).toBeTruthy();
// 	//let result = _items.where(i => i % 2 == 0);
// 	// let expected = [2, 4, 6, 8];

// 	// expect(result.length).toEqual(4);

// 	// result.forEach(function (valueOfElement, indexInArray) {

// 	// 	expect(valueOfElement).toEqual(expected[indexInArray]);
// 	// });
// });

import { describe, expect, test } from '@jest/globals';
import { LinqArray } from '../../Scripts/LinqArray-ts/LinqArray';

/**
 * @type {Array<int>}
 */
let _items;

beforeEach(() => {
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Finds matching items", () => {

	let items = new LinqArray<number>(_items);

	let result = items.where((i) => i % 2 === 0);

	let expected = [2, 4, 6, 8];

	expect(result.length).toEqual(4);

	result.forEach(function (valueOfElement, indexInArray) {
		expect(valueOfElement).toEqual(expected[indexInArray]);
	});
});
