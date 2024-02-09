import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea
        placeholder="Coloque o link do seu google sheets aqui"
        className="bg-white text-center "
        maxLength={32}
      />
      <Button>Enviar</Button>
    </div>
  );
}
