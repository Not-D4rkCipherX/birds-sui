import { Twisters } from 'twisters';
import _0x1b1ef6 from './logger.js';
import { Core } from '../core/core.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ['log'](_0x304bec = '', _0x4384ea = '', _0x2feb5f = new Core(), _0x17c440) {
    if (_0x17c440 == undefined) {
      _0x1b1ef6.info(_0x4384ea.id + " - " + _0x304bec);
      _0x17c440 = '-';
    }
    const _0x226b35 = _0x2feb5f.user ?? {};
    const _0x17b5c7 = _0x226b35.balance ?? '-';
    this.twisters.put(_0x4384ea.id, {
      'text': "\n================= Account " + _0x4384ea.id + " =============\nName         : " + (_0x4384ea.firstName ?? "Unamed") + " " + (_0x4384ea.lastName ?? '') + " \nBalance      : " + _0x17b5c7 + " BIRDS\n\nStatus : " + _0x304bec + "\nDelay : " + _0x17c440 + "\n=============================================="
    });
  }
  ["info"](_0xddb9f4 = '') {
    this.twisters.put(0x2, {
      'text': "\n===================================================\nInfo : " + _0xddb9f4 + "\n=================================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  async ["clear"](_0x219ada) {
    await this.twisters.flush();
  }
}
export default new Twist();
