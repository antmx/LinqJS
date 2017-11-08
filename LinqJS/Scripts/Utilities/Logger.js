/*jslint
    this: true, for: true, white: true
*/

"use strict";

function Logger() { }

Logger.prototype.LogArray = function (items) {

	var enumerator = new Utilities.Enumerator(items);

	while (enumerator.MoveNext()) {
		console.log(enumerator.Current);
	}
};

Logger.prototype.LogFunction = function (func) {

	var name = func.toString();
	name = name.substr('function '.length);
	name = name.substr(0, name.indexOf('('));

	console.log(name);
};

window.Logger = new Logger();
