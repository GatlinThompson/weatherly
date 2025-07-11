import Image from "next/image";

const MeterBox = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const image_file = title.toLowerCase().replace(" ", "-") + ".svg";

  return (
    <div className="bg-primary rounded-xl p-4 shadow-xl w-full border-foreground border-3">
      <div className="flex flex-row align-end gap-1 ">
        <Image
          src={`/${image_file}`}
          alt={`${title} Icon`}
          width={24}
          height={24}
          style={{ width: "auto", height: "auto" }}
        />
        <p className="font-bold text-xl mb-0">{title}</p>
      </div>
      {children}
    </div>
  );
};

export default MeterBox;
