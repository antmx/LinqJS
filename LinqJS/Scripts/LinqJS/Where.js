
/// <reference path="~/Scripts/Utilities/Extend.js" />
/// <reference path="~/Scripts/Utilities/Namespace.js" />

var a = [1,2];
//a[0] = "foo";
//a.Where();

//for (var x in a) {
//	console.log(x);
//}

var x = {};

Namespace.Create("Netricity.LinqJS");

Netricity.LinqJS.Where = function(lambda){
	console.log('Netricity.LinqJS.Where + ' + this.length);

	if (typeof (lambda) !== "function")
		throw new Error("lambda must be a function");

	var results = [];

	for (var idx = 0; idx < this.length; idx++) {
		var obj = this[idx];

		if (lambda(obj))
			results.push(obj);
	}

	return results;
};


//a.linqify();
//a.Where();

console.log(a.Linqify().Where(function (i) {
	return i % 2 == 0;
}));

//for (var idx = 0; idx < a.length; idx++) {
//	console.log(a[idx]);
//}