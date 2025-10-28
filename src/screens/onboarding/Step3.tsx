import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem, useCarousel } from "@/components/ui/carousel";
import { setSeed, updateSeedSaved } from "@/store/features/seed/seedSlice";
import { addWallets } from "@/store/features/wallet/walletsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { generateWallets } from "@/utils/generateWallets";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const Step3 = () => {
  const { scrollPrev } = useCarousel();
  const dispatch = useAppDispatch();
  const mnemonic = useAppSelector((state) => state.seed.mnemonic);
  const seed = useAppSelector((state) => state.seed.seed);
  const navigate = useNavigate();

  return (
    <CarouselItem>
      <div className="">
        <Card className="relative">
          <Button
            size={"icon"}
            variant={"outline"}
            className="absolute top-2 left-2"
            onClick={() => {
              dispatch(
                setSeed({
                  mnemonic: "",
                  seed: "",
                  saved: false,
                })
              );
              scrollPrev();
            }}
          >
            <ArrowLeft />
          </Button>
          <CardContent className=" aspect-square p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center gap-2">
                <img src="/wallet.svg" className="w-10 h-10" />
                <p className="text-2xl font-bold">manthan</p>
              </div>
              <div>
                <h2 className="text-base font-medium text-center mt-4">
                  Save your mnemonic/seed phrase
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center my-6">
              {mnemonic.split(" ").map((value, index) => {
                return (
                  <Button
                    key={index}
                    variant={"outline"}
                    className="pointer-events-none flex-1"
                  >
                    {value}
                  </Button>
                );
              })}
            </div>
            <Button
              onClick={() => {
                dispatch(updateSeedSaved(true));
                const { ethereumWallet, solanaWallet } = generateWallets(
                  0,
                  seed
                );
                dispatch(
                  addWallets({
                    accountName: "account-0",
                    wallets: [ethereumWallet, solanaWallet],
                  })
                );
                navigate("/", {
                  replace: true,
                });
              }}
              className="w-full"
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default Step3;
