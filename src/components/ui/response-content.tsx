"use client";

import Markdown from "react-markdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon, LightningBoltIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ResponseComponent(props: { response: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(markdown)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        alert("copiado com sucesso !!!");
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const markdown = `${props.response}`;
  return (
    <>
      <Alert className=" w-64 sm:w-auto  h-auto mb-2 sm:mx-2 overflow-auto p-2">
        <RocketIcon className="h-4 w-4  " />
        <AlertTitle>Sua nota convertida em .csv ! </AlertTitle>
        <AlertDescription className="text-balance">
          <Markdown className={"bg-zinc-200 p-2 rounded-md dark:text-black "}>
            {markdown}
          </Markdown>
          <div className="w-full flex items-center justify-center my-2">
            <Button variant={"ghost"} onClick={handleCopy}>
              {" "}
              copiar conteúdo
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </>
  );
}
