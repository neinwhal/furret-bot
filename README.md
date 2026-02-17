# Furret Bot

A simple experimental general-purpose Discord bot built with **discord.js**

---

## Features:

- work-in-progress

---

## Requirements:

Make sure the following are installed:

- **Node.js** (version 18 or higher recommended)
- **npm** (comes wit Node.js)
- A **Discord bot token** from the Discord Developer Portal

---

## License

[MIT License](https://opensource.org/license/mit) <br>
```
Copyright 2026 neinwhal

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

---

## Setup

#### 1. Clone the repository
```bash
git clone https://github.com/neinwhal/furret-bot.git
cd furret-bot
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create environment file
1. Create a file named `.env` inside main directory
2. Inside it, add your bot token:
    ```bash
    TOKEN=your_bot_token_here
    ```

#### 4. Running the bot
1. Start the bot with:
    ```bash
    node index.js
    ```
2. If everything is setup correctly, console should display:
    ```
    Logged in as YOUR-BOT-NAME#8888
    ```

#### 5. Inviting the bot
1. Go to the **Discord Developer Portal**
2. Open your application
3. Go to **OAuth2** -> **URL Generator**
4. Select `bot` and `applications.commands`
5. Choose the following basic permissions:
    - `View Channels`
    - `Send Messages`
6. Open the generated URL and invite the bot to your server

#### 6. Project Structure
```pgsql
furret-bot/
├─ index.js
├─ package.json
├─ .env
└─ node_modules/
```