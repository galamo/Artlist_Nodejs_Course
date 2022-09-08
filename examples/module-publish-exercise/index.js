function arrayContainsSequence(array1, array2) {
  return array1.join('|').includes(array2.join('|'));
}

module.exports = arrayContainsSequence;
