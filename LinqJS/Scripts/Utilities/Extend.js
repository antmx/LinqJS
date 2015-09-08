/// <reference path="~/Scripts/Utilities/Namespace.js" />

// Copied from angular.js - use this to add extra functions to an INSTANCE of a type

//Namespace.Define("Netricity.Utilities");

//Namespace.Define("Netricity");

//Netricity.Utilities = Netricity.Utilities || function () { };

//var Netricity = Netricity || {};

Namespace.Define("Netricity.Utilities");

Netricity.Utilities.extend = function (dst) {

	//(function () {

	//function extend(dst) {
	//Netricity.Utilities.extend = function (dst) {
	var h = dst.$$hashKey;
	forEach(arguments, function (obj) {
		if (obj !== dst) {
			forEach(obj, function (value, key) {
				dst[key] = value;
			});
		}
	});

	setHashKey(dst, h);
	return dst;
	//}

	function forEach(obj, iterator, context) {
		//Netricity.Utilities.forEach = function (obj, iterator, context) {
		var key;
		if (obj) {
			if (isFunction(obj)) {
				for (key in obj) {
					if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
						iterator.call(context, obj[key], key);
					}
				}
			} else if (obj.forEach && obj.forEach !== forEach) {
				obj.forEach(iterator, context);
			} else if (isArrayLike(obj)) {
				for (key = 0; key < obj.length; key++)
					iterator.call(context, obj[key], key);
			} else {
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						iterator.call(context, obj[key], key);
					}
				}
			}
		}
		return obj;
	}

	function isFunction(value) { return typeof value == 'function'; }

	function isArrayLike(obj) {
		if (obj == null || isWindow(obj)) {
			return false;
		}

		var length = obj.length;

		if (obj.nodeType === 1 && length) {
			return true;
		}

		return isString(obj) || isArray(obj) || length === 0 ||
				 typeof length === 'number' && length > 0 && (length - 1) in obj;
	}

	function isWindow(obj) {
		return obj && obj.document && obj.location && obj.alert && obj.setInterval;
	}

	function isString(value) { return typeof value == 'string'; }

	function isArray(value) { return toString.apply(value) == '[object Array]'; }

	function setHashKey(obj, h) {
		if (h) {
			obj.$$hashKey = h;
		}
		else {
			delete obj.$$hashKey;
		}
	}
};

//})();