<div align="center">
  <img src="public/logo.png" width="144" height="144" alt="Terax" />
  <h1>Terax 中文版</h1>

  <p><strong>开源轻量级跨平台 AI 原生终端 (ADE)</strong></p>

  <p>
    <img src="https://img.shields.io/badge/版本-v0.8.6--cn-blue" alt="版本" />
    <img src="https://img.shields.io/badge/协议-Apache--2.0-green" alt="协议" />
    <img src="https://img.shields.io/badge/平台-Windows%20%7C%20Linux-lightgrey" alt="平台" />
  </p>

  <p>
    <a href="https://github.com/crynta/terax-ai">原项目</a>
    ·
    <a href="https://terax.app">官方网站</a>
    ·
    <a href="https://terax.app/docs">文档</a>
  </p>
</div>

---

> **声明**：本项目是 [Terax](https://github.com/crynta/terax-ai) 的中文汉化版本，原作者为 [Crynta](https://github.com/crynta)。本汉化版本遵循 Apache License 2.0 协议。

## 下载

前往 [Releases](https://github.com/JackalEthen/terax-ai-cn/releases) 页面下载最新安装包。

| 平台 | 格式 |
|------|------|
| **Windows** | `.exe`（安装包）、`.msi` |
| **Linux** | `.AppImage`、`.deb`、`.rpm` |

## 项目简介

Terax 是一款开源轻量级 AI 原生终端 (ADE)，基于 Tauri 2 + Rust 和 React 19 构建。它将原生 PTY 后端与 WebGL 渲染器相结合，集成了 AI 代理侧边面板（支持自带密钥或完全本地模型）、代码编辑器、文件资源管理器、源码管理（含 Git 图谱），以及网页预览面板。磁盘占用约 7-8 MB，无遥测，无需账号。

## 截图

<table>
  <tr>
    <td align="center"><img src="docs/terminal.png" alt="终端" /><br/><sub>多标签终端，支持 WebGL 渲染</sub></td>
    <td align="center"><img src="docs/themes.png" alt="主题与背景" /><br/><sub>自定义主题、预设和背景图片</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/web-preview.png" alt="网页预览" /><br/><sub>本地开发服务器网页预览</sub></td>
    <td align="center"><img src="docs/source-control.png" alt="源码管理" /><br/><sub>源码管理面板与 Git 历史图谱</sub></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="docs/ai-workflow.png" alt="AI 窗口" /><br/><sub>AI 代理工作流，支持代码编辑器中的编辑差异对比</sub></td>
  </tr>
</table>

## 功能特性

### 终端

- xterm.js + WebGL 渲染器，多标签支持后台流式传输
- GPU 加速的块级终端，类编辑器命令输入体验
- 通过 `portable-pty` 实现原生 PTY 后端（支持 zsh、bash、pwsh、fish、cmd）
- 分屏面板（水平与垂直）
- Shell 集成（当前目录报告、提示符标记）通过注入初始化脚本实现
- 内联搜索、链接检测、真彩色支持
- Windows 下支持按标签设置工作区环境（本地或任意已安装的 WSL 发行版）

### 代码编辑器

- CodeMirror 6，支持所有主流语言（TS/JS、Rust、Python、Go、C/C++、Java、HTML/CSS、JSON、Markdown、Svelte 等）
- 内联 AI 自动补全，支持本地模型
- AI 编辑差异对比，可逐块接受或拒绝
- Vim 模式
- 内置十款编辑器主题：Atom One、Aura、Copilot、GitHub Dark/Light、Gruvbox Dark、Nord、Tokyo Night、Xcode Dark/Light

### 源码管理

- 暂存/取消暂存代码块，提交（Cmd+Enter / Ctrl+Enter），推送时感知上游
- 分支显示，包括分离 HEAD 状态
- Git 历史面板，带真实提交图谱（合并和分支的车道渲染）
- 提交搜索与筛选，点击跳转到远程提交页面
- Git 差异支持预览标签页

### 文件资源管理器

- Catppuccin 图标主题
- 模糊搜索、键盘导航、内联重命名、上下文操作
- 可将文件和选区直接附加到 AI 侧边面板

### 网页预览

- 自动检测本地开发服务器并在预览标签中打开
- 通过原生子 WebView 预览外部 URL

### 主题与自定义

- 在应用内创建自定义主题，在预设与你的主题之间切换
- 创建并分享主题，或从社区导入
- 背景图片，支持透明度与模糊调节
- 编辑器主题与应用主题独立设置
- 主题可自定义终端字体（字族/字重/字号）

### AI（自带密钥）

- **支持的提供商：** OpenAI、Anthropic、Google (Gemini)、Groq、xAI (Grok)、Cerebras、OpenRouter、DeepSeek、Mistral，以及任意 OpenAI 兼容接口
- **本地/离线：** LM Studio、MLX、Ollama
- **代理工作流：** 计划、子代理、通过 `TERAX.md` 实现项目记忆、文件读写/编辑/批量编辑/grep/glob、带审批门控的 bash、后台进程
- **Composer：** 通过 `#handle` 使用代码片段，通过 `@path` 引用文件，斜杠命令，语音输入，从资源管理器或选区附加到代理
- **自定义代理：** 可自定义系统提示词和工具子集
- **计划模式：** 多步骤工作，先生成计划再确认执行
- **分屏代理：** 支持在分割窗格中直接启动编码代理，运行状态显示在标签页上

### 语言与本地化

- 内置中文/English 双语界面，设置 → 通用中可切换
- 界面语言跟随系统自动选择，可手动覆盖

### 品质

- 轻量快速（约 7-8 MB 打包体积）
- API 密钥存储在系统密钥链中
- 无遥测，无需账号

## 安装

前往 [Releases](https://github.com/JackalEthen/terax-ai-cn/releases) 页面下载安装包。

| 版本 | 说明 |
|------|------|
| **v0.8.6-cn**（当前） | 基于上游 v0.8.6 |
| 历史 | 见 [Releases](https://github.com/JackalEthen/terax-ai-cn/releases) |

### Windows 注意事项

- 首次启动时 Windows 会显示"Windows 已保护你的电脑"，因为 Terax 尚未进行代码签名。点击**更多信息**，然后选择**仍要运行**。
- 默认 Shell 检测顺序：`pwsh.exe` (PowerShell 7+) → `powershell.exe` (Windows PowerShell 5.1) → `cmd.exe`。
- WSL 是一等公民的工作区环境，而非包装的子进程。

### Linux 注意事项

- **Arch / AUR：** `yay -S terax-bin`（或 `paru` 等），跟踪最新版本
- **AppImage：** 需 FUSE，如无法运行尝试 `./Terax_*.AppImage --appimage-extract-and-run`
- **Wayland 渲染异常：** 尝试 `WEBKIT_DISABLE_DMABUF_RENDERER=1`
- `.deb` / `.rpm` 链接系统 GTK 栈，通常渲染更流畅

## 配置 AI

1. 打开 **设置 → AI**。
2. 选择提供商并粘贴你的 API 密钥。对于本地推理，将 Terax 指向你的 LM Studio、MLX 或 Ollama 端点。
3. 密钥通过 `keyring` 写入系统密钥链——它们永远不会接触磁盘或 `localStorage`。

## 从源码构建

**前置要求**
- Rust（stable）— https://rustup.rs
- Node 20+ 和 [pnpm](https://pnpm.io)
- 平台特定的 Tauri 前置要求 — https://tauri.app/start/prerequisites/

**运行**
```bash
pnpm install
pnpm tauri dev          # 开发模式
pnpm tauri build        # 生产打包
```

**检查**
```bash
pnpm lint
pnpm check-types
pnpm test
cd src-tauri && cargo clippy --all-targets --locked -- -D warnings   # Rust 检查（与 CI 一致）
cd src-tauri && cargo nextest run --locked                           # 或：cargo test --locked
```

## 技术栈

Tauri 2 · Rust · `portable-pty` · React 19 · TypeScript · Vite · xterm.js · CodeMirror 6 · Vercel AI SDK v6 · Tailwind v4 · shadcn/ui · Zustand

## 贡献

欢迎 Issue 和 PR！请随时提交问题、建议功能或拉取请求。详见 [CONTRIBUTING.md](CONTRIBUTING.md) 和[架构文档](docs/README.md)。

## 许可证

本项目基于 Apache License 2.0 许可证。详见 [LICENSE](LICENSE)。

## 代码签名

本汉化版本的构建**未进行代码签名**（无签名密钥），Windows 首次运行时按上方提示操作即可。上游项目使用 [SignPath.io](https://signpath.io) 签名，详情见[原项目](https://github.com/crynta/terax-ai)。

## 致谢

- 原项目：[terax-ai](https://github.com/crynta/terax-ai)
- 原作者：[Crynta](https://github.com/crynta)
- 本仓库维护者：[JackalEthen](https://github.com/JackalEthen)
