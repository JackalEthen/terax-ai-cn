import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { openUrl } from "@tauri-apps/plugin-opener";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdater } from "./useUpdater";

type DistroKey = "arch" | "debian" | "fedora";

function distroCommand(key: DistroKey, version: string): string {
  switch (key) {
    case "arch":
      return "yay -S terax-bin";
    case "debian":
      return `sudo apt install ./Terax_${version}_amd64.deb`;
    case "fedora":
      return `sudo dnf install ./Terax-${version}-1.x86_64.rpm`;
  }
}

const DISTROS: { key: DistroKey; label: string }[] = [
  { key: "arch", label: "Arch" },
  { key: "debian", label: "Debian / Ubuntu" },
  { key: "fedora", label: "Fedora / RHEL" },
];

export function UpdaterDialog() {
  const { t } = useTranslation();
  const { status, dismiss } = useUpdater();
  const [copied, setCopied] = useState(false);
  const [distro, setDistro] = useState<DistroKey>("arch");
  const manual = status.kind === "manual-available" ? status.info : null;
  const activeCommand = distroCommand(distro, manual?.version ?? "");

  if (!manual) return null;

  const copyCommand = async () => {
    if (!navigator?.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(activeCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(o) => {
        if (!o) dismiss();
      }}
    >
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>
            {t("updater.versionAvailable", { version: manual.version })}
          </DialogTitle>
          <DialogDescription>
            {t("updater.pickDistro", { currentVersion: manual.currentVersion })}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-2">
          <div className="flex gap-1 rounded-md bg-muted/40 p-1">
            {DISTROS.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDistro(d.key)}
                className={`flex-1 rounded px-2 py-1 text-[11px] transition-colors ${
                  distro === d.key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border/60 bg-muted/40 px-3 py-2 font-mono text-[12px]">
            <span className="flex-1 select-all">$ {activeCommand}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[11px]"
              onClick={() => void copyCommand()}
            >
              {copied ? t("updater.copied") : t("updater.copy")}
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={dismiss}>
            {t("updater.later")}
          </Button>
          <Button size="sm" onClick={() => void openUrl(manual.releaseUrl)}>
            {t("updater.downloadPackage")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
