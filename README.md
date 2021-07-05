<p align="center">
    <img src="https://img.freepik.com/free-vector/electric-brain_106072-29.jpg?size=338&ext=jpg" alt="Logo" width="100" height="100">

  <h3 align="center">Amcalar Bot</h3>

  <p align="center">
    Amcalar Bot is a Discord bot developed using <a href="https://discord.js.org/">discord.js</a>.<br /></a>
    <br />
    <a href="https://github.com/canccevik/amcalar-bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/canccevik/amcalar-bot/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#feautures">Feautures</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## 👉🏻 About The Project

You can list, search and listen the questions of specific YouTube channel's videos on Discord.

To be a question, the description of the YouTube videos should be like this:

<img src="https://i.imgur.com/SsAGBHj.png">

## 🚀 Feautures

- Updates the questions when a new video is uploaded to the youtube channel or the description of any video is changed.
- You can listen to the questions on a voice channel.

## 📥 Installation

1. Get a API Key at [https://developers.google.com/youtube/v3/getting-started](https://developers.google.com/youtube/v3/getting-started) by creating a new project
2. Get the bot's token at [https://discord.com/developers/applications](https://discord.com/developers/applications) by creating a new application
3. Clone the repo
   ```sh
   git clone https://github.com/canccevik/amcalar-bot.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Prepare the `.env` file
   ```JS
   BOT_TOKEN = YOUR-DISCIRD-BOT-TOKEN
   YT_API_KEY = YOUR-YOUTUBE-API-KEY
   YT_CHANNEL_ID = YOUTUBE-CHANNEL-ID
   SERVER_URL = YOUR-EXPRESS-SERVER-URL
   ```
6. Start the project
   ```sh
   npm run start
   ```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
