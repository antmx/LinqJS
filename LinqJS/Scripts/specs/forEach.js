
describe("LinqHelper forEach", function () {

    var helper;
    var items;

    beforeEach(function () {

        helper = new LinqJS.LinqHelper();
        items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("Applies lambda to each item", function () {

        var arrayToPopulate = [];

        var result = helper.forEach(
            items,
            function (indexInArray, valueOfElement) { arrayToPopulate.push(valueOfElement * 10); });

        expect(items.length).toEqual(arrayToPopulate.length);

        //var e = helper.getEnumerator(items);

        //while (e.MoveNext()) {
        //    expect(e.Current * 10).toEqual(arrayToPopulate[e.CurrentIdx]);
        //}

        helper.forEach(items, function (indexInArray, valueOfElement) {

            expect(valueOfElement * 10).toEqual(arrayToPopulate[indexInArray]);
        });
    });

});
