# SandBGM

Background music for a quieter desk.

A one-page listening space built around official [Lofi Girl](https://www.youtube.com/@LofiGirl) mixes. Full-screen moss-and-vinyl loop, liquid-glass controls, press play and leave it on.

## Preview

![SandBGM preview](docs/preview.gif)

## Features

- Full-screen boomerang video background
- Official Lofi Girl study sessions and radios from YouTube
- Play, pause, previous / next, and a seekable progress bar
- **Surprise me** — jump to a random mix
- **Browse Library** — catalog view (coming soon)
- Newsreader serif type and liquid-glass buttons

## Stack

React · TypeScript · Vite · Tailwind CSS · YouTube IFrame API

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints. Browsers block unmuted autoplay, so the first sound needs a click on the player or **Surprise me**.

```bash
npm run build
npm run preview
```

## Music

Audio comes from Lofi Girl’s public YouTube mixes and radios, played through the YouTube embed. Rights remain with the original artists and [Lofi Girl](https://lofigirl.com).
