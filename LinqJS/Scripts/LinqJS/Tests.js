
/// <reference path="linqify.js" />
/// <reference path="typeDefs.js" />

/** @type {linqable} */
var la;



var results = la.Where(function (item) {
    return item.Age < 12;
});


var a = [1, 2, 3, 4];

// Where
//debugger;
console.log(a.linqify().Where(function (i) { return i % 2 == 0; }));

// Any
console.log(a.linqify().Any());
console.log(a.linqify().Any(function (i) { return i % 3 == 0; }));

// First
console.log(a.linqify().First());
console.log(a.linqify().First(function (i) { return i % 2 == 0; }));

// Last
console.log(a.linqify().Last());
console.log(a.linqify().Last(function (i) { return i % 2 == 0; }));

// All
console.log(a.linqify().All(function (i) { return i % 2 == 0; }));
console.log(a.linqify().All(function (i) { return i < 100; }));

// 
//function TestGetEnumerator() {
//    window.Logger.LogFunction(arguments.callee);

//    var items = [1, 2, 3, 4].linqify();
//    var enumerator = items.GetEnumerator();

//    while (enumerator.MoveNext()) {
//        console.log(enumerator.Current);
//    }

//    window.Logger.LogArray(items);
//}

//TestGetEnumerator();


function TestWhere() {

    window.Logger.LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].linqify();

    var results = items
        .Where(function (i) { return i % 2 === 0; });

    window.Logger.LogArray(results);
}

TestWhere();


function TestAggregate() {

    window.Logger.LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].linqify();

    var aggregateResult = items.Aggregate(function (result, current) {

        return result + current;
    });

    console.log(aggregateResult);
}

TestAggregate();


function TestAggregateWithSeed() {
    window.Logger.LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].linqify();

    var aggregateResult = items
        .AggregateWithSeed(function (result, current) {
            return result + current;
        }, 10);

    console.log(aggregateResult);
}

TestAggregateWithSeed();


function TestAggregateWithSeedAndResultSelector() {
    window.Logger.LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].linqify();

    var aggregateResult = items.AggregateWithSeedAndResultSelector(
        function (result, current) {
            return result + current;
        },
        10,
        function (result) {
            return result / 2;
        });

    console.log(aggregateResult);
}

TestAggregateWithSeedAndResultSelector();


function TestAverage() {
    window.Logger.LogFunction(arguments.callee);

    var items = [2, 4, 6, 8].linqify();
    var avg = items.Average();

    console.log(avg);
}

TestAverage();


function TestAverageWithTransform() {
    window.Logger.LogFunction(arguments.callee);

    var items = [2, 4, 6, 8].linqify();
    var avg = items.AverageWithTransform(function (i) { return i * 10; });

    console.log(avg);
}

TestAverageWithTransform();


function TestLinqJquery() {

    window.Logger.LogFunction(arguments.callee);

    var list = $().linqify([1, 2, 3, 4])
        .Where(function (i) { return i % 2 === 0; });

    window.Logger.LogArray(list);
}

TestLinqJquery();


function TestSelect() {

    window.Logger.LogFunction(arguments.callee);

    var items = [
        { Name: "One", Number: 1 },
        { Name: "Two", Number: 2 },
        { Name: "Three", Number: 3 },
        { Name: "Four", Number: 4 }
    ].linqify();

    var result = items
        .where(function (o) { return o.Number % 2 === 0; })
        .linqify()
        .select(function (o) { return o.Name; });

    window.Logger.LogArray(result);
}

TestSelect();
