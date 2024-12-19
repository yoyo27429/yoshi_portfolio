import { PropsWithChildren } from "react";

export const TwoColumnContainer: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return <div className="flex gap-10 my-[60px]">{children}</div>;
};

export const ColumnComponent: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <div className="flex flex-col w-1/2 border-t-2 py-3 border-[rgba(148,148,148,0.2)">
      {children}
    </div>
  );
};
