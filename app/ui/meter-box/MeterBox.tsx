import Image from "next/image";

const MeterBox = ({
  children,
  title,
  weather = false,
}: {
  children: React.ReactNode;
  title?: string;
  weather?: boolean;
}) => {
  let image_file = "";
  if (title) {
    image_file =
      title.toLowerCase().replace(" ", "-").replace("&", "").replace(" ", "") +
      ".svg";
  }

  return (
    <div className="bg-quaternary rounded-xl p-3 shadow-2xl w-full border-foreground border-1">
      {!weather ? (
        <div className="flex flex-row align-end gap-1 ">
          <Image
            src={`/${image_file}`}
            alt={`${title} Icon`}
            width={24}
            height={24}
          />
          <p className={`"font-bold text-xl mb-0`}>{title}</p>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default MeterBox;
