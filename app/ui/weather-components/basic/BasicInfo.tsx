import BasicIcon from "./BasicIcon";

const BasicInfo = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row gap-2 items-start">
      <BasicIcon type={title} />
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold">{title}</p>
        {children}
      </div>
    </div>
  );
};

export default BasicInfo;
