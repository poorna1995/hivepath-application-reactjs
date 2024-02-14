import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import { ReactComponent as ProfileIconI } from "assets/svg/user-account/edit-profile/userI.svg";
import { ReactComponent as EducationIconI } from "assets/svg/user-account/edit-profile/educationI.svg";
import { ReactComponent as ExperienceIconI } from "assets/svg/user-account/edit-profile/experienceI.svg";
import { ReactComponent as SkillsIconI } from "assets/svg/user-account/edit-profile/skillsI.svg";
import { ReactComponent as SocialIconI } from "assets/svg/user-account/edit-profile/heartI.svg";

import { ReactComponent as ProfileIconA } from "assets/svg/user-account/edit-profile/userA.svg";
import { ReactComponent as EducationIconA } from "assets/svg/user-account/edit-profile/educationA.svg";
import { ReactComponent as ExperienceIconA } from "assets/svg/user-account/edit-profile/experienceA.svg";
import { ReactComponent as SkillsIconA } from "assets/svg/user-account/edit-profile/skillsA.svg";
import { ReactComponent as SocialIconA } from "assets/svg/user-account/edit-profile/heartA.svg";

import PaperBase from "components/Common/PaperBase/PaperBase";

const EPSidebar = (props) => {
  const params = useParams();
  const { step } = params;

  return (
    <PaperBase style={{ position: "fixed" }}>
      <List style={{ width: "100%" }}>
        {links?.map((item, index) => {
          const {
            url,
            title,
            pageStep,
            inactiveIcon: InactiveIcon,
            activeIcon: ActiveIcon,
          } = item;
          const isActive = pageStep === step ? true : false;

          return (
            <Link to={url} key={"link" + index}>
              <ListItem button key={title} style={{ marginBottom: "20px" }}>
                <ListItemIcon style={{ minWidth: "30px" }}>
                  {isActive && (
                    <ActiveIcon style={{ height: "20px", width: "20px" }} />
                  )}
                  {!isActive && (
                    <InactiveIcon style={{ height: "20px", width: "20px" }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    color: isActive ? "rgb(72, 74, 158)" : "black",
                    fontWeight: "600",
                  }}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </PaperBase>
  );
};

EPSidebar.propTypes = {};

export default EPSidebar;

const links = [
  {
    title: "General",
    url: "/u/account/edit-profile/1",
    pageStep: "1",
    inactiveIcon: ProfileIconI,
    activeIcon: ProfileIconA,
  },
  {
    title: "Experience",
    url: "/u/account/edit-profile/2",
    pageStep: "2",
    inactiveIcon: ExperienceIconI,
    activeIcon: ExperienceIconA,
  },
  {
    title: "Education",
    url: "/u/account/edit-profile/3",
    pageStep: "3",
    inactiveIcon: EducationIconI,
    activeIcon: EducationIconA,
  },
  {
    title: "Skill set",
    url: "/u/account/edit-profile/4",
    pageStep: "4",
    inactiveIcon: SkillsIconI,
    activeIcon: SkillsIconA,
  },
  {
    title: "Social Media Links",
    url: "/u/account/edit-profile/5",
    pageStep: "5",
    inactiveIcon: SocialIconI,
    activeIcon: SocialIconA,
  },
];
