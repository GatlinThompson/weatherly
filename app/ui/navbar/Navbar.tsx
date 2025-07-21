import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-space-between  px-4 gap-4 mt-5 w-full">
      <div className="flex flex-row">
        <Image src="/icon.svg" alt="Weatherly Icon" width={32} height={32} />
        <h1 className="text-2xl font-bold text-primary">Weatherly</h1>
      </div>
    </nav>
  );
}
