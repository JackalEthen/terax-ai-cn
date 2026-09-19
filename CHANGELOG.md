# Changelog

## [0.8.6-cn] - 2026-09-19

### Added
- 跟进上游 v0.8.6：SignPath Windows 签名 CI、AgentLauncherPanel 多代理启动面板、svelte 语法高亮、终端字体主题覆盖、LSP 安装引导弹窗、Git Diff 预览标签页、资源管理器路径拖入终端
- 0.8.6 新增 UI 全部纳入 i18n：NewTabMenu、AgentLauncherPanel、LspInstallDialog、LspServersGroup、TabBar、Header、FileExplorer、NotificationBell 等
- locale 扩充至 830 keys（zh/en 完全对等）：settings.lsp.aria、tabs.agents、agents.launcher.*、lsp.install.*

### Changed
- 基线重放：以 v0.8.6 为基础重建分支，保留完整汉化体系


All notable changes to Terax 中文版. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [SemVer](https://semver.org/) (pre-`1.0`, minor bumps may include breaking changes).

## [0.8.5] - 2026-07-23

### Added
- 完整中文语言支持（zh-CN）：全界面、设置、编辑器、AI 面板、终端、快捷键面板、主题描述、提示文案
- 新增 `src/i18n/` 目录：`i18n/index.ts` + `locales/en.json` + `locales/zh.json`（793 个 key，中英完全对等）
- 设置 - 通用 - Language 加入中/英切换 dropdown

### Changed
- 所有 UI 文案改由 react-i18next 渲染，切换语言可即时生效
- 部分 Radix / forwardRef 组件通过 `useTranslation` reactive hook 确保刷新
- `.gitignore` 强化：新增 `src-tauri/target/`、`src-tauri/gen/`、`.env*`、IDE、OS、`release/`

### Fixed
- 修复 `nonExplicitSupportedLngs: true` 导致 zh-CN 找不到资源、falls back 到 en 的 bug
- 修复语言切换后部分组件（如 forwardRef、Radix Select）不刷新的问题

## [0.6.6] - 2026-05-17

### Added
- 首次正式发布中文汉化版本，对应上游 v0.6.6
- GitHub Releases 提供 Windows 便携版

## [0.5.9] - 2026

## Added
- Window management for linux

## Changed
- Secrets (keyring) redesign
- Auto updater stabilization

## [0.5.8] - 2026

### Added
- Auto-updater wired into release builds.
- GitHub Actions workflow for cross-platform builds and releases.

### Fixed
- Linux window initialization issue on first launch.

### Changed
- CI: bumped Node and pnpm versions used in release pipeline.

## [0.5.7]

### Changed
- Default working directory for new sessions is now `$HOME`.
- Stabilized shell init scripts (zsh / bash / pwsh) - fewer edge cases on first prompt.

## [0.5.6]

### Changed
- Reduced app size and startup cost via lazy loading of editor/AI modules.

## [0.5.5]

### Added
- Demo assets and updated README screenshots.

### Changed
- Dependency version sweep.

## [0.5.4]

### Changed
- Combined snippets and commands into a single surface for a cleaner UX.

## [0.5.3]

### Changed
- UI polish across AI / agent views.

## [0.5.2]

### Changed
- AI mini-window UI/UX improvements.

## [0.5.1]

### Added
- Full agentic workflow: plans, sub-agents, tasks, project init.
- Improved shell tool for the agent.

## [0.4.7]

### Added
- Vim mode in the code editor.
- Keyboard navigation across the file explorer.

## [0.4.6]

### Changed
- Cleanup pass: dependencies, UI, icon set.

## [0.4.5]

### Changed
- Optimized PTY resizing, session lifecycle, and AI context handling.

## [0.4.4]

### Changed
- Agents UI/UX improvements.

## [0.4.3]

### Added
- Skills and multi-agent support.
- Settings UI improvements.

## [0.4.2]

### Changed
- AI autocomplete improvements (latency, accuracy).

## [0.4.1]

### Added
- Local LLM support via LM Studio.
- Groq and Cerebras providers.
- AI autocomplete in the code editor.

## [0.3.9]

### Added
- AI edit diffs - preview and approve agent edits before applying.

## [0.3.8]

### Added
- File search across the workspace.
- Separate editor tab type, decoupled from terminal tabs.

## [0.3.7]

### Added
- Web preview tab with auto-detection of local dev servers.

## [0.3.6]

### Added
- Autostart and window-state persistence.

### Changed
- Settings UI improvements.

## [0.3.5]

### Added
- Standalone settings window.

## [0.3.4]

### Added
- New AI mini-window.
- Text selection handling and session persistence.

## [0.3.1]

### Changed
- Internal refactor.

## [0.3.0]

### Added
- AI agents (initial implementation).
- Apache-2.0 license.

## [0.2.9]

### Added
- Tauri keyring integration - API keys now stored in the OS keychain.

### Changed
- Internal renaming pass.

## [0.2.8]

### Changed
- Icon set and theme refresh.

## [0.2.7]

### Added
- Context menu in the file explorer.

### Changed
- General refactor; editor improvements.

## [0.2.4]

### Fixed
- Various bug fixes.

## [0.2.3]

### Added
- File explorer (first version).
- Code editor based on CodeMirror 6.

## [0.2.1]

### Added
- Logging.

### Fixed
- Shell script handling and session edge cases.

## [0.2.0]

### Added
- AI side panel.
- Status bar.
- Keyboard shortcuts.

## [0.1.3]

### Added
- AI SDK and AI Elements integration.

## [0.1.2]

### Added
- New app logo.
- Configurable window size.

## [0.1.1]

### Changed
- Rendering and resize improvements.
- Header and tabs UI polish.

## [0.1.0]

### Changed
- New UI shell.
- Internal refactor; fixed render/resize race.

## [0.0.8]

### Added
- Multi-tab support.
- Basic layout UI.

## [0.0.7]

### Changed
- Switched icon library from Lucide to HugeIcons.

## [0.0.6]

### Added
- Custom font and theme.
- Tauri window management.

## [0.0.5]

### Added
- xterm.js WebGL renderer, search, and link plugins.

## [0.0.4]

### Added
- shadcn/ui component set and supporting deps.

## [0.0.3]

### Added
- Child process lifecycle handling.
- Per-session locking.

## [0.0.2]

### Added
- Initial Rust PTY backend with xterm.js in React (prototype).