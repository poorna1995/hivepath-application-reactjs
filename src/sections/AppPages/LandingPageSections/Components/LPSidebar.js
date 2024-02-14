import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router";
import { useState } from "react";

import { ReactComponent as homeI } from "assets/svg/landing-page/home.svg";
import { ReactComponent as draftI } from "assets/svg/landing-page/draft.svg";
import { ReactComponent as bookmarkI } from "assets/svg/landing-page/bookmark.svg";

import { ReactComponent as homeA } from "assets/svg/landing-page/homeFill.svg";
import { ReactComponent as draftA } from "assets/svg/landing-page/draftFill.svg";
import { ReactComponent as bookmarkA } from "assets/svg/landing-page/bookmarkFill.svg";

import PaperBase from "components/Common/PaperBase/PaperBase";

const LPSidebar = (props) => {
  const [activeLink, setNewActiveLink] = useState(false);
  const params = useParams();
  const { step } = params;

  return (
    <PaperBase style={{ position: "fixed", height: "100%" }}>
      <List style={{ width: "100%" }}>
        {links?.map((item, index) => {
          const {
            url,
            title,
            inactiveIcon: InactiveIcon,
            activeIcon: ActiveIcon,
          } = item;

          return (
            <NavLink
              to={url}
              key={"link" + index}
              isActive={(match, location) => {
                match && setNewActiveLink(index); // <-- set active index
                return match; // <-- return boolean
              }}
            >
              <ListItem button key={title} style={{ marginBottom: "20px" }}>
                <ListItemIcon style={{ minWidth: "30px" }}>
                  {activeLink === index && (
                    <ActiveIcon style={{ height: "20px", width: "20px" }} />
                  )}
                  {activeLink !== index && (
                    <InactiveIcon style={{ height: "20px", width: "20px" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    color: activeLink === index ? "rgb(72, 74, 158)" : "black",
                    fontWeight: "600",
                  }}
                />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    </PaperBase>
  );
};

export default LPSidebar;

const links = [
  {
    title: "Home",
    url: "/home",
    inactiveIcon: homeI,
    activeIcon: homeA,
  },
  {
    title: "Drafts",
    url: "/drafts",
    inactiveIcon: draftI,
    activeIcon: draftA,
  },
  {
    title: "Bookmarks",
    url: "/bookmarks",
    inactiveIcon: bookmarkI,
    activeIcon: bookmarkA,
  },
];
