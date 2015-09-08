function TestLinqJquery() {

    LogFunction(arguments.callee);

    var list = $().linqify([1, 2, 3, 4])
        .Where(function(i) { return i % 2 === 0; });

    LogArray(list);
}

TestLinqJquery();


function TestSelect() {

    LogFunction(arguments.callee);

    var items = [
        { Name: "One", Number: 1 },
        { Name: "Two", Number: 2 },
        { Name: "Three", Number: 3 },
        { Name: "Four", Number: 4 }
    ].Linqify();

    var result = items
        .Where(function(o) { return o.Number % 2 === 0; })
        .Select(function(o) { return o.Name; });

    LogArray(result);
}

TestSelect();
