import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { redetectBinary, type LspPreset } from "@/modules/lsp";
import { setLspActivation } from "@/modules/settings/store";
import {
  Copy01Icon,
  Refresh01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { openUrl } from "@tauri-apps/plugin-opener";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  server: LspPreset | null;
  onClose: () => void;
};

export function LspInstallDialog({ server, onClose }: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!server) return null;

  const copyInstallCommand = async () => {
    if (!server.install) return;
    try {
      await navigator.clipboard.writeText(server.install.command);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const checkAgain = async () => {
    setChecking(true);
    setNotFound(false);
    const path = await redetectBinary(server.command);
    if (path) {
      await setLspActivation(server.id, "enabled");
      onClose();
      return;
    }
    setChecking(false);
    setNotFound(true);
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("lsp.install.title", { name: server.name })}</DialogTitle>
          <DialogDescription>
            <Trans
              i18nKey="lsp.install.description"
              values={{ command: server.command }}
              components={[
                <code className="font-mono text-foreground" key="code" />,
              ]}
            />
          </DialogDescription>
        </DialogHeader>

        {server.install ? (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 font-mono text-[11px]">
            <span className="min-w-0 flex-1 select-text break-all">
              {server.install.command}
            </span>
            <button
              type="button"
              className="shrink-0 cursor-pointer rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              onClick={() => void copyInstallCommand()}
              title={t("lsp.install.copyCommand")}
            >
              <HugeiconsIcon
                icon={copied ? Tick02Icon : Copy01Icon}
                size={13}
                strokeWidth={2}
              />
            </button>
          </div>
        ) : (
          <p className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            {t("lsp.install.manualHint")}
          </p>
        )}

        {notFound ? (
          <p className="text-xs text-destructive">
            {t("lsp.install.stillNotFound")}
          </p>
        ) : null}

        <DialogFooter className="items-center sm:justify-between">
          {server.install ? (
            <Button
              variant="ghost"
              size="sm"
              className="mr-auto"
              onClick={() =>
                void openUrl(server.install?.docsUrl ?? "").catch(console.error)
              }
            >
              {t("lsp.install.documentation")}
            </Button>
          ) : (
            <span />
          )}
          <Button
            size="sm"
            disabled={checking}
            onClick={() => void checkAgain()}
          >
            <HugeiconsIcon
              icon={Refresh01Icon}
              size={12}
              strokeWidth={1.9}
              className={checking ? "animate-spin" : undefined}
            />
            {checking ? t("lsp.install.checking") : t("lsp.install.checkAgain")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
