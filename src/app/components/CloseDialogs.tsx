import type { CloseManyPending } from "@/app/hooks/tabCloseGuards";
import {
  type AppCloseBlocker,
  canOptOutOfAppClosePrompt,
} from "@/app/hooks/useAppCloseGuard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { setConfirmCloseRunningTerminal } from "@/modules/settings/store";
import type { Tab } from "@/modules/tabs";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

type Props = {
  tabs: Tab[];
  pendingCloseTab: number | null;
  onCancelClose: () => void;
  onConfirmClose: () => void;
  pendingTerminalCloseTab: number | null;
  onCancelTerminalClose: () => void;
  onConfirmTerminalClose: () => void;
  pendingDeleteTabs: number[] | null;
  onCancelDeleteClose: () => void;
  onConfirmDeleteClose: () => void;
  pendingCloseMany: CloseManyPending | null;
  closeManyConfirming: boolean;
  onCancelCloseMany: () => void;
  onConfirmCloseMany: () => void;
  pendingAppClose: AppCloseBlocker | null;
  onCancelAppClose: () => void;
  onConfirmAppClose: () => void;
};

function appCloseMessage(blocker: AppCloseBlocker, t: TFunction): string {
  if (blocker.dirtyEditors > 0 && blocker.busyTerminal) {
    return t("app.closeDirtyAndBusy", { count: blocker.dirtyEditors });
  }
  if (blocker.dirtyEditors > 0) {
    return t("app.closeDirty", { count: blocker.dirtyEditors });
  }
  return t("app.closeBusy");
}

function OptOutRow({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  const id = useId();
  const { t } = useTranslation();
  return (
    <div className="-mt-3 flex items-center justify-center gap-2 sm:justify-start">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
      />
      <Label
        htmlFor={id}
        className="font-normal text-[12px] text-muted-foreground"
      >
        {t("app.optOutRunningProcesses")}
      </Label>
    </div>
  );
}

async function persistOptOut(): Promise<void> {
  try {
    await setConfirmCloseRunningTerminal(false);
  } catch (e) {
    console.error("close-confirmation opt-out failed", e);
  }
}

function closeManyMessage(
  pending: CloseManyPending,
  tabs: Tab[],
  t: TFunction,
): string {
  const { kind, dirtyIds, busyLeafIds } = pending;
  const dirtyCount = dirtyIds.length;
  const busyCount = busyLeafIds.length;
  if (dirtyCount === 1 && busyCount === 0) {
    const dirty = tabs.find(
      (tab) => tab.kind === "editor" && dirtyIds.includes(tab.id),
    );
    return dirty?.title
      ? t("app.closeManyDirtyTitle", { title: dirty.title })
      : t("app.closeManyDirtySingle");
  }
  if (dirtyCount > 0 && busyCount > 0) {
    const dirty = t("app.closeManyDirtyCount", { count: dirtyCount });
    const busy = t("app.closeManyBusyCount", { count: busyCount });
    return t("app.closeManyDirtyAndBusy", {
      dirty,
      busy,
      count: busyCount,
    });
  }
  if (dirtyCount > 0) {
    return t("app.closeManyDirty", { count: dirtyCount });
  }
  return kind === "right"
    ? t("app.closeManyBusyRight", { count: busyCount })
    : t("app.closeManyBusy", { count: busyCount });
}

/** Confirmation dialogs for closing dirty editors and terminals with live processes. */
export function CloseDialogs({
  tabs,
  pendingCloseTab,
  onCancelClose,
  onConfirmClose,
  pendingTerminalCloseTab,
  onCancelTerminalClose,
  onConfirmTerminalClose,
  pendingDeleteTabs,
  onCancelDeleteClose,
  onConfirmDeleteClose,
  pendingCloseMany,
  closeManyConfirming,
  onCancelCloseMany,
  onConfirmCloseMany,
  pendingAppClose,
  onCancelAppClose,
  onConfirmAppClose,
}: Props) {
  const { t } = useTranslation();
  const [optOutTerminalClose, setOptOutTerminalClose] = useState(false);
  const [optOutAppClose, setOptOutAppClose] = useState(false);
  const appCloseCanOptOut =
    pendingAppClose !== null && canOptOutOfAppClosePrompt(pendingAppClose);

  const confirmTerminalClose = () => {
    if (optOutTerminalClose) void persistOptOut();
    setOptOutTerminalClose(false);
    onConfirmTerminalClose();
  };

  const cancelTerminalClose = () => {
    setOptOutTerminalClose(false);
    onCancelTerminalClose();
  };

  // The pref write has to land before the window closes, or quitting drops it.
  const confirmAppClose = async () => {
    const optOut = appCloseCanOptOut && optOutAppClose;
    setOptOutAppClose(false);
    if (optOut) await persistOptOut();
    onConfirmAppClose();
  };

  const cancelAppClose = () => {
    setOptOutAppClose(false);
    onCancelAppClose();
  };

  return (
    <>
      <AlertDialog
        open={pendingCloseTab !== null}
        onOpenChange={(open) => !open && onCancelClose()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("app.unsavedChanges")}</AlertDialogTitle>
            <AlertDialogDescription>
              {tabs.find((tab) => tab.id === pendingCloseTab)?.title
                ? t("app.unsavedClose", {
                    title: tabs.find((tab) => tab.id === pendingCloseTab)
                      ?.title,
                  })
                : t("app.unsavedCloseGeneric")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancelClose}>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmClose}>
              {t("common.closeAnyway")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={pendingTerminalCloseTab !== null}
        onOpenChange={(open) => !open && cancelTerminalClose()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("app.closeTerminalTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("app.closeTerminalDesc")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <OptOutRow
            checked={optOutTerminalClose}
            onCheckedChange={setOptOutTerminalClose}
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelTerminalClose}>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmTerminalClose}>
              {t("common.closeAnyway")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={pendingDeleteTabs !== null}
        onOpenChange={(open) => !open && onCancelDeleteClose()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("app.unsavedChanges")}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDeleteTabs?.length === 1
                ? (() => {
                    const title = tabs.find(
                      (tab) => tab.id === pendingDeleteTabs[0],
                    )?.title;
                    return title
                      ? t("app.unsavedDeleted", { title })
                      : t("app.unsavedDeletedGeneric");
                  })()
                : t("app.unsavedMultiple", {
                    count: pendingDeleteTabs?.length ?? 0,
                  })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancelDeleteClose}>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmDeleteClose}>
              {t("common.closeAnyway")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={pendingCloseMany !== null}
        onOpenChange={(open) => !open && onCancelCloseMany()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingCloseMany?.kind === "right"
                ? t("tabs.closeTabsToRight")
                : t("tabs.closeOtherTabs")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingCloseMany
                ? closeManyMessage(pendingCloseMany, tabs, t)
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancelCloseMany}>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={closeManyConfirming}
              onClick={(event) => {
                event.preventDefault();
                onConfirmCloseMany();
              }}
            >
              {closeManyConfirming
                ? t("common.checking")
                : t("common.closeAnyway")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={pendingAppClose !== null}
        onOpenChange={(open) => !open && cancelAppClose()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("app.quitTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAppClose ? appCloseMessage(pendingAppClose, t) : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {appCloseCanOptOut ? (
            <OptOutRow
              checked={optOutAppClose}
              onCheckedChange={setOptOutAppClose}
            />
          ) : null}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelAppClose}>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => void confirmAppClose()}>
              {t("app.quitAnyway")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
