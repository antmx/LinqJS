/// <reference path="../Utilities/Enumerator.js" />
/// <reference path="../Utilities/Namespace.js" />

"use strict";

Namespace.Define("Netricity.LinqJS");

Netricity.LinqJS.EnumerableSorter = function (
	/*Func<TElement, TKey>*/ keySelector, /*IComparer<TKey>*/ comparer, /*bool*/ descending, /*EnumerableSorter<TElement>*/ next) {
	this.keySelector = keySelector;
	this.comparer = comparer;
	this.descending = descending;
	this.next = next;
	/*TKey[]*/ this.keys = [];
};

Netricity.LinqJS.EnumerableSorter.prototype.ComputeKeys = function (/*TElement[]*/ elements, /*int*/ count) {
	this.keys = [count];

	for (var i = 0; i < count; i++) {
		this.keys[i] = this.keySelector(elements[i]);
	}

	if (this.next != null)
		this.next.ComputeKeys(elements, count);
};

Netricity.LinqJS.EnumerableSorter.prototype.CompareKeys = function (/*int*/ index1, /*int*/ index2) {
	//var c = this.comparer.Compare(this.keys[index1], this.keys[index2]);
	var c = this.comparer(this.keys[index1], this.keys[index2]);

	if (c == 0) {
		if (this.next == null)
			return index1 - index2;

		return next.CompareKeys(index1, index2);
	}

	return this.descending ? -c : c;
};

Netricity.LinqJS.EnumerableSorter.prototype.Sort = function(/*TElement[]*/ elements, /*int*/ count){
	this.ComputeKeys(elements, count);

	var map = [];

	for (var i = 0; i < count; i++)
		map[i] = i;

	this.QuickSort(map, 0, count - 1);

	return map;
}

Netricity.LinqJS.EnumerableSorter.prototype.QuickSort = function (/*int[]*/ map, /*int*/ left, /*int*/ right) {
	do {
		var i = left;
		var j = right;
		var x = map[i + ((j - i) >> 1)];
		do {
			while (i < map.Length && this.CompareKeys(x, map[i]) > 0)
				i++;

			while (j >= 0 && this.CompareKeys(x, map[j]) < 0)
				j--;

			if (i > j)
				break;

			if (i < j) {
				var temp = map[i];
				map[i] = map[j];
				map[j] = temp;
			}

			i++;
			j--;
		} while (i <= j);
		if (j - left <= right - i) {
			if (left < j)
				this.QuickSort(map, left, j);

			left = i;
		}
		else {
			if (i < right)
				this.QuickSort(map, i, right);

			right = j;
		}
	} while (left < right);
}
