import type { SearchTarget } from "@/modules/header";
import { MAX_PANES_PER_TAB, type Tab } from "@/modules/tabs";
import { leafIds } from "@/modules/terminal";
import {
  Cancel01Icon,
  DashboardSquare01Icon,
  FileEditIcon,
  FileSearchIcon,
  Globe02Icon,
  IncognitoIcon,
  KeyboardIcon,
  LayoutTwoColumnIcon,
  LayoutTwoRowIcon,
  PaintBoardIcon,
  Search01Icon,
  Settings01Icon,
  SidebarLeftIcon,
  SourceCodeIcon,
  SparklesIcon,
  TerminalIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import i18n from "@/i18n";
import type { PaletteItem } from "./types";

export const COMMAND_GROUPS = [
  "General",
  "Spaces",
  "Tabs",
  "Panes",
  "Git",
  "Search",
  "View",
  "AI",
] as const;

export type CommandPaletteActionContext = {
  tabs: Tab[];
  activeId: number;
  searchTarget: SearchTarget;
  explorerRoot: string | null;
  home: string | null;
  openNewTab: () => void;
  openNewBlock: () => void;
  openNewPrivate: () => void;
  openNewEditor: () => void;
  openNewPreview: () => void;
  openGitGraph: () => void;
  toggleSourceControl: () => void;
  closeActiveTabOrPane: () => void;
  splitPaneRight: () => void;
  splitPaneDown: () => void;
  focusSearch: () => void;
  focusExplorerSearch: () => void;
  toggleSidebar: () => void;
  toggleHiddenFiles: () => void;
  toggleAi: () => void;
  askAiSelection: () => void;
  openSettings: () => void;
  openKeyboardShortcuts: () => void;
  spaces: { id: string; name: string }[];
  activeSpaceId: string | null;
  openSpacesOverview: () => void;
  newSpace: () => void;
  switchSpace: (id: string) => void;
};

const noop = () => {};

export function createCommandItems(
  ctx: CommandPaletteActionContext,
): PaletteItem[] {
  const activeTab = ctx.tabs.find((tab) => tab.id === ctx.activeId);
  const activeTerminalTab = activeTab?.kind === "terminal" ? activeTab : null;
  const activePaneCount = activeTerminalTab
    ? leafIds(activeTerminalTab.paneTree).length
    : 0;
  const onlyOneTab = ctx.tabs.length < 2;
  const noWorkspaceRoot = !ctx.explorerRoot && !ctx.home;
  const splitDisabled = !activeTerminalTab
    ? i18n.t("commandPalette.disabled.noTerminalTab")
    : activePaneCount >= MAX_PANES_PER_TAB
      ? i18n.t("commandPalette.disabled.paneLimit")
      : undefined;
  const closeDisabled =
    onlyOneTab && activePaneCount < 2
      ? i18n.t("commandPalette.disabled.lastTab")
      : undefined;

  return [
    {
      id: "settings.open",
      title: i18n.t("commandPalette.commands.openSettings"),
      group: "General",
      keywords: ["preferences", "config"],
      icon: Settings01Icon,
      shortcutId: "settings.open",
      run: ctx.openSettings,
    },
    {
      id: "theme.pick",
      title: i18n.t("commandPalette.commands.changeTheme"),
      group: "General",
      keywords: ["theme", "appearance", "color", "dark", "light"],
      icon: PaintBoardIcon,
      run: noop,
    },
    {
      id: "shortcuts.open",
      title: i18n.t("commandPalette.commands.keyboardShortcuts"),
      group: "General",
      keywords: ["keys", "keybindings", "settings"],
      icon: KeyboardIcon,
      run: ctx.openKeyboardShortcuts,
    },
    {
      id: "spaces.overview",
      title: i18n.t("commandPalette.commands.spacesOverview"),
      group: "Spaces",
      keywords: ["spaces", "sessions", "overview", "organize", "manage", "move"],
      icon: DashboardSquare01Icon,
      run: ctx.openSpacesOverview,
    },
    {
      id: "spaces.new",
      title: i18n.t("commandPalette.commands.newSpace"),
      group: "Spaces",
      keywords: ["space", "session", "workspace", "group", "create"],
      icon: DashboardSquare01Icon,
      run: ctx.newSpace,
    },
    ...ctx.spaces.map((sp) => ({
      id: `spaces.switch.${sp.id}`,
      title: i18n.t("commandPalette.commands.switchSpace", { name: sp.name }),
      group: "Spaces" as const,
      keywords: ["space", "switch", "session", sp.name],
      icon: DashboardSquare01Icon,
      disabledReason:
        sp.id === ctx.activeSpaceId
          ? i18n.t("commandPalette.disabled.currentSpace")
          : undefined,
      run: () => ctx.switchSpace(sp.id),
    })),
    {
      id: "tab.new",
      title: i18n.t("commandPalette.commands.newTerminal"),
      group: "Tabs",
      keywords: ["shell", "terminal", "new tab"],
      icon: TerminalIcon,
      shortcutId: "tab.new",
      run: ctx.openNewTab,
    },
    {
      id: "tab.newBlock",
      title: i18n.t("commandPalette.commands.newBlockTerminal"),
      group: "Tabs",
      keywords: ["blocks", "warp", "command blocks", "terminal"],
      icon: DashboardSquare01Icon,
      run: ctx.openNewBlock,
    },
    {
      id: "tab.newPrivate",
      title: i18n.t("commandPalette.commands.newPrivateTerminal"),
      group: "Tabs",
      keywords: ["privacy", "private", "incognito", "hidden from ai"],
      icon: IncognitoIcon,
      shortcutId: "tab.newPrivate",
      run: ctx.openNewPrivate,
    },
    {
      id: "tab.newEditor",
      title: i18n.t("commandPalette.commands.newEditorTab"),
      group: "Tabs",
      keywords: ["file", "editor", "create"],
      icon: FileEditIcon,
      shortcutId: "tab.newEditor",
      disabledReason: noWorkspaceRoot
        ? i18n.t("commandPalette.noWorkspaceRoot")
        : undefined,
      run: ctx.openNewEditor,
    },
    {
      id: "tab.newPreview",
      title: i18n.t("commandPalette.commands.newWebPreview"),
      group: "Tabs",
      keywords: ["browser", "web", "localhost", "preview"],
      icon: Globe02Icon,
      shortcutId: "tab.newPreview",
      run: ctx.openNewPreview,
    },
    {
      id: "tab.close",
      title: i18n.t("commandPalette.commands.closeTabOrPane"),
      group: "Tabs",
      keywords: ["close", "remove", "pane"],
      icon: Cancel01Icon,
      shortcutId: "tab.close",
      disabledReason: closeDisabled,
      run: ctx.closeActiveTabOrPane,
    },
    {
      id: "pane.splitRight",
      title: i18n.t("commandPalette.commands.splitRight"),
      group: "Panes",
      keywords: ["terminal", "pane", "split", "right", "column"],
      icon: LayoutTwoColumnIcon,
      shortcutId: "pane.splitRight",
      disabledReason: splitDisabled,
      run: ctx.splitPaneRight,
    },
    {
      id: "pane.splitDown",
      title: i18n.t("commandPalette.commands.splitDown"),
      group: "Panes",
      keywords: ["terminal", "pane", "split", "down", "row"],
      icon: LayoutTwoRowIcon,
      shortcutId: "pane.splitDown",
      disabledReason: splitDisabled,
      run: ctx.splitPaneDown,
    },
    {
      id: "git.graph",
      title: i18n.t("commandPalette.commands.openGitGraph"),
      group: "Git",
      keywords: ["git", "graph", "history", "log", "commits"],
      icon: SourceCodeIcon,
      run: ctx.openGitGraph,
    },
    {
      id: "git.source",
      title: i18n.t("commandPalette.commands.toggleSourceControl"),
      group: "Git",
      keywords: ["git", "source control", "changes", "staging", "diff"],
      icon: SourceCodeIcon,
      shortcutId: "pane.source",
      run: ctx.toggleSourceControl,
    },
    {
      id: "search.content",
      title: i18n.t("commandPalette.commands.findContentInFiles"),
      group: "Search",
      keywords: ["grep", "ripgrep", "text", "contents", "search in files"],
      icon: FileSearchIcon,
      trailing: "#",
      run: noop,
    },
    {
      id: "history.open",
      title: i18n.t("commandPalette.commands.searchCommandHistory"),
      group: "Search",
      keywords: ["history", "shell", "rerun", "previous commands"],
      icon: TerminalIcon,
      trailing: ">",
      run: noop,
    },
    {
      id: "search.focus",
      title: i18n.t("commandPalette.commands.findInCurrentTab"),
      group: "Search",
      keywords: ["find", "terminal", "editor", "current"],
      icon: Search01Icon,
      shortcutId: "search.focus",
      disabledReason: ctx.searchTarget
        ? undefined
        : i18n.t("commandPalette.disabled.noSearchableView"),
      run: ctx.focusSearch,
    },
    {
      id: "explorer.search",
      title: i18n.t("commandPalette.commands.searchFilesByName"),
      group: "Search",
      keywords: ["explorer", "workspace", "file", "open"],
      icon: Search01Icon,
      shortcutId: "explorer.search",
      disabledReason: ctx.explorerRoot
        ? undefined
        : i18n.t("commandPalette.noWorkspaceRoot"),
      run: ctx.focusExplorerSearch,
    },
    {
      id: "sidebar.toggle",
      title: i18n.t("commandPalette.commands.toggleFileExplorer"),
      group: "View",
      keywords: ["sidebar", "files", "explorer"],
      icon: SidebarLeftIcon,
      shortcutId: "sidebar.toggle",
      run: ctx.toggleSidebar,
    },
    {
      id: "explorer.toggleHidden",
      title: i18n.t("commandPalette.commands.toggleHiddenFiles"),
      group: "View",
      keywords: ["dotfiles", "hidden", "explorer", "gitignore", "env"],
      icon: ViewIcon,
      shortcutId: "explorer.toggleHidden",
      run: ctx.toggleHiddenFiles,
    },
    {
      id: "ai.toggle",
      title: i18n.t("commandPalette.commands.toggleAiAgent"),
      group: "AI",
      keywords: ["assistant", "chat", "agent"],
      icon: SparklesIcon,
      shortcutId: "ai.toggle",
      run: ctx.toggleAi,
    },
    {
      id: "ai.askSelection",
      title: i18n.t("commandPalette.commands.askAiSelection"),
      group: "AI",
      keywords: ["selection", "explain", "assistant", "chat"],
      icon: SparklesIcon,
      shortcutId: "ai.askSelection",
      run: ctx.askAiSelection,
    },
  ];
}
