import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import { Core } from './src/core/core.js';
import { Telegram } from './src/core/telegram.js';
import { Helper } from './src/utils/helper.js';
import a0_0x37ebe1 from './src/utils/logger.js';
import a0_0x1f5336 from './src/utils/twist.js';
async function operation(_0x5517eb, _0x5d390a, _0x1e2d43, _0x24c5de) {
  const _0x266bf3 = new Core(_0x5517eb, _0x5d390a, _0x1e2d43, _0x24c5de);
  await _0x266bf3.getUserInfo(true);
  await _0x266bf3.getIncubateInfo(true);
  if (_0x266bf3.useOnchain) {
    if (Config.USERWALLET.length == 0x0) {
      throw Error("Please Provide Wallet For Each Account");
    }
    await _0x266bf3.initWallet();
    await _0x266bf3.presignedCheckIn();
    if (_0x266bf3.address) {
      await _0x266bf3.getLockedWorm();
      for (const _0x17b085 of _0x266bf3.lockedWorm) {
        await _0x266bf3.presignedUnlockWorm(_0x17b085);
        if (_0x266bf3.preUnlockWormCd) {
          break;
        }
      }
      await _0x266bf3.getOnChainWorm(true);
      if (_0x266bf3.onChainWorm) {
        for (const _0x31ec7e of _0x266bf3.onChainWorm.filter(_0x34b3a2 => _0x34b3a2.state == 'pre_minted')) {
          const _0x381f10 = await _0x266bf3.getWormDetails(_0x31ec7e);
          if (_0x381f10) {
            await _0x266bf3.depositWormNft(_0x381f10);
          } else {
            break;
          }
        }
        await _0x266bf3.getOnChainWorm();
      }
    }
    if (_0x266bf3.incubate.level >= 0x15 && _0x266bf3.address) {
      await _0x266bf3.getPreyInfo();
      await _0x266bf3.getUnlockedWorm();
      let _0x1ece21 = _0x266bf3.hunt.hunting.energy ?? 0x0;
      let _0x3e2b4c = _0x266bf3.hunt.hunt.maxEnergy;
      while (_0x1ece21 != _0x3e2b4c && !_0x266bf3.preFeedingCd) {
        if (_0x266bf3.stillHunting) {
          await _0x266bf3.presignedClaim();
        }
        const _0x196f46 = _0x3e2b4c - _0x1ece21;
        const _0x2b764f = _0x266bf3.unlockedWorm;
        if (_0x2b764f.length == 0x0) {
          break;
        }
        const _0x2b4cce = _0x2b764f.sort((_0x76bd39, _0x24e48b) => _0x76bd39.reward - _0x24e48b.reward);
        function _0x5d5e80(_0x5e1271, _0x33db00) {
          const _0xc64d1c = [];
          let _0x5e4657 = _0x5e1271;
          for (const _0x34590d of _0x33db00) {
            const _0x43652f = _0x5e4657 - 0x14;
            if (_0x43652f >= 0x0) {
              _0xc64d1c.push(_0x34590d);
            } else {
              _0xc64d1c.push(_0x34590d);
            }
            _0x5e4657 = _0x43652f;
            if (_0x5e4657 <= 0x0) {
              break;
            }
          }
          return _0xc64d1c;
        }
        const _0x156c90 = _0x5d5e80(_0x196f46, _0x2b4cce);
        for (const _0xb72698 of _0x156c90) {
          if (!_0x266bf3.preFeedingCd) {
            await _0x266bf3.presignedFeeding(_0xb72698);
          } else {
            break;
          }
        }
        await _0x266bf3.getUnlockedWorm();
        await _0x266bf3.getPreyInfo();
        _0x1ece21 = _0x266bf3.hunt.hunting.energy;
        _0x3e2b4c = _0x266bf3.hunt.hunt.maxEnergy;
      }
      await _0x266bf3.presignedHunting();
    }
  }
  if (!_0x266bf3.incubate) {
    await _0x266bf3.upgradeEgg();
  } else {
    if (_0x266bf3.user.balance >= _0x266bf3.incubate.nextLevel.birds && !Helper.isFuture(_0x266bf3.incubate.upgradedAt + _0x266bf3.incubate.duration * 0xea60 * 0x3c)) {
      await _0x266bf3.confirmUpgrade();
      await _0x266bf3.upgradeEgg();
    }
  }
  await _0x266bf3.getWormInfo();
  if (_0x266bf3.worm && _0x266bf3.worm.status == 'MINT_OPEN') {
    await _0x266bf3.catchWorm();
  }
  await _0x266bf3.joinEggBreaking(true);
  if (_0x266bf3.game) {
    while (_0x266bf3.game.turn != 0x0) {
      await _0x266bf3.breakEgg();
    }
    if (_0x266bf3.game.turn != undefined) {
      await _0x266bf3.claimEggGame();
    }
  }
  const _0x159b9f = Helper.random(1800000, 3600000);
  await Helper.delay(_0x159b9f, _0x5517eb, "Account " + _0x5517eb.id + " Processing Complete, Restarting in " + Helper.msToTime(_0x159b9f), _0x266bf3);
  await operation(_0x5517eb, _0x5d390a, _0x1e2d43, _0x24c5de);
}
let init = false;
async function startBot() {
  return new Promise(async (_0x103f83, _0x2bfcfc) => {
    try {
      a0_0x37ebe1.info("BOT STARTED");
      const _0x3bb658 = await new Telegram();
      if (init == false) {
        await _0x3bb658.init();
        init = true;
      }
      const _0xca8cb1 = Helper.getSession("accounts");
      const _0x11086e = [];
      if (proxyList.length > 0x0) {
        if (_0xca8cb1.length != proxyList.length) {
          _0x2bfcfc("You have " + _0xca8cb1.length + " Session but you provide " + proxyList.length + " Proxy");
        }
      }
      for (const _0x1b4cbf of _0xca8cb1) {
        const _0xaf7ce6 = _0xca8cb1.indexOf(_0x1b4cbf);
        const _0x30a78d = proxyList.length > 0x0 ? proxyList[_0xaf7ce6] : undefined;
        if (!_0x1b4cbf.includes("query")) {
          await _0x3bb658.useSession('accounts/' + _0x1b4cbf, _0x30a78d);
          _0x3bb658.session = _0x1b4cbf;
          const _0x576358 = await _0x3bb658.client.getMe();
          _0x576358.type = 'sessions';
          _0x576358.accounts = 'accounts/' + _0x1b4cbf;
          _0x576358.id = _0x576358.id.value;
          const _0x476a7b = await _0x3bb658.resolvePeer().then(async () => {
            return await _0x3bb658.initWebView();
          })["catch"](_0x1f1768 => {
            throw _0x1f1768;
          });
          const _0xc0aafc = Helper.queryToJSON(_0x476a7b);
          await _0x3bb658.disconnect();
          _0x11086e.push([_0x576358, _0x476a7b, _0xc0aafc, _0x30a78d]);
        } else {
          let _0x44aded = Helper.readQueryFile('accounts/' + _0x1b4cbf + '/query.txt');
          let _0x1cb446 = Helper.queryToJSON(_0x44aded);
          if (!_0x1cb446.user) {
            _0x1cb446 = await Helper.queryToJSON(await Helper.launchParamToQuery(_0x44aded));
            _0x44aded = await Helper.launchParamToQuery(_0x44aded);
          }
          const _0x14cbaf = _0x1cb446.user;
          _0x14cbaf.type = 'query';
          _0x14cbaf.accounts = 'accounts/' + _0x1b4cbf;
          _0x14cbaf.firstName = _0x14cbaf.first_name;
          _0x14cbaf.lastName = _0x14cbaf.last_name;
          _0x11086e.push([_0x14cbaf, _0x44aded, _0x1cb446, _0x30a78d]);
        }
      }
      const _0xfc8d45 = _0x11086e.map(async _0x11644b => {
        await operation(_0x11644b[0x0], _0x11644b[0x1], _0x11644b[0x2], _0x11644b[0x3]);
      });
      await Promise.all(_0xfc8d45);
      _0x103f83();
    } catch (_0xeb073c) {
      a0_0x37ebe1.info("BOT STOPPED");
      a0_0x37ebe1.error(JSON.stringify(_0xeb073c));
      _0x2bfcfc(_0xeb073c);
    }
  });
}
(async () => {
  try {
    a0_0x37ebe1.clear();
    a0_0x37ebe1.info('');
    a0_0x37ebe1.info("Application Started");
    console.log("BIRDS SUI BOT");
    console.log();
    console.log("Author : Nofan Rambe");
    console.log("Welcome & Enjoy Sir!");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    await startBot();
  } catch (_0x4bed82) {
    await a0_0x1f5336.clear();
    await a0_0x1f5336.clearInfo();
    console.log("Error During executing bot", _0x4bed82);
    await startBot();
  }
})();