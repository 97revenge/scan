export default function Home() {
  return (
    <>
      <div className="h-screen w-screen bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-white via-gray-100 to-gray-500">
        <div className="w-full h-7  p-2 ">ok</div>
        <div className="p-4 flex flex-col w-auto h-full items-center justify-center gap-12 sm:flex-row lg:flex-row md:flex-row">
          <div className="w-[30%] h-[50%] bg-red-200">inserir imagem</div>
          <div className="w-[30%] h-[50%] bg-red-200 flex flex-col justify-between p-4">
            <span>dados da imagem</span>
            <button className="bg-blue-200">automatizar imagem</button>
          </div>
        </div>
        <div className="relative bottom-[12%] p-2 w-full bg-red-200 flex  justify-center">
          <div className="bg-blue-200 w-auto flex justify-end gap-2">
            <label htmlFor="text">coloque o seu google sheets url aqui </label>
            <input type="text" className="w-[300px]" />
          </div>
        </div>
      </div>
    </>
  );
}
