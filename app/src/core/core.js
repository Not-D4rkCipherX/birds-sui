import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { API } from '../api/api.js';
import { Helper } from '../utils/helper.js';
import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import { Config } from '../../config/config.js';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';
import a2_0x13fefe from '../utils/logger.js';
export class Core extends API {
  constructor(_0xee6f70, _0x3fced6, _0x5893e4, _0x26ed58) {
    super(_0x3fced6, _0x5893e4, _0x26ed58, 'https://api.birds.dog', 'https://birdx.birds.dog', 'https://birdx.birds.dog/');
    this.account = _0xee6f70;
    this.query = _0x3fced6;
    this.queryObj = _0x5893e4;
    this.useOnchain = Config.USEONCHAINTX ?? false;
    this.preUnlockWormCd = false;
    this.preFeedingCd = false;
    this.stillHunting = false;
    this.BIRDSENUM = {
      'PACKAGE_ID': '0x64254dd3675459aae82e063ed6276f99fe23616f75fdb0b683f5d2c6024a0bd7',
      'PACKAGE_ID_2': '0x59f4fd9b3928b8358ce60335d15b6b6848f094d0deb64238b0535a99e4e13e4a',
      'PACKAGE_ID_2_2': "0x72962f3a746a10a08234d1db3b495b3fc137760998573413ae9e742618c241ab",
      'NFTPACKAGE_ID': '0xe2e210143e1f8646c1ec4d63e56e75f035ee98e8ffdb868ac6ed5b0e9f57b7a2',
      'NFTPACKAGE_ID_2': '0x38dba0f0cf9a80c9b9debf580c82f89bb0de4577e6fb448b3ba2ee9e05d539bc',
      'NFTVAULT': "0x7732ced77345bda8c826090f48a0c84ed41499e37bf77d14869dd1b95c25f8dd",
      'NFTMARKETVERSION': "0x5d859833b5739664df20148ea1b1de1fe3ce82f832bfeb2472a23eb8a6707a4c",
      'NFTREGID': "0x5cfc296be7f0b72fa086d05979aca44ab1f05270306eec5261163bd7b125cc67",
      'BIRD_STORE_ID': "0x2d942791de55513d1cae2529acd14b64624919c1ee32dcf3d187c0dcd0c2c04f",
      'BIRD_REG_ID': '0xbb3027323ed2192c41ca849c61a24cb328222ba332a036cdf82f1d2cc2ebe15e',
      'BIRD_VERSION_ID': '0x41ee63984e12557a40329acdc6f77eaea2e59ccc19d9f5a4e8fdd1582f45d2ef',
      'BIRD_VERSION_ID_2': "0xe22dc39f6a210c0d805e6e97b30bd114b3c7e9c604252022d194d6bb65c012ef",
      'BIRD_STORE_ID_2': "0xf0c180e15b51e8b61fa6b0d1c862d4f2daaa5001ea6c04b8972778a9c499131d",
      'BIRD_REG_ID_2': '0x6bca295fb6cc0c7b9cf194f4aa84d7e611643f49a7c9bfd6d996f220b952107f',
      'BIRD_CLOCK': '0x06',
      'CAPTCHA_SITE_KEY': '0x4AAAAAAAxZxbYxrxkqJ4jj'
    };
  }
  async ['getWalletAddress']() {
    await Helper.delay(0x3e8, this.account, "Getting Wallet Address...", this);
    this.client = new SuiClient({
      'url': getFullnodeUrl('mainnet')
    });
    const _0x2b2a85 = Config.USERWALLET.find(_0x264b1a => _0x264b1a[0x1] == this.account.accounts);
    if (!_0x2b2a85) {
      return false;
    } else {
      const _0x3a10f6 = decodeSuiPrivateKey(_0x2b2a85[0x0]);
      this.wallet = Ed25519Keypair.fromSecretKey(_0x3a10f6.secretKey);
      this.address = this.wallet.getPublicKey().toSuiAddress();
      await Helper.delay(0x3e8, this.account, "Successfully Get Wallet Address " + this.address + "...", this);
      return true;
    }
  }
  async ["registerArchieve"](_0x2462ef, _0x384442) {
    await Helper.delay(0x3e8, this.account, "User not registering to Birds Archive yet, Try to Register...", this);
    let _0x71808;
    const _0x112c27 = new Transaction();
    let _0x47778b = [];
    if (_0x384442 == 'mineBird') {
      _0x71808 = this.BIRDSENUM.PACKAGE_ID + '::bird_entries::register';
      _0x47778b.push(_0x112c27.object(this.BIRDSENUM.BIRD_REG_ID));
      _0x47778b.push(_0x112c27.object(this.BIRDSENUM.BIRD_VERSION_ID));
    } else {
      if (_0x384442 == "depositWormNft") {
        _0x71808 = this.BIRDSENUM.NFTPACKAGE_ID + '::xbird_entries::register';
        _0x47778b.push(_0x112c27.object(this.BIRDSENUM.NFTREGID));
      } else {
        _0x71808 = this.BIRDSENUM.PACKAGE_ID_2 + '::bird_entries::register';
        _0x47778b.push(_0x112c27.object(this.BIRDSENUM.BIRD_REG_ID));
        _0x47778b.push(_0x112c27.object(this.BIRDSENUM.BIRD_VERSION_ID));
      }
    }
    await _0x112c27.moveCall({
      'target': _0x71808,
      'arguments': _0x47778b
    });
    await this.executeTx(_0x112c27);
    if (_0x384442 == 'mineBird') {
      await this.mineBird(_0x2462ef);
    } else {
      if (_0x384442 == 'catchWorm') {
        await this.catchWormTx(_0x2462ef);
      } else {
        if (_0x384442 == "feedWorm") {
          await this.feedBird(_0x2462ef);
        } else {
          if (_0x384442 == 'preyBird') {
            await this.preyBird(_0x2462ef);
          } else {
            if (_0x384442 == "claimPreyReward") {
              await this.claimPreyBird(_0x2462ef);
            } else if (_0x384442 == 'depositWormNft') {
              await this.depositWormNft(_0x2462ef);
            }
          }
        }
      }
    }
  }
  async ["checkUserArchieve"](_0x29e083, _0x20fa2f) {
    await Helper.delay(0x3e8, this.account, "Checking User Assets...", this);
    const _0x2bf086 = await this.client.getOwnedObjects({
      'owner': this.address,
      'options': {
        'showType': true
      }
    });
    let _0x265715;
    let _0x208d20;
    if (_0x20fa2f == "mineBird") {
      _0x265715 = this.BIRDSENUM.PACKAGE_ID;
      _0x208d20 = _0x265715 + '::bird::BirdArchieve';
    } else if (_0x20fa2f == 'depositWormNft') {
      _0x265715 = this.BIRDSENUM.NFTPACKAGE_ID_2;
      _0x208d20 = _0x265715 + '::archieve::UserArchieve';
    } else {
      _0x265715 = this.BIRDSENUM.PACKAGE_ID_2;
      _0x208d20 = _0x265715 + '::bird::BirdArchieve';
    }
    const _0xef0be = _0x2bf086.data.find(_0x5a26dc => _0x5a26dc.data.type == '' + _0x208d20);
    if (_0xef0be != undefined) {
      a2_0x13fefe.info("USER HAVE ARCHIEVE");
      return _0xef0be.data.objectId;
    } else {
      a2_0x13fefe.info("USER DON'T HAVE ARCHIEVE");
      await this.registerArchieve(_0x29e083, _0x20fa2f);
    }
  }
  async ['mineBird'](_0x1da05b) {
    try {
      await Helper.delay(0x3e8, this.account, "Trying to do mineBird Transaction...", this);
      const _0x1cfc9c = await this.checkUserArchieve(_0x1da05b, 'mineBird');
      const _0x515703 = new Transaction();
      const _0x1313ff = [_0x515703.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(_0x1da05b.signature, 'hex')).toBytes()), _0x515703.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(_0x1da05b.message, 'hex')).toBytes()), _0x515703.object(this.BIRDSENUM.BIRD_STORE_ID)];
      await _0x515703.moveCall({
        'target': this.BIRDSENUM.PACKAGE_ID + '::bird_entries::mineBird',
        'arguments': [..._0x1313ff, _0x515703.object(_0x1cfc9c), _0x515703.object(this.BIRDSENUM.BIRD_CLOCK), _0x515703.object(this.BIRDSENUM.BIRD_VERSION_ID)]
      });
      _0x515703.setGasBudget(0x16e360n);
      const _0x55e982 = await this.executeTx(_0x515703);
      await this.confirmCheckIn(_0x1da05b.token, _0x55e982.digest);
    } catch (_0x41e3a4) {
      throw _0x41e3a4;
    }
  }
  async ["catchWormTx"](_0x353e32) {
    try {
      await Helper.delay(0x3e8, this.account, "Trying to do catchWorm Transaction...", this);
      const _0x4bc45c = await this.checkUserArchieve(_0x353e32, "catchWorm");
      const _0x49b39d = new Transaction();
      const _0x232b42 = [_0x49b39d.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(_0x353e32.signature.data)).toBytes()), _0x49b39d.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(_0x353e32.message.data)).toBytes()), _0x49b39d.object(this.BIRDSENUM.BIRD_STORE_ID_2)];
      await _0x49b39d.moveCall({
        'target': this.BIRDSENUM.PACKAGE_ID_2_2 + "::bird_entries::catchWorm",
        'arguments': [..._0x232b42, _0x49b39d.object(_0x4bc45c), _0x49b39d.object(this.BIRDSENUM.BIRD_CLOCK), _0x49b39d.object(this.BIRDSENUM.BIRD_VERSION_ID_2)]
      });
      _0x49b39d.setGasBudget(0x16e360n);
      await this.executeTx(_0x49b39d);
      await Helper.delay(0x3e8, this.account, "Successfuly to do catchWorm Transaction, Wait for Block Confirmation...", this);
    } catch (_0x43dbd9) {
      throw _0x43dbd9;
    }
  }
  async ["depositWormNft"](_0x3265f6) {
    try {
      await Helper.delay(0xbb8, this.account, "Trying to do deposit on chain worm...", this);
      const _0x2de396 = await this.checkUserArchieve(_0x3265f6, "depositWormNft");
      const _0x2566a7 = new Transaction();
      const _0xea052e = _0x2566a7.splitCoins(_0x2566a7.gas, [_0x3265f6.fee]);
      const _0x5046ad = [_0x2566a7.pure(bcs.vector(bcs.u8()).serialize(Uint8Array.from(Buffer.from(_0x3265f6.signature, 'hex'))).toBytes()), _0x2566a7.pure(bcs.vector(bcs.u8()).serialize(Uint8Array.from(Buffer.from(_0x3265f6.msg, "hex"))).toBytes()), _0x2566a7.object(this.BIRDSENUM.NFTVAULT)];
      await _0x2566a7.moveCall({
        'target': this.BIRDSENUM.NFTPACKAGE_ID + "::xbird_entries::depositNft",
        'arguments': [..._0x5046ad, _0x2566a7.object(_0x2de396), _0x2566a7.object(_0xea052e), _0x2566a7.object(this.BIRDSENUM.NFTMARKETVERSION), _0x2566a7.object(this.BIRDSENUM.BIRD_CLOCK)]
      });
      _0x2566a7.setGasBudget(0x4c4b40n);
      await this.executeTx(_0x2566a7);
      await this.getOnChainWorm();
      await Helper.delay(0x1388, this.account, "Successfuly to do deposit Nft Transaction " + this.onChainWorm.filter(_0x408ea1 => _0x408ea1.state == 'pre_minted').length + " Left, Wait for Block Confirmation...", this);
    } catch (_0x475f3a) {
      throw _0x475f3a;
    }
  }
  async ['feedBird'](_0x286ec5) {
    try {
      await Helper.delay(0x3e8, this.account, "Trying to do feedBird Transaction...", this);
      const _0x3fd07f = await this.checkUserArchieve(_0x286ec5, "feedBird");
      const _0x4649cf = new Transaction();
      const _0x2d4b52 = [_0x4649cf.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(_0x286ec5.signature, 'hex')).toBytes()), _0x4649cf.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(_0x286ec5.message, "hex")).toBytes()), _0x4649cf.object(this.BIRDSENUM.BIRD_STORE_ID_2)];
      await _0x4649cf.moveCall({
        'target': this.BIRDSENUM.PACKAGE_ID_2 + '::bird_entries::feedWorm',
        'arguments': [..._0x2d4b52, _0x4649cf.object(_0x3fd07f), _0x4649cf.object(this.BIRDSENUM.BIRD_CLOCK), _0x4649cf.object(this.BIRDSENUM.BIRD_VERSION_ID_2)]
      });
      _0x4649cf.setGasBudget(0x16e360n);
      const _0x576d57 = await this.executeTx(_0x4649cf);
      await this.confirmFeeding(_0x286ec5.token, _0x576d57.digest);
    } catch (_0x37156b) {
      throw _0x37156b;
    }
  }
  async ["preyBird"](_0xadc076) {
    try {
      await Helper.delay(0x3e8, this.account, "Trying to do preyBird Transaction...", this);
      const _0x962e21 = await this.checkUserArchieve(_0xadc076, "preyBird");
      const _0x56329f = new Transaction();
      const _0x1d3523 = [_0x56329f.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(_0xadc076.signature, "hex")).toBytes()), _0x56329f.pure(bcs.vector(bcs.u8()).serialize(Buffer.from(_0xadc076.message, "hex")).toBytes()), _0x56329f.object(this.BIRDSENUM.BIRD_STORE_ID_2)];
      await _0x56329f.moveCall({
        'target': this.BIRDSENUM.PACKAGE_ID_2 + "::bird_entries::preyBird",
        'arguments': [..._0x1d3523, _0x56329f.object(_0x962e21), _0x56329f.object(this.BIRDSENUM.BIRD_CLOCK), _0x56329f.object(this.BIRDSENUM.BIRD_VERSION_ID_2)]
      });
      _0x56329f.setGasBudget(0x16e360n);
      const _0x3176ca = await this.executeTx(_0x56329f);
      await this.confirmHunt(_0xadc076.token, _0x3176ca.digest);
    } catch (_0x3f7f06) {
      throw _0x3f7f06;
    }
  }
  async ["claimPreyBird"](_0x1b02f2) {
    try {
      await Helper.delay(0x3e8, this.account, "Trying to do Claim Prey Reward Transaction...", this);
      const _0x45f644 = await this.checkUserArchieve(_0x1b02f2, 'claimPreyReward');
      const _0x13b047 = new Transaction();
      await _0x13b047.moveCall({
        'target': this.BIRDSENUM.PACKAGE_ID_2 + '::bird_entries::claimPreyReward',
        'arguments': [_0x13b047.object(_0x45f644), _0x13b047.object(this.BIRDSENUM.BIRD_CLOCK), _0x13b047.object(this.BIRDSENUM.BIRD_VERSION_ID_2)]
      });
      _0x13b047.setGasBudget(0x16e360n);
      const _0xd53e2d = await this.executeTx(_0x13b047);
      await this.confirmClaimPrey(_0x1b02f2.token, _0xd53e2d.digest);
    } catch (_0x16b132) {
      throw _0x16b132;
    }
  }
  async ['executeTx'](_0x39ede0) {
    try {
      await Helper.delay(0x3e8, this.account, "Executing Tx ...", this);
      a2_0x13fefe.info(await _0x39ede0.toJSON());
      const _0x509c9f = await this.client.signAndExecuteTransaction({
        'signer': this.wallet,
        'transaction': _0x39ede0
      });
      await Helper.delay(0xbb8, this.account, "Tx Executed : " + ('https://suivision.xyz/txblock/' + _0x509c9f.digest), this);
      return _0x509c9f;
    } catch (_0x3b4ae8) {
      if (_0x3b4ae8.message.includes("No valid gas coins")) {
        this.useOnchain = false;
        await Helper.delay(0x1388, this.account, _0x3b4ae8.message + ", Please fill up your SUI", this);
      } else {
        throw _0x3b4ae8;
      }
    }
  }
  async ['getUserInfo'](_0x31e7b0 = false) {
    try {
      if (_0x31e7b0) {
        await Helper.delay(0x3e8, this.account, "Getting Game Information...", this);
      }
      const _0x22a9eb = await this.fetch('/user', 'GET');
      if (_0x22a9eb.status == 0xc8) {
        this.user = _0x22a9eb;
        if (_0x31e7b0) {
          await Helper.delay(0x3e8, this.account, "Successfully Get User Information", this);
        }
      } else {
        throw Error("Failed To Get Game Information : " + _0x22a9eb.status + " - " + _0x22a9eb.message);
      }
    } catch (_0x417a04) {
      throw _0x417a04;
    }
  }
  async ["getIncubateInfo"](_0xefcec1 = false) {
    try {
      if (_0xefcec1) {
        await Helper.delay(0x3e8, this.account, "Getting Incubation Information...", this);
      }
      const _0x505280 = await this.fetch('/minigame/incubate/info', 'GET');
      if (_0x505280.status != 0x190) {
        this.incubate = _0x505280;
        if (_0xefcec1) {
          await Helper.delay(0x3e8, this.account, "Successfully Get Incubation Information", this);
        }
      } else {
        if (_0xefcec1) {
          await Helper.delay(0x3e8, this.account, _0x505280.message, this);
        }
      }
    } catch (_0x16fdc2) {
      throw _0x16fdc2;
    }
  }
  async ["upgradeEgg"]() {
    try {
      await Helper.delay(0x7d0, this.account, "Try To Upgrading Egg...", this);
      const _0x20fcec = await this.fetch('/minigame/incubate/upgrade', 'GET');
      if (_0x20fcec.status == 0xc8) {
        this.incubate = _0x20fcec;
        await Helper.delay(0x7d0, this.account, "Successfully Start Incubating Egg", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x20fcec.message, this);
      }
    } catch (_0x49c563) {
      throw _0x49c563;
    }
  }
  async ['confirmUpgrade']() {
    try {
      await Helper.delay(0x3e8, this.account, "Confirming Upgrade...", this);
      const _0x20325e = await this.fetch('/minigame/incubate/confirm-upgraded', 'POST');
      if (_0x20325e.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "Successfully Confirming Upgrade", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x20325e.message, this);
      }
    } catch (_0x566551) {
      throw _0x566551;
    }
  }
  async ['getWormInfo']() {
    try {
      await Helper.delay(0x3e8, this.account, "Getting Worm Info...", this);
      const _0x23c45b = await this.fetch('https://worm.birds.dog/worms/mint-status', "GET", undefined, undefined, {
        'Authorization': "tma " + this.query
      }, true);
      if (_0x23c45b.status == 0xc8) {
        this.worm = _0x23c45b.data;
        await Helper.delay(0x3e8, this.account, "Successfully Get Worm Mint Information", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x23c45b.message, this);
      }
    } catch (_0x435dc8) {
      throw _0x435dc8;
    }
  }
  async ['getPreyInfo']() {
    try {
      await Helper.delay(0x3e8, this.account, "Getting User Preying Information...", this);
      const _0xb1d2c0 = await this.fetch("https://wallet.birds.dog/tasks/hunt-info", 'GET', undefined, undefined, {
        'Authorization': "tma " + this.query
      }, true);
      if (_0xb1d2c0.status == 0xc8) {
        this.hunt = _0xb1d2c0;
        await Helper.delay(0x3e8, this.account, "Successfully Get Preying Information", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0xb1d2c0.message, this);
      }
    } catch (_0x4c9750) {
      throw _0x4c9750;
    }
  }
  async ['getUnlockedWorm']() {
    try {
      await Helper.delay(0x3e8, this.account, "Getting User Unlocked Worm Information...", this);
      const _0x1c0b48 = await this.fetch('https://worm.birds.dog/worms/me?page=1&perPage=50', 'GET', undefined, undefined, {
        'Authorization': "tma " + this.query
      }, true);
      if (_0x1c0b48.status == 0xc8) {
        this.unlockedWorm = _0x1c0b48.data;
        await Helper.delay(0x3e8, this.account, "Successfully Get User Unlocked Worm Information", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x1c0b48.message, this);
      }
    } catch (_0x3c31b4) {
      throw _0x3c31b4;
    }
  }
  async ['presignedCheckIn']() {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Trying to Pre Signed CheckIn...", this);
        const _0x76385d = await this.fetch("https://wallet.birds.dog/tasks/presigned-checkin", 'POST', undefined, {
          'type': "0x1",
          'address': this.address
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0x76385d.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Pre Signed Check In", this);
          await this.mineBird(_0x76385d);
        } else {
          await Helper.delay(0x3e8, this.account, _0x76385d.message, this);
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x104484) {
      await Helper.delay(0xbb8, this.account, _0x104484.message, this);
    }
  }
  async ['presignedFeeding'](_0x2c0ea4) {
    try {
      if (this.address) {
        await Helper.delay(0x7d0, this.account, "Trying to Pre Signed Feeding...", this);
        const _0xe9f7c1 = await this.fetch('https://wallet.birds.dog/tasks/presigned-feeding', "POST", undefined, {
          'type': 0x2,
          'address': this.address,
          'wallet': {},
          'wormType': _0x2c0ea4.type
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0xe9f7c1.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Pre Signed Feeding", this);
          await this.feedBird(_0xe9f7c1);
        } else {
          await Helper.delay(0x3e8, this.account, "Feeding - " + _0xe9f7c1.message, this);
          if (_0xe9f7c1.message) {
            if (_0xe9f7c1.message.includes('HUNT_NOT_AVAILABLE')) {
              this.stillHunting = true;
            }
          }
          this.preFeedingCd = true;
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x5182af) {
      await Helper.delay(0xbb8, this.account, _0x5182af.message, this);
    }
  }
  async ['presignedUnlockWorm'](_0xb7636f) {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Trying to Pre Unlocked Worm with ID " + _0xb7636f.uid + " (" + _0xb7636f.type + ')...', this);
        const _0x342f67 = await this.fetch('https://market.birds.dog/swaps/deposit/nft/create-req', 'POST', undefined, {
          'receiver': this.address,
          'xids': [_0xb7636f.uid]
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0x342f67.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Pre Unlock Worm With id " + _0xb7636f.uid + " (" + _0xb7636f.type + ") Worm is Now pre_minted", this);
        } else {
          await Helper.delay(0xbb8, this.account, _0x342f67.status + " - " + Helper.msToTime(Helper.getTimeLeftISO(_0x342f67.unlockAt)), this);
          this.preUnlockWormCd = true;
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x389d3b) {
      await Helper.delay(0xbb8, this.account, _0x389d3b.message, this);
    }
  }
  async ["getOnChainWorm"](_0x553779 = false) {
    try {
      if (this.address) {
        if (_0x553779) {
          await Helper.delay(0x3e8, this.account, "Trying to Get On Chain Worm", this);
        }
        const _0x4d81b2 = await this.fetch('https://market.birds.dog/storages/on-chain?owner=' + this.address + "&page=1&perPage=20", "GET", undefined, undefined, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0x4d81b2.status == 0xc8) {
          this.onChainWorm = _0x4d81b2.data.nfts;
          if (_0x553779) {
            await Helper.delay(0x3e8, this.account, "Successfully Get On Chain Worm", this);
          }
        } else {
          await Helper.delay(0xbb8, this.account, _0x4d81b2.status + " - " + Helper.msToTime(Helper.getTimeLeftISO(_0x4d81b2.unlockAt)), this);
          this.preUnlockWormCd = true;
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x530270) {
      await Helper.delay(0xbb8, this.account, _0x530270.message, this);
    }
  }
  async ['getWormDetails'](_0x264f0b) {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Get Worm Details of On Chain Worm id " + _0x264f0b.xid, this);
        const _0x2021dc = await this.fetch('https://market.birds.dog/swaps/deposit/nft/details?xid=' + _0x264f0b.xid, 'GET', undefined, undefined, {
          'Authorization': "tma " + this.query
        }, true);
        return _0x2021dc.status == 0xc8 ? (await Helper.delay(0x3e8, this.account, "Successfully Get On Chain Worm Details with id " + _0x264f0b.xid, this), _0x2021dc.data) : (await Helper.delay(0xbb8, this.account, _0x2021dc.status + " - " + Helper.msToTime(Helper.getTimeLeftISO(_0x2021dc.unlockAt)), this), undefined);
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0xa4461e) {
      await Helper.delay(0xbb8, this.account, _0xa4461e.message, this);
      return undefined;
    }
  }
  async ['presignedClaim']() {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Trying to Pre Signed Claim Preying Reward...", this);
        const _0x371c6b = await this.fetch("https://wallet.birds.dog/tasks/presigned-claim", 'POST', undefined, {
          'type': 0x4,
          'address': this.address,
          'wallet': {}
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0x371c6b.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Pre Signed Claim Preying Reward", this);
          await this.claimPreyBird(_0x371c6b);
        } else {
          await Helper.delay(0xbb8, this.account, _0x371c6b.status + " - " + Helper.msToTime(Helper.getTimeLeftISO(_0x371c6b.unlockAt)), this);
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x59ac39) {
      await Helper.delay(0xbb8, this.account, _0x59ac39.message, this);
    }
  }
  async ['presignedHunting']() {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Trying to Pre Signed Hunting...", this);
        const _0x31c5ea = await this.fetch('https://wallet.birds.dog/tasks/presigned-hunting', 'POST', undefined, {
          'type': 0x3,
          'address': this.address,
          'wallet': {}
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0x31c5ea.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Pre Signed Hunting", this);
          await this.preyBird(_0x31c5ea);
        } else {
          const _0x18221d = Helper.getTimeLeftISO(_0x31c5ea.unlockAt);
          if (_0x18221d == 0x0) {
            await Helper.delay(0xbb8, this.account, "Hunt/Prey is finished try to claim...", this);
            await this.presignedClaim();
          } else {
            await Helper.delay(0xbb8, this.account, _0x31c5ea.status + " - " + Helper.msToTime(_0x18221d), this);
          }
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x21d514) {
      await Helper.delay(0xbb8, this.account, _0x21d514.message, this);
    }
  }
  async ['initWallet']() {
    if (await this.getWalletAddress()) {
      await Helper.delay(0x3e8, this.account, "Wallet Initialized...", this);
    } else {
      await Helper.delay(0xbb8, this.account, "Wallet Not Setted Correctly, Skipping...", this);
    }
  }
  async ['confirmCheckIn'](_0x2983ab, _0x27e57c) {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Trying to Confirm CheckIn...", this);
        const _0x588fea = await this.fetch('https://wallet.birds.dog/tasks/confirm-checkin', 'POST', undefined, {
          'txHash': _0x27e57c,
          'token': _0x2983ab
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0x588fea.status == 0xc8) {
          await this.getUserInfo();
          await Helper.delay(0xbb8, this.account, "Successfully Check In", this);
        } else {
          await Helper.delay(0x3e8, this.account, _0x588fea.message, this);
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x418c42) {
      throw _0x418c42;
    }
  }
  async ['confirmFeeding'](_0x6d7228, _0x51c439) {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Trying to Confirm Feeding...", this);
        const _0x136084 = await this.fetch('https://wallet.birds.dog/tasks/confirm-feed', 'POST', undefined, {
          'txHash': _0x51c439,
          'token': _0x6d7228
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0x136084.status == 0xc8) {
          await this.getPreyInfo();
          await this.getUnlockedWorm();
          await Helper.delay(0xbb8, this.account, "Successfully Feeding", this);
        } else {
          await Helper.delay(0x3e8, this.account, _0x136084.message, this);
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x213719) {
      throw _0x213719;
    }
  }
  async ['confirmHunt'](_0x287e0e, _0x38d1e9) {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Trying to Confirm Hunting...", this);
        const _0x27e33b = await this.fetch('https://wallet.birds.dog/tasks/confirm-hunt', "POST", undefined, {
          'txHash': _0x38d1e9,
          'token': _0x287e0e
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0x27e33b.status == 0xc8) {
          await this.getPreyInfo();
          await this.getUserInfo();
          await Helper.delay(0xbb8, this.account, "Successfully Start Hunting", this);
        } else {
          await Helper.delay(0x3e8, this.account, "Successfully Start Hunting - " + _0x27e33b.status, this);
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0x2207d7) {
      throw _0x2207d7;
    }
  }
  async ['confirmClaimPrey'](_0xe56876, _0x1aaac0) {
    try {
      if (this.address) {
        await Helper.delay(0x3e8, this.account, "Trying to Confirm Claim Preying Reward...", this);
        const _0xbf00f9 = await this.fetch("https://wallet.birds.dog/tasks/confirm-claim", 'POST', undefined, {
          'txHash': _0x1aaac0,
          'token': _0xe56876
        }, {
          'Authorization': "tma " + this.query
        }, true);
        if (_0xbf00f9.status == 0xc8) {
          await this.getPreyInfo();
          await this.getUserInfo();
          await Helper.delay(0xbb8, this.account, "Successfully Claim Preying Reward", this);
          this.stillHunting = false;
        } else {
          await Helper.delay(0x3e8, this.account, _0xbf00f9.message, this);
        }
      } else {
        await Helper.delay(0xbb8, this.account, "Cannot Get Wallet Address Skipping...", this);
      }
    } catch (_0xa7de52) {
      throw _0xa7de52;
    }
  }
  async ["catchWorm"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Trying To Catch Worm...", this);
      const _0x16feb8 = await this.fetch('https://worm.birds.dog/worms/mint', "POST", undefined, undefined, {
        'Authorization': "tma " + this.query
      }, true);
      if (_0x16feb8.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, _0x16feb8.message + "...", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x16feb8.message, this);
      }
    } catch (_0x4a6540) {
      throw _0x4a6540;
    }
  }
  async ['getLockedWorm']() {
    try {
      await Helper.delay(0x3e8, this.account, "Getting Locked Worm...", this);
      const _0x317710 = await this.fetch(" https://worm.birds.dog/worms/me?page=1&perPage=50&status=locked", "GET", undefined, undefined, {
        'Authorization': "tma " + this.query
      }, true);
      if (_0x317710.status == 0xc8) {
        this.lockedWorm = _0x317710.data;
        await Helper.delay(0x3e8, this.account, "Successfully Get Locked Worm...", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x317710.message, this);
      }
    } catch (_0x3f119e) {
      throw _0x3f119e;
    }
  }
  async ["joinEggBreaking"](_0x338afe = false) {
    try {
      if (_0x338afe) {
        await Helper.delay(0x3e8, this.account, "Trying To Join Egg Breaking Game...", this);
      }
      const _0x10442f = await this.fetch('/minigame/egg/join', "GET");
      if (_0x10442f.status == 0xc8) {
        const _0x28f779 = await this.fetch('/minigame/egg/turn', "GET");
        this.game = _0x28f779;
        if (_0x338afe) {
          await Helper.delay(0x3e8, this.account, "Successfully Join Egg Breaking Game", this);
        }
      } else {
        await Helper.delay(0x3e8, this.account, _0x10442f.message, this);
      }
    } catch (_0x38710a) {
      throw _0x38710a;
    }
  }
  async ['breakEgg']() {
    try {
      await Helper.delay(0x3e8, this.account, "Beaking Egg...", this);
      const _0x33a952 = await this.fetch('/minigame/egg/play', 'GET');
      if (_0x33a952.status == 0xc8) {
        await this.joinEggBreaking();
        await Helper.delay(0x3e8, this.account, "Successfully Breaking Egg Got " + _0x33a952.result + " BIRDS, Total : " + this.game.total + ", " + _0x33a952.turn + " Left", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x33a952.message, this);
      }
    } catch (_0x5e59a3) {
      throw _0x5e59a3;
    }
  }
  async ['claimEggGame']() {
    try {
      await Helper.delay(0x3e8, this.account, "Claiming Egg Game Reward...", this);
      const _0x44a2b1 = await this.fetch('/minigame/egg/claim', 'GET');
      if (_0x44a2b1.status == 0xc8) {
        await this.getUserInfo();
        await Helper.delay(0x3e8, this.account, "Successfully Claiming Game Reward " + this.game.total, this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x44a2b1.message, this);
      }
    } catch (_0x44b158) {
      throw _0x44b158;
    }
  }
  async ['getTask'](_0x476edf = false) {
    try {
      if (_0x476edf) {
        await Helper.delay(0x3e8, this.account, "Getting Task...", this);
      }
      const _0x2043b4 = await this.fetch('/project', "GET");
      if (_0x2043b4.status == 0xc8) {
        this.task = _0x2043b4;
        await Helper.delay(0x3e8, this.account, "Successfully Get Task", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x2043b4.message, this);
      }
    } catch (_0x48796c) {
      throw _0x48796c;
    }
  }
  async ["getUserTask"](_0x3a19fe = false) {
    try {
      if (_0x3a19fe) {
        await Helper.delay(0x3e8, this.account, "Getting User Task...", this);
      }
      const _0x1df454 = await this.fetch('/user-join-task', 'GET');
      if (_0x1df454.status == 0xc8) {
        this.userTask = _0x1df454;
        await Helper.delay(0x3e8, this.account, "Successfully Get User Task", this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x1df454.message, this);
      }
    } catch (_0x8f69f4) {
      throw _0x8f69f4;
    }
  }
  async ['startJoinTask'](_0x26fd30) {
    try {
      await Helper.delay(0x3e8, this.account, "Start And Join Task " + _0x26fd30.title + '...', this);
      const _0x347077 = {
        'taskId': _0x26fd30._id,
        'channelId': _0x26fd30.channelId
      };
      const _0x4adb86 = await this.fetch('/project/join-task', "POST", undefined, _0x347077);
      if (_0x4adb86.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, _0x4adb86.msg, this);
      } else {
        await Helper.delay(0x3e8, this.account, _0x4adb86.message, this);
      }
    } catch (_0x2f81ee) {
      throw _0x2f81ee;
    }
  }
}