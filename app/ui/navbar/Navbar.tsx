import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Bars3Icon } from "@heroicons/react/16/solid";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-space-between  px-4 gap-4 mt-5 w-full">
      <div className="flex flex-row">
        <Image src="/icon.svg" alt="Weatherly Icon" width={32} height={32} />
        <h1 className="text-2xl font-bold">Weatherly</h1>
      </div>

      <ul className="flex flex-row items-center justify-end flex-grow gap-4">
        <li>
          <MagnifyingGlassIcon className="h-8 w-8 text-foreground" />
        </li>
        <li className="block lg:hidden">
          <Bars3Icon className="h-8 w-8 text-foreground" />
        </li>
      </ul>
    </nav>
  );
}
