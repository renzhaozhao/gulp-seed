const data = {
    limit: 10,
    a: 'aa',
    s: 'ss',
    b: 'bb',
    1: '1',
    11: '11',
    2: '2',
    0: 0,
    haha: null
}

function sortObjString(obj) {
    if (!Object.keys) {
        Object.keys = function (obj) {
            var keys = [];

            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }

            return keys;
        };
    }
    var newKey = Object.keys(obj).sort();
    var newObj = {};
    var str = '';
    for (var i = 0; i < newKey.length; i++) {
        newObj[newKey[i]] = obj[newKey[i]]
    }
    for (var key in newObj) {
        if (!!newObj[key] || newObj[key] === 0) {
            str += newObj[key]
        }
    }
    return str;
}

var res = sortObjString(data)
console.log(res)
