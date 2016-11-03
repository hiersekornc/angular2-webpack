export default class rfc4122 {
  static getRandom(max) {
    return Math.random() * max;
  }
  static v4() {
    var id = '', i;

    for(i = 0; i < 36; i++)
    {
      if (i === 14) {
        id += '4';
      }
      else if (i === 19) {
        id += '89ab'.charAt(this.getRandom(4));
      }
      else if(i === 8 || i === 13 || i === 18 || i === 23) {
        id += '-';
      }
      else
      {
        id += '0123456789abcdef'.charAt(this.getRandom(16));
      }
    }
    return id;
  }
  static isUUID(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }
}
