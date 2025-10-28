import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem, useCarousel } from "@/components/ui/carousel";
import { BitcoinIcon } from "lucide-react";

const Step1 = () => {
  const { scrollNext } = useCarousel();
  return (
    <CarouselItem>
      <div className="p-1">
        <Card>
          <CardContent className=" aspect-square p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center gap-2">
                <img src="/wallet.svg" className="w-10 h-10" />
                <p className="text-2xl font-bold">manthan</p>
              </div>
              <div>
                <h2 className="text-base font-medium text-center mt-4">
                  To get started create a new wallet
                </h2>
              </div>
            </div>
            <div className="flex justify-center">
              <BitcoinIcon className="size-16" />
            </div>
            <Button onClick={scrollNext} className="w-full">
              Create a Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default Step1;
