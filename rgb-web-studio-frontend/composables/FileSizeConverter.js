export default {
  ByteToMb(sizeInByte) {
    return sizeInByte / (1024 * 1024);
  },
  MbToByte(sizeInByte) {
    return sizeInByte * (1024 * 1024);
  },
};
