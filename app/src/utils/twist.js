import { Twisters } from 'twisters';
import a6_0x419028 from './logger.js';
import { Core } from '../core/core.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ['log'](_0xf6dff6 = '', _0x2364de = '', _0x385886 = new Core(), _0x50159e) {
    if (_0x50159e == undefined) {
      a6_0x419028.info(_0x2364de.id + " - " + _0xf6dff6);
      _0x50159e = '-';
    }
    const _0x5d4280 = _0x385886.user ?? {};
    const _0x492869 = _0x5d4280.balance ?? '-';
    this.twisters.put(_0x2364de.id, {
      'text': "\n================= Account " + _0x2364de.id + " =============\nName         : " + (_0x2364de.firstName ?? 'Unamed') + " " + (_0x2364de.lastName ?? '') + " \nBalance      : " + _0x492869 + " BIRDS\n\nStatus : " + _0xf6dff6 + "\nDelay : " + _0x50159e + "\n=================================================="
    });
  }
  ['info'](_0xc0f0ad = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0xc0f0ad + "\n=============================================="
    });
    return;
  }
  ['clearInfo']() {
    this.twisters.remove(0x2);
  }
  async ["clear"](_0x4bf81e) {
    await this.twisters.flush();
  }
}
export default new Twist();