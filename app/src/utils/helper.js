import a4_0x50fbcf from 'moment-timezone';
import a4_0x12d436 from 'fs';
import a4_0x866b50 from 'path';
import a4_0x49ca94 from './twist.js';
export class Helper {
  static ["creator"] = '5703822759';
  static ['delay'] = (_0x17a036, _0x2f1250, _0x88ab34, _0x4c104c) => {
    return new Promise(_0x5cf7f2 => {
      let _0x2d9d06 = _0x17a036;
      if (_0x2f1250 != undefined) {
        a4_0x49ca94.log(_0x88ab34, _0x2f1250, _0x4c104c, "Delaying for " + this.msToTime(_0x17a036));
      } else {
        a4_0x49ca94.info((_0x88ab34 ?? '') + " - Delaying for " + this.msToTime(_0x17a036));
      }
      const _0x307c9e = setInterval(() => {
        _0x2d9d06 -= 0x3e8;
        if (_0x2f1250 != undefined) {
          a4_0x49ca94.log(_0x88ab34, _0x2f1250, _0x4c104c, "Delaying for " + this.msToTime(_0x2d9d06));
        } else {
          a4_0x49ca94.info((_0x88ab34 ?? '') + " - Delaying for " + this.msToTime(_0x2d9d06));
        }
        if (_0x2d9d06 <= 0x0) {
          clearInterval(_0x307c9e);
          _0x5cf7f2();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x307c9e);
        await a4_0x49ca94.clearInfo();
        if (_0x2f1250) {
          a4_0x49ca94.log(_0x88ab34, _0x2f1250, _0x4c104c);
        }
        _0x5cf7f2();
      }, _0x17a036);
    });
  };
  static ['randomUserAgent']() {
    const _0xf28dd1 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0xf28dd1[Math.floor(Math.random() * _0xf28dd1.length)];
  }
  static ['readTime'](_0x2fab99) {
    const _0x22cead = a4_0x50fbcf.unix(_0x2fab99);
    return _0x22cead.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x2f02c2 = a4_0x50fbcf().tz('Asia/Singapore').unix();
    return _0x2f02c2.toString();
  }
  static ['getSession'](_0x306c2f) {
    try {
      if (!a4_0x12d436.existsSync('accounts')) {
        a4_0x12d436.mkdirSync('accounts');
      }
      const _0x12d216 = a4_0x12d436.readdirSync(a4_0x866b50.resolve(_0x306c2f));
      const _0x502077 = [];
      _0x12d216.forEach(_0x16ee05 => {
        _0x502077.push(_0x16ee05);
      });
      return _0x502077;
    } catch (_0x5a2846) {
      throw Error("Error reading sessions directory: " + _0x5a2846 + ',');
    }
  }
  static ["resetAccounts"]() {
    try {
      const _0x51e947 = a4_0x866b50.resolve('accounts');
      const _0x2bd113 = a4_0x12d436.readdirSync(_0x51e947);
      console.log("Deleting Accounts...");
      _0x2bd113.forEach(_0x1e7ed0 => {
        const _0x3aaffd = a4_0x866b50.join(_0x51e947, _0x1e7ed0);
        console.log(_0x3aaffd);
        a4_0x12d436.rm(_0x3aaffd, {
          'recursive': true,
          'force': true
        }, _0x3ddd61 => {
          if (_0x3ddd61) {
            console.error("Error deleting file " + _0x3aaffd + ':', _0x3ddd61);
          }
        });
      });
      console.info("Account reset successfully. Please restart the bot.");
    } catch (_0x2fa02f) {
      console.error("Error deleting accounts: " + _0x2fa02f);
      throw _0x2fa02f;
    }
  }
  static ['getQueryFromUrl'](_0x5b54a0) {
    const _0x35cbf2 = _0x5b54a0.split('tgWebAppData=')[0x1].split('&tgWebAppVersion=')[0x0];
    return this.convertUrlEncodedString(_0x35cbf2);
  }
  static ['convertUrlEncodedString'](_0x2c0e68) {
    const _0x1d5671 = decodeURIComponent(_0x2c0e68);
    return _0x1d5671;
  }
  static ['createDir'](_0x5f3924) {
    try {
      const _0x569376 = a4_0x866b50.join('accounts', _0x5f3924);
      if (!a4_0x12d436.existsSync('accounts')) {
        a4_0x12d436.mkdirSync('accounts');
      }
      a4_0x12d436.mkdirSync(_0x569376, {
        'recursive': true
      });
      console.log(_0x569376);
      return _0x569376;
    } catch (_0x98a196) {
      throw new Error("Error creating directory: " + _0x98a196);
    }
  }
  static ["saveQueryFile"](_0x3fb387, _0x5a2730) {
    const _0x5e6970 = a4_0x866b50.resolve(_0x3fb387, "query.txt");
    a4_0x12d436.writeFile(_0x5e6970, _0x5a2730, 'utf8', _0x4d743b => {
      if (_0x4d743b) {
        console.error("Error writing file:", _0x4d743b);
      } else {
        console.log("Query File Created/Modified Successfully.");
      }
    });
  }
  static ["random"](_0x420c4a, _0x4c8adb) {
    const _0x1fee15 = Math.floor(Math.random() * (_0x4c8adb - _0x420c4a + 0x1)) + _0x420c4a;
    return _0x1fee15;
  }
  static ['randomArr'](_0x1b25c2) {
    return _0x1b25c2[Math.floor(Math.random() * _0x1b25c2.length)];
  }
  static ["msToTime"](_0x5882d8) {
    const _0x4af077 = Math.floor(_0x5882d8 / 3600000);
    const _0x1d521e = _0x5882d8 % 3600000;
    const _0x35264f = Math.floor(_0x1d521e / 60000);
    const _0x2fba7c = _0x1d521e % 60000;
    const _0x134ce5 = Math.round(_0x2fba7c / 0x3e8);
    return _0x4af077 + " Hours " + _0x35264f + " Minutes " + _0x134ce5 + " Seconds";
  }
  static ['queryToJSON'](_0x2e491c) {
    try {
      const _0xb4939d = {};
      const _0x300136 = _0x2e491c.split('&');
      _0x300136.forEach(_0x5170a7 => {
        const [_0x147d85, _0x25b978] = _0x5170a7.split('=');
        if (_0x147d85 === 'user') {
          _0xb4939d[_0x147d85] = JSON.parse(decodeURIComponent(_0x25b978));
        } else {
          _0xb4939d[_0x147d85] = decodeURIComponent(_0x25b978);
        }
      });
      return _0xb4939d;
    } catch (_0x3224a6) {
      throw Error("Invalid Query");
    }
  }
  static ["generateRandomString"](_0x539a3b) {
    let _0xe8f8d0 = '';
    const _0x2dbd92 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length;
    for (let _0x1fc5bd = 0x0; _0x1fc5bd < _0x539a3b; _0x1fc5bd++) {
      _0xe8f8d0 += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * _0x2dbd92));
    }
    return _0xe8f8d0;
  }
  static ['readQueryFile'](_0x58ac31) {
    try {
      const _0x71faf6 = a4_0x866b50.resolve(_0x58ac31);
      const _0x1c21b8 = a4_0x12d436.readFileSync(_0x71faf6, "utf8");
      return _0x1c21b8;
    } catch (_0x1e122d) {
      console.log("No query.txt Files Found");
    }
  }
  static ["launchParamToQuery"](_0x302f01) {
    const _0xa7f4c6 = new URLSearchParams(_0x302f01);
    let _0x5465f9 = decodeURIComponent(_0xa7f4c6.get('tgWebAppData'));
    const _0x4c1214 = new URLSearchParams(_0x5465f9);
    let _0x2f8f98 = decodeURIComponent(_0x4c1214.get("user"));
    let _0x34c80c = JSON.parse(_0x2f8f98);
    const _0x14ff08 = {
      'query_id': _0x4c1214.get('query_id'),
      'user': _0x34c80c,
      'auth_date': _0x4c1214.get("auth_date"),
      'hash': _0x4c1214.get('hash')
    };
    const _0x3ed957 = JSON.stringify(_0x14ff08.user);
    const _0x481a10 = encodeURIComponent(_0x3ed957);
    let _0x5717e4 = '';
    if (_0x14ff08.query_id) {
      _0x5717e4 += 'query_id=' + encodeURIComponent(_0x14ff08.query_id) + '&';
    }
    _0x5717e4 += "user=" + _0x481a10 + "&auth_date=" + encodeURIComponent(_0x14ff08.auth_date) + "&hash=" + encodeURIComponent(_0x14ff08.hash);
    return _0x5717e4;
  }
  static ['isFuture'](_0x439f1d) {
    const _0x27d3fd = Date.now();
    return _0x439f1d > _0x27d3fd;
  }
  static ["getTimeLeftISO"](_0x5ba6d9) {
    const _0x1ceef6 = new Date().getTime();
    const _0x3741df = new Date(_0x5ba6d9).getTime();
    const _0x1e7910 = _0x3741df - _0x1ceef6;
    return _0x1e7910 > 0x0 ? _0x1e7910 : 0x0;
  }
  static [""]() {
    console.log("");
  }
}