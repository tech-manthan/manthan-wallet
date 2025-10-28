import { useTheme } from "@/components/theme";
import type { Theme } from "@/components/theme/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { setSeed } from "@/store/features/seed/seedSlice";
import {
  addWallets,
  removeSingleWallet,
  removeWallet,
  removeWallets,
} from "@/store/features/wallet/walletsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { generateWallets } from "@/utils/generateWallets";
import { IconHourglassEmpty } from "@tabler/icons-react";
import {
  CopyIcon,
  MoonIcon,
  PlusCircle,
  SettingsIcon,
  SunIcon,
  TrashIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mnemonic = useAppSelector((state) => state.seed.mnemonic);
  const seed = useAppSelector((state) => state.seed.seed);
  const wallets = useAppSelector((state) => state.wallets);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedWalletName = useMemo(() => {
    const accountName = searchParams.get("accountName");
    if (accountName) return accountName;

    const walletKeys = Object.keys(wallets || {});
    if (walletKeys.length > 0) return walletKeys[0];

    return "";
  }, [searchParams, wallets]);

  useEffect(() => {
    if (mnemonic === "") {
      navigate("/onboarding", {
        replace: true,
      });
    }
  }, [mnemonic]);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="gap-10 pr-2 mr-2">
          <div className="flex flex-col overflow-x-hidden overflow-y-auto">
            <div className="flex justify-center items-center gap-4">
              <img src="/wallet.svg" className="w-8" />
              {open && <p className="text-2xl font-semibold">Manthan</p>}
            </div>
            <div className="mt-8">
              <Button
                className="w-full"
                onClick={() => {
                  const accountNumber =
                    Object.keys(wallets).length === 0
                      ? 0
                      : Number(Object.keys(wallets).at(-1)?.split("-").at(-1)) +
                        1;
                  const { ethereumWallet, solanaWallet } = generateWallets(
                    accountNumber,
                    seed
                  );
                  dispatch(
                    addWallets({
                      accountName: `account-${accountNumber}`,
                      wallets: [ethereumWallet, solanaWallet],
                    })
                  );
                }}
              >
                <PlusCircle className={cn(`size-4`, open && "size-6")} />
                {open && "Add Wallet"}
              </Button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 overflow-y-scroll no-scrollbar">
            {Object.keys(wallets).map((accountName) => {
              const isActive = selectedWalletName === accountName;
              return (
                <Button
                  className="w-full"
                  key={accountName}
                  variant={isActive ? "outline" : "default"}
                  onClick={() => {
                    console.log(accountName);
                    setSearchParams(`?accountName=${accountName}`);
                  }}
                >
                  {open
                    ? accountName
                    : accountName
                        .split("-")
                        .map((item) => item.slice(0, 2))
                        .join("")}
                </Button>
              );
            })}
          </div>
          <div className="mt-8">
            <Button
              className="w-full"
              onClick={() => {
                setSearchParams("");
                dispatch(removeWallets());
              }}
            >
              <TrashIcon />
              {open && "Delete Wallets"}
            </Button>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex gap-2">
            <div className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 flex justify-between items-center p-5">
              <div>
                <h1 className="text-2xl flex gap-4 capitalize font-bold">
                  {selectedWalletName}
                  <Button
                    size={"icon-sm"}
                    onClick={() => {
                      dispatch(
                        removeWallet({
                          accountName: selectedWalletName,
                        })
                      );
                      setSearchParams("");
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </h1>
              </div>
              <Select
                defaultValue={theme}
                onValueChange={(value) => setTheme(value as Theme)}
              >
                <SelectTrigger showIcon={false}>
                  {theme === "system" ? (
                    <SettingsIcon />
                  ) : theme === "dark" ? (
                    <MoonIcon />
                  ) : (
                    <SunIcon />
                  )}
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-1 gap-2">
            <div className="h-full w-full  rounded-lg bg-gray-100 dark:bg-neutral-800 flex flex-col gap-4 p-4">
              {selectedWalletName &&
                wallets[selectedWalletName]?.map((wallet) => {
                  return (
                    <Card key={wallet.address} className="relative">
                      <CardContent>
                        <h2 className="text-xl font-semibold flex gap-3">
                          <span>WalletName</span> <span>:</span>
                          <span>{wallet.walletName}</span>
                        </h2>
                        <p className="flex items-center gap-3 mt-4">
                          <span>Address</span>
                          <span>:</span>
                          <span>{wallet.address}</span>
                          <Button
                            size={"icon-sm"}
                            onClick={() => {
                              navigator.clipboard
                                .writeText(wallet.address)
                                .then(() => {
                                  toast.info("Address copied to clipboard!!");
                                });
                            }}
                          >
                            <CopyIcon />
                          </Button>
                        </p>
                        <p className="flex items-center gap-3 mt-4">
                          <span>Public Key</span>
                          <span>:</span>
                          <span>{wallet.publicKey}</span>
                          <Button
                            size={"icon-sm"}
                            onClick={() => {
                              navigator.clipboard
                                .writeText(wallet.publicKey)
                                .then(() => {
                                  toast.info(
                                    "Public key copied to clipboard!!"
                                  );
                                });
                            }}
                          >
                            <CopyIcon />
                          </Button>
                        </p>
                      </CardContent>
                      <Button
                        className="absolute top-4 right-4"
                        size={"icon-sm"}
                        onClick={() => {
                          if (wallets[selectedWalletName].length === 1) {
                            setSearchParams("");
                          }
                          dispatch(
                            removeSingleWallet({
                              accountName: selectedWalletName,
                              address: wallet.address,
                            })
                          );
                        }}
                      >
                        <TrashIcon />
                      </Button>
                    </Card>
                  );
                })}

              {Object.keys(wallets).length === 0 && (
                <Card className="h-full border-dashed border-3">
                  <CardContent className="h-full flex flex-col items-center justify-center">
                    <IconHourglassEmpty className="size-10 animate-bounce" />
                    <h2 className="text-xl mt-2">
                      No account in your wallet. Create one.
                    </h2>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        const { ethereumWallet, solanaWallet } =
                          generateWallets(0, seed);
                        dispatch(
                          addWallets({
                            accountName: `account-${0}`,
                            wallets: [ethereumWallet, solanaWallet],
                          })
                        );
                      }}
                    >
                      <PlusCircle className="size-6" />
                      <span>Add Wallet</span>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
