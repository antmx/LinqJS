/// <reference path="~/Scripts/LinqJS/LinqJS.js" />

(function ($) {
    $.fn.linqify = function (list) {
        return Netricity.LinqJS.Linqify(list);
    };
}(jQuery));
