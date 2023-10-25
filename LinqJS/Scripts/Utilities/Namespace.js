/*jslint
    this: true, for: true, white: true
*/

/// <summary>Utility for creating objects that can act like C# Namespaces</summary>
// Auto-invoked function to bind an instance of Namespace to window for global access
(function () {
	Namespace = function () { };

	Namespace.prototype = {

		/// <summary>Creates a namespace from the given string</summary>
		Define: function (ns) {
			var n = ns.split('.');
			var o = window[n[0]] = window[n[0]] || {};
			var l = n.length;

			for (var i = 1; i < l; i++) {
				o = o[n[i]] = o[n[i]] || {};
			}

			if (typeof o !== "object") {
				throw new Error(ns + " not found");
			}

			return o;
		}
	};

	window.Namespace = new Namespace();
})();
