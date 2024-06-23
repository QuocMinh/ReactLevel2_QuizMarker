import { appSelector } from "@store/slices/appSlice";
import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { Alert, List } from "reactstrap";

type PageHeaderProps = {
  title: string;
};

export const PageHeader: FC<PageHeaderProps> = memo(({ title }) => {
  const errorArea = useSelector(appSelector.errorArea);

  return (
    <div className="pt-4">
      <h3 className="text-center text-uppercase ">{title}</h3>

      {errorArea.show && (
        <Alert color={errorArea.type} className="mt-4">
          <List className="m-0">
            {errorArea.message.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </List>
        </Alert>
      )}
    </div>
  );
});
