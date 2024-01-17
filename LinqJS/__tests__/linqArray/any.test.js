/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

describe('linqArray', () => {

    describe('any', () => {

        /**
         * @type {linqArray}
         */
        let _items;

        // beforeAll
        beforeEach(() => {
            _items = new linqArray([1, 2, 3, 4, 5, 6, 7, 8]);
        });
        // afterEach
        // afterAll

        test('Returns true when there are any items', () => {

            let result = _items.any();

            expect(result).toBeTruthy();
        });

        test("Returns true when there are matching items", function () {
            let result = _items.any(
                function (i) { return i % 3 == 0; });

            expect(result).toEqual(true);
            expect(result).toBeTruthy();
        });

        test("Returns false when there are no matching items", function () {
            let result = _items.any(
                function (i) { return i > 100; });

            expect(result).toEqual(false);
            expect(result).toBeFalsy();
        });

        test("Returns false when there are no items", function () {
            let result = new linqArray([]).any();

            expect(result).toBeFalsy();
        });

    });

});