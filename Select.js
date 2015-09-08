Netricity.LinqJS.Select = function(lambda) {
    var results = [].Linqify();
    var enumerator = this.GetEnumerator();

    while (enumerator.MoveNext()) {
        var obj = lambda(enumerator.Current);
        results.push(obj);
    }

    return results;
};
