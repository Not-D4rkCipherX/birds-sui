## BIRDS SUI BOT

![birds](assets/img1.png)

**AIRDROP** : 
BIRDS (SUI NETWORK) : [Join Here](https://t.me/birdx2_bot/birdx?startapp=6896240442)

**Task** :
- Complete Social Media Task
- Upgrade Egg
- Invite
- Daily

## PREREQUISITE

- Git
- Node JS
- Telegram APP_ID & Telegram APP_HASH Get it from [Here](https://my.telegram.org/auth?to=apps) (REQUIRED IF YOU WANT USE SESSIONS)

## BOT FEATURE

- Multi Account With Proxy Support
- Support Telegram Sessions and Telegram Query
- Auto Upgrade Egg
- Auto Mint Worm
- Auto Egg Breaking Game
- Auto Daily Check In Onchain (Required Some SUI on Your Wallet)
- Auto Feed Before Prey
- Auto Hunt / Prey
- Auto Unlock Locked Worm

## SETUP & CONFIGURE BOT

### LINUX & MAC OS

1. Clone project repository
   ```
   git clone https://github.com/Rambeboy/birds-sui-bot&& cd birds-sui-bot
   ```

2. Install Dependencies and Setup Bot
   ```
   npm install && npm i telegram@2.22.2 && npm run setup 
   ```

3. Configure Bot config (including APP ID & HASH if you want to use session)
   ```
   nano config/config.js
   ```

4. (If You Use Proxy) To configure the app, run
   ```
   nano config/proxy_list.js
   ```
   and add your proxy list there, use http proxy

5. To start the app run
   ```
   npm run start
   ```

### WINDOWS

1. Open your `Command Prompt` or `Power Shell`.

2. Clone project repository
   ```
   git clone https://github.com/Rambeboy/birds-sui-bot
   ```
   and cd to project dir
   ```
   cd birds-sui-bot
   ```

3. Install Dependencies and Setup Bot
   ```
   npm install && npm i telegram@2.22.2 && npm run setup
   ```

4. Navigate to `birds-sui-bot` directory.

5. Navigate to `config` folder and open `config.js` to configure bot also `proxy_list.js` to configure proxy.

6. Now back to the `birds-sui-bot` folder

7.  To start the app open your `Command Prompt` or `Power Shell` again and run
    ```
    npm run start
    ```

## UPDATE BOT

To update bot follow this step :

1. Run
   ```
   git stash && git pull && npm install
   ```
2. Start the bot.

## SETUP ACCOUNTS

1. Run bot `npm run start`
2. Choose option `1` to create account
3. Choose account type `Query` or `Sessions`
4. `Session` Type
- Enter Account Name
- Enter your phone number starting with countrycode ex : `+628xxxxxxxx`
- You will be asked for verification code and password (if any)
- Start The bot Again after account creation complete
5. `Query` Type
- Enter Account Name
- Enter Telegram Query (you can get query by opening bot app on browser > inspect element > storage / application > session storage > telegram init params > copy tg web app data value)
- Start The bot Again after account creation complete
6. After bot started choose option 3 start bot

## SESSION TROUBLESHOOT

If you asked to enter phone number again after sessions creation, it mean session not initialized correctly, try to delete the created sessions.

Example Case

- example you already have 1 session (sessionA) and all good when you run bot. After that you create another session, but when you run bot, the bot asked to enter phone number again, so the problem is on (sessionB), to fix it just remove the `accounts/sessionB` folder and re create it or just delete all folder inside `accounts` directory with prefix `sessions-`.

## QUERY TROUBLESHOOT

if your bot get eror, with some error code `401` it mean your query expired, go get new query and run bot again and choose option `4` for query modification.

## NOTE

Config files is adjustable, modify the `config/config.js`, there some adjustable parameter 
```js
export class Config {
  static TELEGRAM_APP_ID = undefined; // YOUR APP ID EX : 324893724923
  static TELEGRAM_APP_HASH = undefined; // YOUR APP HASH EX: "aslkfjkalsjflkasf" WATCH THE ""
  static USEONCHAINTX = false; // SET To TRUE IF YOU WANT TO USE ONCHAIN TX FOR CHECK IN AND UPGRADE
  static USERWALLET = [
    [
      "YOUR SUI PK EX: 'suiprivkeyxxxx'",
      "YOUR ACCOUNTS FOLDER EX: 'accounts/query-akun1",
    ],
    [
      "YOUR SUI PK EX: 'suiprivkeyxxxx'",
      "YOUR ACCOUNTS FOLDER EX: 'accounts/query-akun2",
    ],
  ]; 
  // THIS IS OPTIONAL BUT IF YOU USE ONCHAIN THEN YOU NEED TO SET UP THIS, MAKE SURE YOU WRITE WITH CORRECT FORMAT, IF YOU JUST WANT TO USE ONCHAIN ON SOME ACCOUNT, YOU CAN JUST PROVIDE PK AND ACOUNTS FOLDER FOR THAT ACC
}

```

Don't use bot with `session` type if you using telegram account that bought from someone because it can make your telegram account deleted. instead of using `session` type, use `query` type.

This bot can use Telegram Query and Telegram Sessions. if you want to use sessions, and ever use one of my bot that use telegram sessions, you can just copy the `accounts` folder to this bot. Also for the telegram APP ID and Hash you can use it from another bot. If you want to use Telegram Query, get your query manually.

## CONTRIBUTE

Feel free to fork and contribute adding more feature thanks. To get original unencrypted code just Join my channel and DM me, original code (index.js and src folder) are Obfuscated during build

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
