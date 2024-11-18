import a3_0x19363d from 'input';
import { Helper } from '../utils/helper.js';
import { Api, TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions/StoreSession.js';
import a3_0x5d0544 from '../utils/logger.js';
import { FloodWaitError } from 'telegram/errors/RPCErrorList.js';
import { Config } from '../../config/config.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { LogLevel } from 'telegram/extensions/Logger.js';
export class Telegram {
  ['storeSession'];
  constructor() {
    this.accountName = 'accounts';
    this.url = 'https://birdx.birds.dog/';
    this.bot = 'birdx2_bot';
  }
  async ['init']() {
    try {
      await this.onBoarding();
    } catch (_0x2b7104) {
      console.log(_0x2b7104);
      a3_0x5d0544.error('' + JSON.stringify(_0x2b7104));
      throw _0x2b7104;
    }
  }
  async ["onBoarding"]() {
    try {
      let _0x174e97 = "Welcome to Bot \nBy : Nofan Rambe \n \nLet's Getting Started.\n \nYour Session List:\n";
      const _0x451630 = Helper.getSession('accounts');
      if (_0x451630.length == 0x0) {
        _0x174e97 += '<empty>';
      } else {
        for (const _0x5c0307 of _0x451630) {
          _0x174e97 += "- " + _0x5c0307 + "\n";
        }
      }
      _0x174e97 += "\n \nPlease Choose a menu: \n";
      _0x174e97 += "\n \n1. Create Account \n2. Reset Account \n3. Start Bot\n4. Query modification\n \nInput your choice :";
      const _0x40d065 = await a3_0x19363d.text(_0x174e97);
      if (_0x40d065 == 0x1) {
        await this.accountType();
      } else {
        if (_0x40d065 == 0x2) {
          Helper.resetAccounts();
          await Helper.delay(0xbb8);
          await this.onBoarding();
        } else {
          if (_0x40d065 == 0x3) {
            if (Helper.getSession(this.accountName)?.['length'] == 0x0) {
              console.info("You don't have any Accounts, please create first");
              await this.onBoarding();
            }
          } else {
            if (_0x40d065 == 0x4) {
              await this.queryModificaiton();
            } else {
              console.error("Invalid input, Please try again");
              await this.onBoarding();
            }
          }
        }
      }
    } catch (_0x2fae5f) {
      throw _0x2fae5f;
    }
  }
  async ['queryModificaiton']() {
    try {
      const _0x3b5c19 = Helper.getSession('accounts');
      const _0x53a31e = _0x3b5c19.filter(_0x356612 => _0x356612.includes('query'));
      let _0x2395ae = "Your Query Account List :\n \n";
      for (const _0x9e6b3c of _0x53a31e) {
        _0x2395ae += _0x3b5c19.indexOf(_0x9e6b3c) + 0x1 + ". " + _0x9e6b3c + "\n";
      }
      if (_0x53a31e.length == 0x0) {
        console.log("You dont have any Query Account.");
        await this.onBoarding();
      } else {
        _0x2395ae += "\n \nPlease Select Query Account for modification:";
      }
      const _0x463be6 = await a3_0x19363d.text(_0x2395ae);
      if (_0x53a31e[_0x463be6 - 0x1] != undefined) {
        const _0x2d0d6d = _0x53a31e[_0x463be6 - 0x1];
        this.accountName = "accounts/" + _0x2d0d6d;
        const _0x4d4dd0 = "Old Query : " + Helper.readQueryFile(this.accountName + '/query.txt') + "\n \nPlease Enter New Query ";
        const _0x1caf85 = await a3_0x19363d.text(_0x4d4dd0);
        await Helper.saveQueryFile(this.accountName, _0x1caf85);
        await Helper.delay(0xbb8);
        await this.onBoarding();
      } else {
        console.error("Invalid input, Please try again");
        await this.queryModificaiton();
      }
    } catch (_0x1adc64) {
      throw _0x1adc64;
    }
  }
  async ['sessionCreation']() {
    try {
      if (Config.TELEGRAM_APP_ID == undefined || Config.TELEGRAM_APP_HASH == undefined) {
        throw new Error("Please configure your TELEGRAM_APP_ID and TELEGRAM_APP_HASH first");
      }
      const _0x510c00 = Helper.getSession('accounts');
      let _0x3e98f8 = "Your Account List :\n \n";
      for (const _0xac7648 of _0x510c00) {
        _0x3e98f8 += _0x510c00.indexOf(_0xac7648) + 0x1 + ". " + _0xac7648 + "\n";
      }
      if (_0x510c00.length == 0x0) {
        _0x3e98f8 += "<empty> \n \nPlease enter Session Name :";
      } else {
        _0x3e98f8 += "\n \nYou already have sessions, cancel(CTRL+C) or create new Session :";
      }
      const _0x29d15e = await a3_0x19363d.text(_0x3e98f8);
      this.accountName = Helper.createDir("sessions-" + _0x29d15e);
      await this.useSession(this.accountName);
      await this.disconnect();
      a3_0x5d0544.info("Session " + this.accountName + " - Created");
      console.log("Session " + _0x29d15e + " - Created, Please Restart The Bot Again");
      this.storeSession.save();
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x1bc2a1) {
      throw _0x1bc2a1;
    }
  }
  async ["queryCreation"]() {
    try {
      const _0x2e9182 = Helper.getSession('accounts');
      let _0x17b740 = "Your Account List :\n \n";
      for (const _0x17717d of _0x2e9182) {
        _0x17b740 += _0x2e9182.indexOf(_0x17717d) + 0x1 + ". " + _0x17717d + "\n";
      }
      if (_0x2e9182.length == 0x0) {
        _0x17b740 += "<empty> \n \nPlease enter Account Name :";
      } else {
        _0x17b740 += "\n \nYou already have Account, cancel(CTRL+C) or create new Account :";
      }
      const _0x51880d = await a3_0x19363d.text(_0x17b740);
      this.accountName = Helper.createDir("query-" + _0x51880d);
      const _0x4c0869 = await a3_0x19363d.text("Please Enter Telegram Query : ");
      await Helper.saveQueryFile(this.accountName, _0x4c0869);
      a3_0x5d0544.info("Query " + this.accountName + " - Created");
      console.log("Query " + _0x51880d + " - Created, Please Restart The Bot Again");
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x594379) {
      throw _0x594379;
    }
  }
  async ['accountType']() {
    try {
      const _0x2b7dd8 = Helper.getSession("accounts");
      let _0x80de03 = "Your Account List :\n \n";
      if (_0x2b7dd8.length > 0x0) {
        for (const _0x321a10 of _0x2b7dd8) {
          _0x80de03 += _0x2b7dd8.indexOf(_0x321a10) + 0x1 + ". " + _0x321a10 + "\n";
        }
      } else {
        _0x80de03 += "<empty>\n";
      }
      _0x80de03 += "\n \nAvailable Account Type: \n1. Session \n2. Query\n \nPlease Entery Your Choice : ";
      const _0x45c488 = await a3_0x19363d.text(_0x80de03);
      if (_0x45c488 == 0x1) {
        await this.sessionCreation();
      } else if (_0x45c488 == 0x2) {
        await this.queryCreation();
      } else {
        console.log("Invalid Input");
        await this.accountType();
      }
    } catch (_0x1d26de) {
      throw _0x1d26de;
    }
  }
  async ['useSession'](_0x5eea68, _0x5c9676) {
    try {
      this.proxy = _0x5c9676;
      const _0x18d391 = {
        'connectionRetries': 0x5
      };
      if (this.proxy) {
        _0x18d391.agent = new HttpsProxyAgent(this.proxy);
      }
      this.storeSession = new StoreSession(_0x5eea68);
      this.client = new TelegramClient(this.storeSession, Config.TELEGRAM_APP_ID, Config.TELEGRAM_APP_HASH, _0x18d391);
      this.client.setLogLevel(LogLevel.ERROR);
      this.storeSession.save();
      await this.client.start({
        'phoneNumber': async () => await a3_0x19363d.text("Enter your Telegram Phone Number ?"),
        'password': async () => await a3_0x19363d.text("Enter your Telegram Password?"),
        'phoneCode': async () => await a3_0x19363d.text("Enter your Telegram Verification Code ?"),
        'onError': _0x1a8125 => {
          console.log(_0x1a8125.message);
        }
      });
    } catch (_0x1a6ee3) {
      throw _0x1a6ee3;
    }
  }
  async ['resolvePeer']() {
    try {
      a3_0x5d0544.info("Session " + this.session + " - Resolving Peer");
      while (this.peer == undefined) {
        try {
          this.peer = await this.client.getEntity(this.bot);
          break;
        } catch (_0x22b0eb) {
          if (_0x22b0eb instanceof FloodWaitError) {
            const _0x17873c = _0x22b0eb.seconds;
            a3_0x5d0544.warn(this.client.session.serverAddress + " | FloodWait " + _0x22b0eb);
            a3_0x5d0544.info(this.client.session.serverAddress + " | Sleep " + _0x17873c + 's');
            await Helper.delay((_0x17873c + 0x3) * 0x3e8);
          } else {
            throw _0x22b0eb;
          }
        }
      }
    } catch (_0x1643b1) {
      throw _0x1643b1;
    }
  }
  async ["disconnect"]() {
    await this.client.disconnect();
    await this.client.destroy();
    this.peer = undefined;
    this.accountName = undefined;
  }
  async ['initWebView']() {
    try {
      const _0x3c8ef5 = await this.client.invoke(new Api.messages.RequestAppWebView({
        'peer': this.bot,
        'app': new Api.InputBotAppShortName({
          'botId': await this.client.getInputEntity(this.bot),
          'shortName': "birdx"
        }),
        'writeAllowed': true,
        'platform': 'android',
        'startParam': Helper.creator,
        'compact': true
      }));
      a3_0x5d0544.info("Session " + this.session + " - Webview Connected");
      const _0x32c0ae = _0x3c8ef5.url;
      return Helper.getQueryFromUrl(_0x32c0ae);
    } catch (_0x32addd) {
      throw _0x32addd;
    }
  }
}