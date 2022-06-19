export const searchArrSameElementIndex = (arr) => {
    const list: any = []
    const result: Record<string, any>[] = []

    for (let i = 0; i < arr.length; i++) {
        let hasRead = false;
        for (let k = 0; k < list.length; k++) {
            if (list[k] == arr[i]) {
                hasRead = true
            }
        }

        if (!hasRead) {
            let _index: any = i, haveSame = false

            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    _index += '|' + j;
                    haveSame = true
                }

            }
            if (haveSame) {
                list.push(arr[i]);
                result.push({ key: _index, value: arr[i] })
            }
        }

    }

    const arrFilterStr = result.filter(item => item.value && !isNaN(item.value)) || [];
    return arrFilterStr[0]?.key?.split('|') || []
}