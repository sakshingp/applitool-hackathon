module.exports = {
    isSorted : function( arr ) {
        const limit = arr.length - 1;
        return arr.every((_, i) => (i < limit ? arr[i] <= arr[i + 1] : true));
    },

    isEqual : function (arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false
        }
        return arr1
            .map((val, i) => arr2[i] === val)
            .every(isSame => isSame)
    }
}