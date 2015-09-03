/// <reference path="~/Scripts/Utilities/Extend.js" />

Object.prototype.Linqify = function () {

    if (typeof this.length === 'undefined')
        throw new Error('Linqify requires an array');

    if (this.___linqified)
        return this;

    this.___linqified = true;

    // Add extra methods to the instance
    Netricity.Utilities.extend(this, { Where: Netricity.LinqJS.Where });
    Netricity.Utilities.extend(this, { Any: Netricity.LinqJS.Any });
    Netricity.Utilities.extend(this, { GetEnumerator: Netricity.LinqJS.GetEnumerator });
    Netricity.Utilities.extend(this, { Aggregate: Netricity.LinqJS.Aggregate });
    Netricity.Utilities.extend(this, { AggregateWithSeed: Netricity.LinqJS.AggregateWithSeed });
    Netricity.Utilities.extend(this, { AggregateWithSeedAndResultSelector: Netricity.LinqJS.AggregateWithSeedAndResultSelector });
    
    return this;
};

Namespace.Create("Netricity.LinqJS");

Netricity.LinqJS.EnsureLambda = function (lambda) {
    if (typeof (lambda) !== "function")
        throw new Error("lambda must be a function");
};

/// Filters an array of values based on a predicate
Netricity.LinqJS.Where = function(lambda) {
    Netricity.LinqJS.EnsureLambda(lambda);

    var results = [].Linqify();

    //for (var idx = 0; idx < this.length; idx++) {
    //    var obj = this[idx];
    //    if (lambda(obj))
    //        results.push(obj);
    //}

    var enumerator = this.GetEnumerator();

    while (enumerator.MoveNext()) {
        if (lambda(enumerator.Current))
            results.push(enumerator.Current);
    }

    return results;
};

Netricity.LinqJS.Any = function (lambda) {
    if (typeof (lambda) === "undefined")
        return this.length > 0;

    Netricity.LinqJS.EnsureLambda(lambda);

    for (var idx = 0; idx < this.length; idx++) {
        var obj = this[idx];

        if (lambda(obj))
            return true;
    }

    return false;
};

// func(result, current)
// Applies an accumulator function over an array.
Netricity.LinqJS.Aggregate = function(lambda) {
    Netricity.LinqJS.EnsureLambda(lambda);

    var e = this.GetEnumerator();

    if (!e.MoveNext())
        throw new Error("Array must contain at least 1 element");

    var result = e.Current;

    while (e.MoveNext())
        result = lambda(result, e.Current);

    return result;
};

Netricity.LinqJS.AggregateWithSeed = function(lambda, seed) {
    Netricity.LinqJS.EnsureLambda(lambda);

    var result = seed;
    var e = this.GetEnumerator();

    while (e.MoveNext())
        result = lambda(result, e.Current);

    return result;
};

Netricity.LinqJS.AggregateWithSeedAndResultSelector = function (lambda, seed, resultSelector) {
    Netricity.LinqJS.EnsureLambda(lambda);
    Netricity.LinqJS.EnsureLambda(resultSelector);
    
    var result = seed;
    var e = this.GetEnumerator();

    while (e.MoveNext())
        result = lambda(result, e.Current);

    result = resultSelector(result);

    return result;
};

/// Supports a simple iteration over an array.
Netricity.LinqJS.Enumerator = function(items) {
    var currentIdx = 0;
    var self = this;
    this.Current = null;

    this.MoveNext = function() {
        if (items.length > currentIdx) {
            self.Current = items[currentIdx];
            currentIdx++;
            return true;
        }

        return false;
    }

    this.Reset = function() {
        currentIdx = 0;
        this.Current = null;
    }
};

/// Returns an enumerator that iterates over the array.
Netricity.LinqJS.GetEnumerator = function() {

    if (this.Enumerator == null)
        this.Enumerator = new Netricity.LinqJS.Enumerator(this);
    else {
        //console.log("enumerator already built");
        this.Enumerator.Reset();
    }

    return this.Enumerator;
};




function TestGetEnumerator() {
    LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].Linqify();
    var enumerator = items.GetEnumerator();

    while (enumerator.MoveNext()) {
        console.log(enumerator.Current);
    }

    LogArray(items);
}

TestGetEnumerator();


function TestWhere() {
    LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].Linqify();
    
    var results = items
        .Where(function (i) { return i % 2 === 0; });

    LogArray(results);
}

TestWhere();


function TestAggregate() {
    LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].Linqify();

    var aggregateResult = items
        .Aggregate(function(result, current) {
            return result + current;
        });

    console.log(aggregateResult);
}

TestAggregate();


function TestAggregateWithSeed() {
    LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].Linqify();

    var aggregateResult = items
        .AggregateWithSeed(function(result, current) {
            return result + current;
        }, 10);

    console.log(aggregateResult);
}

TestAggregateWithSeed();


function TestAggregateWithSeedAndResultSelector() {
    LogFunction(arguments.callee);

    var items = [1, 2, 3, 4].Linqify();

    var aggregateResult = items.AggregateWithSeedAndResultSelector(
        function(result, current) {
            return result + current;
        },
        10,
        function(result) {
            return result / 2;
        });

    console.log(aggregateResult);
}

TestAggregateWithSeedAndResultSelector();


function LogArray(items) {
    var enumerator = items.GetEnumerator();

    while (enumerator.MoveNext()) {
        console.log(enumerator.Current);
    };
}

function LogFunction(func) {
    var name = func.toString();
    name = name.substr('function '.length);
    name = name.substr(0, name.indexOf('('));

    console.log(name);
}
