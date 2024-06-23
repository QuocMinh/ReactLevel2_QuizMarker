import { FC, memo } from "react";

type PageHeaderProps = {
  title: string;
};

export const PageHeader: FC<PageHeaderProps> = memo(({ title }) => {
  return (
    <div className="pt-4">
      <h3 className="text-center text-uppercase ">{title}</h3>
    </div>
  );
});
