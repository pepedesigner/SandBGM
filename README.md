# SandBGM

Background music for a quieter desk.

Lofi Girl 电台与合集，做成一页即可停留的背景音乐空间。全屏苔藓黑胶循环、液态玻璃控件、点一下就能挂着听。

## Preview

<video src="docs/preview.mp4" poster="docs/preview.png" width="100%" controls muted autoplay loop playsinline>
</video>

![SandBGM preview](docs/preview.mp4)

## Features

- 全屏 boomerang 视频背景，沉浸式听感
- YouTube 上 [Lofi Girl](https://www.youtube.com/@LofiGirl) 的官方 study session / radio
- 播放、暂停、上一首 / 下一首、进度条
- **Surprise me**：随机切一首
- **Browse Library**：曲库浏览（Coming soon）
- Newsreader 衬线字体 + 液态玻璃按钮

## Stack

React · TypeScript · Vite · Tailwind CSS · YouTube IFrame API

## Run locally

```bash
npm install
npm run dev
```

打开提示的本地地址即可。浏览器会拦截自动出声，第一次需要点播放器或 **Surprise me**。

```bash
npm run build
npm run preview
```

## Music

页面音频来自 Lofi Girl 在 YouTube 上的公开合集与电台，播放由 YouTube 嵌入完成。版权归原作者与 [Lofi Girl](https://lofigirl.com) 所有。
