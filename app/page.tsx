import Image from "next/image";
import Link from "next/link";

import LandingBlock from "./ui/landing-block/LandingBlock";
import ContentBody from "./ui/content-body/ContentBody";

export default function Home() {
  return (
    <main>
      <LandingBlock />
      <ContentBody />
    </main>
  );
}
