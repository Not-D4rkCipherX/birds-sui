import { HttpsProxyAgent } from 'https-proxy-agent';
import { Helper } from '../utils/helper.js';
import a1_0xe62dfb from '../utils/logger.js';
import a1_0x3c1843 from 'https';
import a1_0x5ea73a from 'node-fetch';
export class API {
  constructor(_0x359089, _0x3356dd, _0x4a1854, _0x369e53, _0x5d4fcc, _0x21aedc) {
    this.url = _0x369e53;
    this.queryObj = _0x3356dd;
    this.origin = _0x5d4fcc;
    this.referer = _0x21aedc;
    this.ua = Helper.randomUserAgent();
    this.query = _0x359089;
    this.proxy = _0x4a1854;
  }
  async ['generateHeaders'](_0x34c7b0 = this.query) {
    const _0x3f1653 = {
      'Accept': "application/json, text/plain, */*",
      'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': 'cors',
      'User-Agent': this.ua,
      'Origin': this.origin
    };
    if (_0x34c7b0) {
      _0x3f1653.telegramAuth = "tma " + _0x34c7b0;
    }
    return _0x3f1653;
  }
  async ['fetch'](_0x176edb, _0x2c0cff = 'GET', _0x5cd052, _0x5d5beb = {}, _0x588c02 = {}, _0xcab43d = false) {
    try {
      const _0x15d27d = _0xcab43d ? _0x176edb : '' + this.url + _0x176edb;
      const _0x38bbdb = {
        ...(await this.generateHeaders(_0x5cd052)),
        ..._0x588c02
      };
      a1_0xe62dfb.info(_0x2c0cff + " : " + _0x15d27d + " " + (this.proxy ? this.proxy : ''));
      a1_0xe62dfb.info("Request Header : " + JSON.stringify(_0x38bbdb));
      a1_0xe62dfb.info("Request Body : " + JSON.stringify(_0x5d5beb));
      const _0x1545a9 = {
        'method': _0x2c0cff,
        'headers': _0x38bbdb,
        'agent': this.proxy ? new HttpsProxyAgent(this.proxy) : new a1_0x3c1843.Agent({
          'rejectUnauthorized': false
        }),
        'body': _0x2c0cff !== "GET" ? JSON.stringify(_0x5d5beb) : undefined,
        'Referer': this.referer
      };
      const _0x5c8cdd = await a1_0x5ea73a(_0x15d27d, _0x1545a9);
      const _0xb0de03 = _0x5c8cdd.headers.get('Content-Type');
      let _0x31cdc4;
      if (_0xb0de03 && _0xb0de03.includes('application/json')) {
        _0x31cdc4 = await _0x5c8cdd.json();
      } else {
        _0x31cdc4 = {
          'message': await _0x5c8cdd.text()
        };
      }
      const _0x8b5f20 = {
        'status': _0x5c8cdd.status,
        ..._0x31cdc4
      };
      a1_0xe62dfb.info("Response : " + _0x5c8cdd.status + " " + _0x5c8cdd.statusText);
      a1_0xe62dfb.info("Response Data : " + JSON.stringify(_0x31cdc4).substring(0x0, 0x96) + "...");
      return _0x8b5f20;
    } catch (_0x22fefe) {
      a1_0xe62dfb.error("Error : " + _0x22fefe.message);
      if (_0x22fefe.response && _0x22fefe.response.status === 0x190) {
        const _0x58c13b = {
          'status': _0x22fefe.response.status,
          ...(await _0x22fefe.response.json())
        };
        return _0x58c13b;
      } else {
        if (_0x22fefe.response && _0x22fefe.response.status === 0x1ad) {
          throw Error(_0x22fefe.response.status + " - " + _0x22fefe.message);
        } else {
          if (_0x22fefe.response && (_0x22fefe.response.status === 0x1f8 || _0x22fefe.response.status === 0x194)) {
            console.error("DETECT API CHANGE.. EXIT");
            await process.exit();
          } else {
            throw _0x22fefe;
          }
        }
      }
    }
  }
}