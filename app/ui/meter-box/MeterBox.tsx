import Image from "next/image";

const MeterBox = ({
  children,
  title,
  hide = false,
}: {
  children: React.ReactNode;
  title?: string;
  hide?: boolean;
}) => {
  return (
    <div
      className={`${
        !hide
          ? `bg-primary rounded-xl  p-6 shadow-lg w-full border-1  border-primary-border  flex flex-col`
          : `lg:bg-primary lg:rounded-xl  lg:p-6 lg:shadow-lg lg:w-full lg:border-1  lg:border-primary-border  lg:flex lg:flex-col`
      } 
      `}
    >
      {title ? (
        <div className="flex flex-row align-end gap-1">
          <p className="font-bold text-xl mb-0">{title}</p>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default MeterBox;
