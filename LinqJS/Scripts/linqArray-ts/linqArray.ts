
/**
 * An array with LINQ-like functions.
 */
export class LinqArray<TItem> extends Array<TItem> {

    /**
     * 
     * @param items An optional array of items to add to the new LinqArray instance
     */
    constructor(items?: Array<TItem>) {
        if (items != null) {
            super(...items)
        }
        else {
            super();
        }
    }

    // /**
    //  * @param {ArrayLike} [items] An optional array of items to add to the new LinqArray instance
    //  */
    // constructor(items) {
    //     if (Object.prototype.toString.call(items) === '[object Array]') {
    //         super(...items);
    //     }
    //     else if (Object.prototype.toString.call(items) === '[object String]') {
    //         let stringArray = items.split("");
    //         super(...stringArray);
    //     }
    //     else {
    //         super();
    //     }
    // }    

    /**
     * Adds the given sequence to the instance.
     * @param {ArrayLike} items List of items to add.
     */
    public addItems(items: Array<TItem>): void {
        items.forEach(item => this.push(item));
    }

    where(predicateFn: (val: TItem) => boolean): LinqArray<TItem> {

        let result = new LinqArray<TItem>();

        this.forEach((val, idx) => {
            if (predicateFn(val)) {
                result.push(val);
            }
        });

        return result;
    }
}

//module.exports = LinqArray;