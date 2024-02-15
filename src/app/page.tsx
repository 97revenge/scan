"use client";

import Image from "next/image";
import SheetSide from "@/components/Sheets";
import ImageUploadComponent from "@/components/control/ImageUploadComponent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextareaWithButton } from "@/components/TextArea";
import { Input } from "@/components/ui/input";
import { fileToGenerativePart } from "@/lib/actions";
import { useEffect, useState } from "react";
import { run } from "./api/gemini";
import ResponseComponent from "@/components/ui/response-content";
import Notes from "@/components/ui/notes";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [textValue, setTextValue] = useState<string>(
    `Understand the image.
    This image is a receipt or invoice. you will capture information from this image and convert it to json in an organized and clear way`
  );
  const [imageParts, setImageParts] = useState<Array<Object>>([]);
  const [apikeys, setApikeys] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [safety, setSafety] = useState<string>("");
  const [maxToken, setMaxToken] = useState<number>(0);
  const [generationConfig, setGenerationConfig] = useState<Object>({});

  const handleButtonClick = () => {
    const fileInput = document.getElementById("picture");
    fileInput?.click();
  };

  useEffect(() => {
    getValues();
  }, [textValue, imageParts]);

  const getValues = async () => {
    if (localStorage !== undefined) {
      // Check for configuration settings
      if (localStorage.getItem("apikey")) {
        await setApikeys(localStorage.getItem("apikey") || "");
      } else {
        await setApikeys("");
      }

      if (localStorage.getItem("token")) {
        await setMaxToken(parseInt(localStorage.getItem("token") || ""));

        // await setSafety(localStorage.getItem("safety") || "");
      } else {
        setMaxToken(0);
      }
    }
  };

  // Generation Configuration
  useEffect(() => {
    if (maxToken > 0) {
      setGenerationConfig({
        maxOutputTokens: maxToken,
      });
    } else {
      setGenerationConfig({});
    }
  }, [maxToken, textValue]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    getValues();

    console.log("maxToken", maxToken);

    if (maxToken > 0) {
      console.log("This line is getting executed");
      setGenerationConfig({
        maxNumTokens: maxToken,
      });
    }

    // Packing text and images into an object called message and send it to the api
    try {
      if (imageParts === undefined || imageParts.length == 0) {
        const message = {
          text: textValue.trim(),
        };

        run(message, apikeys, generationConfig).then((response) => {
          setResponse(response);
        });
      } else {
        const message = {
          text: textValue.trim(),
          imageParts: imageParts,
        };

        // Take the message object and send it to the api
        run(message, apikeys, generationConfig)
          .then((response) => {
            if (response.length > 0 && response !== undefined) {
              setResponse(response);
            }
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    } catch (error) {
      console.log("Failed to send message");
    } finally {
      setImageParts([]);
      setTextValue("");
      setLoading(false);
    }
  };

  const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;

    if (files && files.length > 0) {
      alert("file selected");

      const generativePart: Array<Object> = [];
      for (let i = 0; i < files.length; i++) {
        fileToGenerativePart(files[i]).then((base64Image) => {
          generativePart.push(base64Image);
          setImageParts(generativePart);
        });
      }
    } else {
      alert("erro");
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-blue-100 to-violet-500">
        <div className="  h-full   ">
          <div className=" p-2 w-full  flex flex-col  justify-center ">
            <div className="w-full  h-12 flex items-center justify-center relative top-[90px] ">
              <TextareaWithButton />
            </div>
          </div>
          <div className=" h-[500px] max-h-auto p-4 flex flex-col  items-center justify-center gap-12 sm:flex-row lg:flex-row md:flex-row">
            <Card className="max-w-full w-[400px] sm:w-[650px] h-[70%]  flex flex-col justify-between p-4 gap-2 rounded-xl">
              <div className="flex flex-col gap-y-2 bg-zinc-100 h-full rounded-xl justify-center ">
                {loading && (
                  <p className="text-xl text-muted-foreground mt-2 animate-pulse">
                    Generating response...
                  </p>
                )}

                {response.length > 0 ? (
                  <>
                    <ResponseComponent response={response} />
                  </>
                ) : (
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
                )}
              </div>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-row w-full   items-center justify-start gap-y-2"
                >
                  <div className="flex flex-row  justify-center items-center mt-2  pl-2 mr-2 mb-3">
                    <Button
                      className="rounded-xl p-2  w-10 h-10   bg-gray-200"
                      type="button"
                      onClick={handleButtonClick}
                    >
                      <Image
                        width={30}
                        height={30}
                        alt="upload icon"
                        src={
                          "https://api.iconify.design/material-symbols:drive-folder-upload.svg"
                        }
                      />
                      <Input
                        className="mr-2 ml-2"
                        id="picture"
                        type="file"
                        onChange={handleImages}
                        accept="image/jpeg, image/png , image/jpg , image/webp, image/heic , image/heif"
                        style={{ display: "none" }}
                        multiple
                      />
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant={"default"}
                    size={"lg"}
                    title="click to automate"
                    className="w-full text-md"
                  >
                    Automatizar
                  </Button>
                </form>
              </div>{" "}
              <div className="flex flex-col justify-center items-center  w-auto relative mx-3 top-16"></div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
