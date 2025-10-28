import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem, useCarousel } from "@/components/ui/carousel";
import { setSeed } from "@/store/features/seed/seedSlice";
import { useAppDispatch } from "@/store/hooks";
import { IconSeeding } from "@tabler/icons-react";
import { ArrowLeft } from "lucide-react";
import { generateMnemonic, mnemonicToSeedSync } from "@scure/bip39";
import { hex } from "@scure/base";
import { wordlist } from "@scure/bip39/wordlists/english.js";

const Step2 = () => {
  const { scrollNext, scrollPrev } = useCarousel();
  const dispatch = useAppDispatch();

  function createSeedPhrase() {
    const mnemonic = generateMnemonic(wordlist);
    const seed = mnemonicToSeedSync(mnemonic);
    try {
      dispatch(
        setSeed({
          mnemonic,
          seed: hex.encode(seed),
          saved: false,
        })
      );
    } catch (error) {
      console.log(error);
    }
    scrollNext();
  }
  return (
    <CarouselItem>
      <div className="">
        <Card className="relative">
          <Button
            size={"icon"}
            variant={"outline"}
            className="absolute top-2 left-2"
            onClick={scrollPrev}
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
                  For creating & managing wallets, create a seed phrase
                </h2>
              </div>
            </div>
            <div className="flex justify-center">
              <IconSeeding className="size-16" />
            </div>
            <Button
              onClick={() => {
                createSeedPhrase();
              }}
              className="w-full"
            >
              Create a Seed Phrase
            </Button>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default Step2;
