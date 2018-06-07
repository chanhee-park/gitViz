const Util = new function () {
    this.loadCsv = async (url) => await $.get(url);
    this.loadCsvByD3 = async (url) => {
        return await d3.csv(url);
    };
    this.loadNumberCsvByD3 = async (url) => {
        let data = await d3.csv(url);
        const keys = Object.keys(data[0]);
        _.forEach(data, function (d) {
            _.forEach(keys, function (key) {
                d[key] = parseInt(d[key]);
            });
        });
        return data;
    };

    this.extract = (objs, key, value) => {
        let extracted = [];
        _.forEach(objs, function (obj) {
            if (Array.isArray(obj[key]) && obj[key].indexOf(value) >= 0) {
                extracted.push(obj);
            } else if (obj[key] === value) {
                extracted.push(obj);
            }
        });
        return extracted;
    };

    this.radians_to_degrees = (radians) => {
        return radians * (180 / PI);
    };

    this.max_attr_of_objs = (objs, attr) => {
        let max = -1000000;
        for (let i = 0; i < objs.length; i++) {
            if (max < objs[i][attr]) {
                max = objs[i][attr]
            }
        }
        return max;
    };

    this.min_attr_of_objs = (objs, attr) => {
        let min = 1000000000000;
        for (let i = 0; i < objs.length; i++) {
            if (min > objs[i][attr]) {
                min = objs[i][attr]
            }
        }
        return min;
    };

    this.max_key = (obj) => {
        let max = -1000000;
        let maxkey = '';
        _.forEach(obj, function (val, key) {
            if (val > max) {
                max = val;
                maxkey = key;
            }
        });
        return { key: maxkey, val: max };
    };


    this.extractSortedArray = (array, extractUnique, isSortedByLeast, isStrictType) => {
        let result = [];
        let checker = {};
        // 배열 내 value 별 개수 세기
        for (let i = 0, m = array.length; i < m; i++) {
            let value = array[i];
            let keyName = value + (isStrictType === true ? typeof value : "");
            if (
                !checker[keyName] ||
                !checker[keyName].count ||
                typeof checker[keyName].count !== "number"
            ) {
                checker[keyName] = { value: value, count: 1 };
                continue;
            }
            checker[keyName].count++;
        }

        let isPassCondition = function (value) {
            // extractUnique
            // 고유한 것을 뽑아내는 것이면, 1보다 크면 넘김
            // 중복된 것을 뽑아내는 것이면, 1이거나 작으면 넘김
            return extractUnique === true ? value > 1 : value <= 1;
        };

        // keyName 과 count 로 분리하여 객체로 결과용 배열에 담기
        for (let keyName in checker) {
            if (checker.hasOwnProperty(keyName)) {
                if (
                    !checker[keyName].count ||
                    isPassCondition(checker[keyName].count)
                ) {
                    continue;
                }
                let element = {};
                element.value = checker[keyName].value;
                element.count = checker[keyName].count;
                result.push(element);
            }
        }

        // 결과 배열 내에, count 를 높은 순으로 재정렬
        result.sort(function (a, b) {
            return isSortedByLeast === true
                ? // 낮은 순 중복 우선 정렬인지
                a.count - b.count
                : b.count - a.count;
        });

        // 결과 배열의 객체 내부 keyName 으로 객체를 치환
        for (let i = 0, m = result.length; i < m; i++) {
            result[i] = result[i].value;
        }

        // 결과 반환
        return result;
    }
};
