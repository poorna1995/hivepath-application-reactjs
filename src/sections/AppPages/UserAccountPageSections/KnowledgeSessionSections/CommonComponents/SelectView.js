import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PaperBase from "components/Common/PaperBase/PaperBase";
import KnowldgeSessionHostPage from "pages/AppPages/SessionPages/Host/KnowldgeSessionHostPage";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Switch as RouteSwitch,
  Route,
  useHistory,
  useRouteMatch,
} from "react-router";
import { NavLink } from "react-router-dom";
import { setHostView } from "store/views/view.actions";

const mapState = ({ view }) => ({
  hostView: view.host,
});

const useStyles = makeStyles((theme) => ({
  link: {
    color: "rgba(72, 74, 158, 1)  !important",
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: "700 !important",
  },
}));

const SelectView = () => {
  const classes = useStyles();
  const { hostView } = useSelector(mapState);
  console.log({ hostView });
  const [host, setHost] = useState(hostView);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleChange = (e) => {
    // console.log("host", host);
    setHost(e.target.checked);

    // dispatch(setHostView(host));

    dispatch(setHostView(e.target.checked));

    if (!hostView) {
      return history.push("/u/account/knowledge-session/host");
    } else {
      return history.push("/u/account/knowledge-session/attendee/my-sessions");
    }
  };
  // useEffect(() => {
  //   if (hostView) {
  //     return history.push("/u/account/knowledge-session/host");

  //   } else {
  //     return history.push(
  //       "/u/account/knowledge-session/attendee"
  //     );
  //   }

  // }, [hostView]);
  let { path, url } = useRouteMatch();
  // console.log({ path, url });

  const history = useHistory();
  //   useEffect(()=> {
  //       setChecked(true)
  //   },[checked])
  // useEffect(() => {
  // }, [host]);

  return (
    <PaperBase style={{ position: "fixed" }}>
      <Typography
        style={{ fontWeight: "600", fontSize: "18px", marginBottom: "8px" }}
      >
        View As : {hostView ? "host" : "attendee"}
      </Typography>

      <Stack direction="row" alignItems="center">
        <span style={{ fontWeight: hostView ? "" : "600" }}>Attendee</span>{" "}
        <Switch
          // defaultChecked
          checked={hostView}
          // value={host}
          onChange={handleChange}
        />{" "}
        <span style={{ fontWeight: hostView ? "600" : "" }}>Host</span>
      </Stack>
      <Divider />
      {hostView === true ? (
        <List>
          <MenuItem
            component={NavLink}
            activeClassName={classes.link}
            to={`/u/account/knowledge-session/host/my-sessions`}
            // activeStyle={{ color: "yellow", background: "rgba(0,0,0,1)" }}
          >
            <ListItemText
              primaryTypographyProps={{
                fontSize: "16px",
                lineHeight: "28px",
                fontWeight: "600 ",
              }}
              primary="My Sessions"
            />
          </MenuItem>

          <MenuItem
            activeClassName={classes.link}
            component={NavLink}
            to={`/u/account/knowledge-session/host/my-attendees`}
          >
            {" "}
            <ListItemText
              // className={classes.link}

              primaryTypographyProps={{
                fontSize: "16px",
                lineHeight: "28px",
                fontWeight: "600 ",
              }}
              primary="My Attendee"
            />
          </MenuItem>
          <MenuItem
            activeClassName={classes.link}
            component={NavLink}
            to={`/u/account/knowledge-session/host/manage`}
          >
            {" "}
            <ListItemText
              primaryTypographyProps={{
                fontSize: "16px",
                lineHeight: "28px",
                fontWeight: "600 ",
              }}
              primary="Manage"
            />
          </MenuItem>
        </List>
      ) : (
        <List>
          <MenuItem
            component={NavLink}
            activeClassName={classes.link}
            to="/u/account/knowledge-session/attendee/my-sessions"
          >
            <ListItemText
              primaryTypographyProps={{
                fontSize: "16px",
                lineHeight: "28px",
                fontWeight: "600",
              }}
              primary="My Sessions"
            />
          </MenuItem>
          <MenuItem
            component={NavLink}
            activeClassName={classes.link}
            to="/u/account/knowledge-session/attendee/my-hosts"
          >
            {" "}
            <ListItemText
              primaryTypographyProps={{
                fontSize: "16px",
                lineHeight: "28px",
                fontWeight: "600 ",
              }}
              primary="My Host"
            />
          </MenuItem>
        </List>
      )}
    </PaperBase>
  );
};

export default SelectView;
