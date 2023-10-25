
/// <reference path="linqify.js" />
/// <reference path="typeDefs.js" />
/// <reference path="../utilities/logger.js" />

var a = [1, 2, 3, 4];

// Where
//linqify(a);
//var x = a.where(function (i) { return i % 2 == 0; });
console.log(a.linqify().where(function (i) { return i % 2 == 0; }));

// Any
console.log(a.linqify().any());
console.log(a.linqify().any(function (i) { return i % 3 == 0; }));

// First
console.log(a.linqify().first());
console.log(a.linqify().first(function (i) { return i % 2 == 0; }));

// Last
console.log(a.linqify().last());
console.log(a.linqify().last(function (i) { return i % 2 == 0; }));

// All
console.log(a.linqify().all(function (i) { return i % 2 == 0; }));
console.log(a.linqify().all(function (i) { return i < 100; }));

var logger = new Utilities.Logger();
 
//function TestGetEnumerator() {
//    logger.LogFunction(arguments.callee);

//    var items = [1, 2, 3, 4].linqify();
//    var enumerator = items.getEnumerator();

//    while (enumerator.MoveNext()) {
//        console.log(enumerator.Current);
//    }

//    logger.LogArray(items);
//}

//TestGetEnumerator();


function TestWhere() {

    logger.LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].linqify();

    var results = items
        .where(function (i) { return i % 2 === 0; });
    
    logger.LogArray(results);
}

TestWhere();


function TestAggregate() {

    logger.LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].linqify();

    var aggregateResult = items.aggregate(function (result, current) {

        return result + current;
    });

    console.log(aggregateResult);
}

TestAggregate();


function TestAggregateWithSeed() {
    logger.LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].linqify();

    var aggregateResult = items
        .aggregateWithSeed(function (result, current) {
            return result + current;
        }, 10);

    console.log(aggregateResult);
}

TestAggregateWithSeed();


function TestAggregateWithSeedAndResultSelector() {
    logger.LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].linqify();

    var aggregateResult = items.aggregateWithSeedAndResultSelector(
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
    logger.LogFunction(arguments.callee);

    var items = [2, 4, 6, 8].linqify();
    var avg = items.average();

    console.log(avg);
}

TestAverage();


function TestAverageWithTransform() {
    logger.LogFunction(arguments.callee);

    var items = [2, 4, 6, 8].linqify();
    var avg = items.averageWithTransform(function (i) { return i * 10; });

    console.log(avg);
}

TestAverageWithTransform();


function TestLinqJquery() {

    logger.LogFunction(arguments.callee);

    var list = $().linqify([1, 2, 3, 4])
        .where(function (i) { return i % 2 === 0; });

    logger.LogArray(list);
}

TestLinqJquery();


function TestSelect() {

    logger.LogFunction(arguments.callee);

    var items = [
        { Name: "One", Number: 1 },
        { Name: "Two", Number: 2 },
        { Name: "Three", Number: 3 },
        { Name: "Four", Number: 4 }
    ].linqify();

    var result = items
        .where(function (o) { return o.Number % 2 === 0; })
        .select(function (o) { return o.Name; });

    logger.LogArray(result);
}

TestSelect();
