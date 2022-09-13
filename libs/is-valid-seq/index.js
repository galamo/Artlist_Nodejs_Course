// 0 1 2 3
// [1,2,3,4] => [1,3] OR [1,4] Valid
function isValidSeq(arr, seq) {
    const seqCopy = [...seq]
    for (let index = arr.length - 1; index >= 0; index--) {
        if (seqCopy[seqCopy.length - 1] === arr[index]) {
            seqCopy.pop();
        }
    }
    return !seq.length
}

module.exports = { isValidSeq }



