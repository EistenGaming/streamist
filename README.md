# eg.streamist

It can be daunting to get into streaming or content creation in general. Where do I start? What should I stream? How do I organize my work? When we started out on our own journey in March 2020, we faced the same questions. We wished for a tool that could help us do research and organize our work as content creators. Since we didn't find such a tool, we decided to create one.

EistenGaming Streamist (eg.streamist, pronounced like "extremist" :p) aims to help content creators organize their work, define their audience, find their niche and track their progress over all major content delivery platforms. We aim for Youtube, Twitch and Facebook Gaming (since Mixer is now dead). The current focus lies on Twitch. 

eg.streamist is a multiplatform application based on the Quasar meta-framework. Currently, only the Windows platform is tested, but Mac and Linux should run just fine. We are also looking into making eg.streamist available on Android (phones and tablets) as well as iOS devices.

> **A note on Twitch credentials:**
> Please note that you need a Twitch ```clientID``` and ```client secret```. If you are unsure how to get these, check out the documentation here: [Twitch Authentication](https://dev.twitch.tv/docs/authentication).
> The credentials are required to access your channel information that is not available publicly. Also, it allows the app to take action on behalf of your Twitch account (e.g. chat moderation, change stream info text, etc).

## Download

eg.streamist is portable, no installation required. Just unzip it and run Streamist.exe.

**Stable Builds**

- TBD

**Development Builds**

Note: >Development builds offer the latest features, but are not ready for production.

- Latest: v0.6.0. Download it here: [Windows](https://github.com/EistenGaming/streamist/releases/download/v0.6.0/Streamist-v0.6.0-win32-x64.zip)

## Contributions

eg.streamist is **FREE** to use and **OpenSource**. If you want to contribute, please consider becoming a patron at [EistenGaming on Patreon](https://www.patreon.com/EistenGaming). Your can also subscribe to our [Twitch Channel](https://www.twitch.tv/eistengaming), follow us on [YouTube](https://www.youtube.com/c/EistenGaming) and [Twitter](https://twitter.com/eistengaming) or get some [merchandize](https://merch.streamelements.com/eistengaming) or just leave a [Tip](https://streamelements.com/eistengaming/tip). Whatever strikes your fancy, it's appreciated. 

If you just want to hang out with the community and see what's going on, consider joining our [Discor Server](https://discord.gg/UYtDust).

If you're a developer and want to help with the coding, that's appreciated too!

By the way, if you are an Android/iOS developer, do get in touch!

## Sponsors

Your logo could be here! Get in touch if you are interested in sponsoring eg.streamist development.

## Screenshots

The home screen loads the top 5 games, streams and featured streams on application startup. 

![Home Screen](images/screenshot_home_07_2020.jpg)

The analytics page allows you to query the platforms for top games, top streams, featured streams and info about a specific streamer.

Showing off the top games in grid mode:

![Analytics Top Games - Grid Mode](images/screenshot_db_topgames_t07_2020.jpg)

..and in table mode:

![Analytics Top Games - Table Mode](images/screenshot_db_topgames_table_07_2020.jpg)

Featured streams show a stream snapshot instead of the game box shot.

![Analytics Featured Streams](images/screenshot_db_featured_streams_07_2020.jpg)

If you want to know a little more about a specific streamer, the streamer info page has what you need.

![Analytics Streamer Info](images/screenshot_db_streamerinfo_07_2020.jpg)

Manage your accounts, as well as the app's appearance, notification behavior and more in the settings section.

![Analytics Streamer Info](images/screenshot_settings_accounts_07_2020.jpg)
![Analytics Streamer Info](images/screenshot_settings_appearance_07_2020.jpg)

## Getting Started

To get the current development version, follow the steps below.

### 1) Download and install node.js

Go to [Node.js downlod](https://nodejs.org/en/download/) and download the latest node.js version for your platform.

### 2) Download and install npm

> Note: NPM should be installed automatically along with node.js (see step 1). If not, you can find npm here: [npm download](https://www.npmjs.com/get-npm)

### 3) Clone the repository

Cloning using SSH (recommended):

```bash
git clone git@github.com:EistenGaming/streamist.git
```

Cloning with HTTPS:

```bash
git clone https://github.com/EistenGaming/streamist.git
```

### 4) Install dependencies

CD into the project directory and install the dependencies.

```bash
cd streamist
npm install
```

### 5) Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev -m electron
```

## Other useful stuff

### Lint the files

```bash
npm run lint
```

### Build the app for production

```bash
quasar build -m electron
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

