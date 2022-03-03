import { FC } from "react";
import { Box, Toolbar } from "@mui/material";
import { SideBar, drawerWidth } from "..";

interface IWrapperProps {}

export const Wrapper: FC<IWrapperProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          overflow: "auto",
          background: "#0d1148",
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }} />
        <div className="page">{children}</div>
      </Box>
    </Box>
  );
};
