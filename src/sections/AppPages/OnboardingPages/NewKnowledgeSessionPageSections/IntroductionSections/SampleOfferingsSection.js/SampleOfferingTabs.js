import React from "react";

import { Chip, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Box } from "@mui/system";

import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tab: {
    background:
      "linear-gradient(90deg, rgba(102,126,234,1) 0%, rgba(102,126,234,1) 39%, rgba(250,112,154,1) 100%)",
    padding: "2px",
  },
}));
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    //   maxWidth: 40,
    //   width: '100%',
    //   backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    //   fontSize: theme.typography.pxToRem(15),
    marginRight: "-12px",
    //   color: 'rgba(255, 255, 255, 0.7)',
    "&.Mui-selected": {
      // color: '#fff',
      // border:'1px solid red'
    },
    "&.Mui-focusVisible": {
      // backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  })
);

const SampleOfferingTabs = ({ alldata = [] }) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderTab = (label, value, id) => {
    return (
      <Chip
        label={label}
        clickable
        disableRipple
        className={classes.tab}
        style={{
          border: value === id ? "" : "1.5px solid rgba(72, 74, 158, 1)",

          background: value === id ? "#484a9e" : "white",
          color: value === id ? "white" : "black",
          fontWeight: 600,
          fontSize: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          height: "42px",
          borderRadius: "50px",
        }}
      />
    );
  };
  return (
    <Box>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="styled tabs example"
        variant="scrollable"
        scrollButtons="auto"
        disableRipple
      >
        {alldata.map((item, index) => {
          const { title } = item;
          return (
            <StyledTab
              disableRipple
              label={renderTab(title, value, index)}
              {...a11yProps(index)}
            />
          );
        })}
      </StyledTabs>
      <Box>
        {alldata.map((item, index) => {
          const { component } = item;
          return (
            <TabPanel value={value} index={index}>
              {component}
            </TabPanel>
          );
        })}
      </Box>
    </Box>
  );
};

export default SampleOfferingTabs;
