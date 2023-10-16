
describe("linqCore forEach", function () {

    var _linqCore;
    var _items;

    beforeEach(function () {

        _linqCore = new linqJs.linqCore();
        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("Applies lambda to each item", function () {

        var arrayToPopulate = [];

        var result = _linqCore.forEach(
            _items,
            function (indexInArray, valueOfElement) { arrayToPopulate.push(valueOfElement * 10); });

        expect(_items.length).toEqual(arrayToPopulate.length);

        //var e = helper.getEnumerator(items);

        //while (e.MoveNext()) {
        //    expect(e.Current * 10).toEqual(arrayToPopulate[e.CurrentIdx]);
        //}

        _linqCore.forEach(_items, function (indexInArray, valueOfElement) {

            expect(valueOfElement * 10).toEqual(arrayToPopulate[indexInArray]);
        });
    });

});
