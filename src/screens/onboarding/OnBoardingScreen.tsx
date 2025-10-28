import { useAppSelector } from "@/store/hooks";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const OnBoardingScreen = () => {
  const seedSaved = useAppSelector((state) => state.seed.saved);
  const navigate = useNavigate();

  useEffect(() => {
    if (seedSaved) {
      navigate("/", {
        replace: true,
      });
    }
  }, [seedSaved]);
  return (
    <div className="w-full h-screen grid place-items-center">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          <Step1 />
          <Step2 />
          <Step3 />
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default OnBoardingScreen;
