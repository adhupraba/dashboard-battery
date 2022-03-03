import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "src/assets/images/profile-icon.png";
import { drawerWidth, sidebarItems } from "./staticData";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ExpandMore, Menu } from "@mui/icons-material";

interface ISideBarProps {}

export const SideBar: FC<ISideBarProps> = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="sidebar">
      <Toolbar>
        <h2 className="highlight">Grid Manager 2.0</h2>
      </Toolbar>
      <Divider sx={{ background: "#b0b1c1" }} />
      <List>
        <ListItem>
          <ListItemIcon>
            <Avatar alt="Adharsh" src={ProfileIcon} />
          </ListItemIcon>
          <Stack>
            <ListItemText classes={{ primary: "highlight" }} primary={"Hey, Adharsh"} secondary={"User Id: ABC-24"} />
          </Stack>
        </ListItem>
        {sidebarItems.map((item, idx) => {
          if (item.nested?.length) {
            return (
              <Accordion
                key={idx}
                elevation={0}
                sx={{
                  "::before": { height: "0px", backgroundColor: "transparent" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  className="bg-primary"
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <ListItemIcon>{<item.icon />}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </AccordionSummary>
                <AccordionDetails className="bg-primary" sx={{ paddingLeft: "0px", paddingRight: "0px" }}>
                  <Stack direction="column" spacing={2}>
                    {item.nested.map((nestedItem, index) => (
                      <ListItem
                        key={index}
                        button
                        style={{ padding: "10px 16px", marginTop: "0px" }}
                        onClick={() => navigate(`/${nestedItem.route}`)}
                      >
                        <ListItemIcon>{<nestedItem.icon />}</ListItemIcon>
                        <ListItemText primary={nestedItem.name} />
                      </ListItem>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            );
          } else {
            return (
              <ListItem key={idx} button onClick={() => navigate(`/${item.route}`)}>
                <ListItemIcon>{<item.icon />}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            );
          }
        })}
      </List>
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        className="bg-primary"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: "none" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Grid Manager 2.0
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: "bg-primary" }}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          classes={{ paper: "bg-primary" }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Fragment>
  );
};
