import Image from "next/image";
import SheetSide from "@/components/Sheets";
import ImageUploadComponent from "@/components/control/ImageUploadComponent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextareaWithButton } from "@/components/TextArea";

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-blue-100 to-violet-500">
        <div className="  h-full py-12 ">
          <div className=" h-[500px] p-4 flex flex-col  items-center justify-center gap-12 sm:flex-row lg:flex-row md:flex-row">
            <Card className="max-w-full w-[400px] sm:w-[650px] h-[70%]  flex flex-col justify-between p-4 gap-2 rounded-xl">
              <div className="flex flex-col gap-y-2 bg-zinc-100 h-full rounded-xl ">
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    width={50}
                    height={50}
                    alt="image icon"
                    src={
                      "https://api.iconify.design/material-symbols:robot-2-rounded.svg"
                    }
                    color="blue"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full  items-center gap-y-2  ">
                <Button variant={"ghost"}>
                  <Image
                    alt="photo icon"
                    width={50}
                    height={50}
                    src={
                      "https://api.iconify.design/material-symbols:add-photo-alternate-outline.svg"
                    }
                  />{" "}
                </Button>
                <Button
                  variant={"default"}
                  size={"lg"}
                  title="click to automate"
                  className="w-full text-md"
                >
                  Automatizar
                </Button>
              </div>
            </Card>
          </div>
          <div className=" p-2 w-full  flex  justify-center ">
            <div className="w-[500px] h-12 flex items-center">
              <TextareaWithButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
