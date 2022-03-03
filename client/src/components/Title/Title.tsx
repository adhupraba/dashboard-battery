import { FC, Fragment } from "react";
import { Divider, Stack, Badge } from "@mui/material";
import { NotificationsActiveOutlined } from "@mui/icons-material";

interface ITitleProps {
  title: string;
}

export const Title: FC<ITitleProps> = ({ title }) => {
  return (
    <Fragment>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h3 className="color-primary capitalize">{title}</h3>
        <Stack direction="row" alignItems="center" spacing={2}>
          <p className="color-primary">Carisberg Group</p>
          <Badge badgeContent={2} color="error">
            <NotificationsActiveOutlined className="color-primary" />
          </Badge>
        </Stack>
      </Stack>
      <Divider sx={{ background: "#b0b1c1", opacity: 0.4, margin: "20px 0px" }} />
    </Fragment>
  );
};
