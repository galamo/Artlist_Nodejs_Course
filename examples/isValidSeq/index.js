function isValidSeq(arr, seq) {
    for (let index = arr.length - 1; index >= 0; index--) {
        if (seq[seq.length - 1] === arr[index]) {
            seq.pop()
        }

    }
    return !seq.length
}

module.exports = isValidSeq;