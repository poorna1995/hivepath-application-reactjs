import { Box } from "@mui/material";
import React from "react";
import { PropTypes } from "prop-types";
import { Tab, Tabs, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { styled } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },

  tabsContainer: {
    // paddingLeft: "1rem",
    marginLeft: "auto",
  },
  tabWrapper: {
    width: "auto",
  },

  tabContainer: {
    minWidth: "120px",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  overflow: "visible",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    overflow: "visible",
  },
  "& .MuiTabs-indicatorSpan": {
    // maxWidth: 20,

    width: "100%",
    // backgroundColor: "#635ee7",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    // height: "36px",
    color: "black",
    textTransform: "none",
    fontWeight: "bold",
    fontSize: "14px",
    marginRight: theme.spacing(1),
    // color: 'rgba(255, 255, 255, 0.7)',
    "&.Mui-selected": {
      color: "#484A9E !important",
      backgroundColor: "#FFFFFF",
      borderRadius: "100px",
      // border: "1px solid rgba(0,0,0,0.1)",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    "&.Mui-focusVisible": {
      color: theme.palette.primary.main,

      // backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePageTabs = ({ data }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const _renderTab = (navigation) => {
    const { label, id, icon } = navigation;
    const title = (
      <Typography component="h3">
        {icon && icon} {label}
      </Typography>
    );
    return (
      <StyledTab
        // className={classes.tabContainer}
        key={id}
        disableFocusRipple
        disableRipple
        disableTouchRipple
        // classes={{ wrapper: classes.tabWrapper }}
        label={title}
        aria-label={title}
        style={
          {
            // textTransform: "capitalize",
            // fontSize: "16px",
            // paddingLeft: "16px",
            // paddingRight: "16px",
          }
        }

        // component={Link}
        // to={navigation.url}
      />
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          overflow: "visible",
          borderBottom: "1px solid",
          borderColor: "divider",
          paddingBottom: "8px",
          alignItems: "center",
        }}
      >
        <StyledTabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs "
          style={{ overflow: "visible !important" }}
        >
          {data?.map(_renderTab)}
        </StyledTabs>
      </Box>

      {data?.map((item) => {
        const { id, component } = item;
        return (
          <TabPanel key={id} value={value} index={id}>
            {component}
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default ProfilePageTabs;
