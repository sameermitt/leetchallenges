function kCombination(arr, n) {
    if (n > arr.length) {
        return [];
    }

    if (n === arr.length) {
        return [arr];
    }

    if (n === 1) {
        return arr.map(function(elem) {
            return [elem];
        });
    }

    var combination = [];
    arr.forEach(function(elem, i) {
        var tempArray = arr.slice(i + 1);
        tempArray = kCombination(tempArray, n - 1);
        tempArray.forEach(function(temp) {
            combination.push([elem].concat(temp));
        });
    });

    return combination;
}

// console.log(kCombination([1, 2, 3, 4], 3));

function arrayPut(arr, n) {
    var put = false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > n) {
            put = true;
            arr = arr.slice(0, i).concat([n]).concat(arr.slice(i));
        }
    }
    if (!put) {
        arr.push(n);
    }
}

function getElementToAdd(compareArr) {
    var elementToAdd = -1;
    compareArr.every(function(elem, i) {
        elementToAdd = elem ? elementToAdd : i + 1;
        return elem;
    });
    return elementToAdd;
}

function patch(arr, n) {
    var compareArr = []
    for (var i = 0; i < n; i++) {
        compareArr.push(false);
    }

    var count = 0;
    var elementToAdd = getElementToAdd(compareArr);
    while (elementToAdd > -1) {
        for (var k = 1; k < n; k++) {
            var tempArr = kCombination(arr, k);
            tempArr.forEach(function(elem) {
                var sum = elem.reduce(function(prev, cur) {
                    return prev + cur;
                });
                if (sum <= compareArr.length) {
                    compareArr[sum - 1] = true;
                }
            });
        }
        elementToAdd = getElementToAdd(compareArr);
        if (elementToAdd < 0) {
            return count;
        }
        arrayPut(arr, elementToAdd);
        count++;
    }

    return count;
}

console.log(patch([1, 2, 2], 6));
