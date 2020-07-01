# eg.streamist

EistenGaming Streamist (eg.streamist, pronounced like "extremist" :p) aims to help content creators organize their work, define their audience, find their niche and track their progress over all major content delivery platforms.

eg.streamist is a multiplatform application based on the Quasar meta-framework. Currently, only the Windows platform is tested, but Mac and Linux should run just fine. We are also looking into making eg.streamist available on Android (phones and tablets) as well as iOS devices.

Note: If you are an iOS developer and want to contribute, get in touch!

To get the current development version, follow the steps below.

### 1) Download and install node.js

Go to [Node.js downlod](https://nodejs.org/en/download/) and download the latest node.js version for your platform.

### 2) Download and install npm

Note: NPM should be installed with node.js (see step 1). 

If not, you can find npm here: [npm download](https://www.npmjs.com/get-npm)

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

