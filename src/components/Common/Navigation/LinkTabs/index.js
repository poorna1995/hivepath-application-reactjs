import { Tab, Tabs, Box } from "@mui/material";

import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, styled } from "@mui/styles";
import { useEffect } from "react";
import SectionLoadingIndicator from "components/Common/Feedback/SectionLoadingIndicator";

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
        <Box
          sx={{
            padding: {
              xs: "8px",
              md: "8px",
            },
          }}
        >
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {},
  tabs: {
    // paddingBottom:'8px'
  },
  tab: {
    textTransform: "initial",
    fontSize: "16px",
    paddingLeft: "16px",
    paddingRight: "16px",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
}));

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});
const LinkTabs = ({
  data,
  tabstyles,
  tabBorderBottom,
  tabsStyles,
  toShowData,
  isLink,
  loading,
  ...props
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("/");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log({ value });
  const { pathname } = useLocation();
  // console.log({ pathname });
  useEffect(() => {
    if (value !== pathname) return setValue(pathname);
    return setValue(pathname);
  }, [pathname, value]);

  const tabListData =
    toShowData &&
    toShowData
      .map((item, index) => {
        const { id, label, show, component } = item;

        return {
          id: index,
          ...item,
        };
      })
      .filter((item, index) => {
        const { id, label, show, component } = item && item;
        if (show)
          return {
            id: index,
            ...item,
          };
        return null;
        // return {
        //   id: index,
        //   label,
        //   show,
        //   component,
        // };
      });

  let tabData = data ? data : tabListData;
  console.log({ tabData });
  return (
    <Box
      sx={
        {
          // maxWidth: "100%"
        }
      }
    >
      {tabData && (
        <>
          <Box
            sx={{
              borderBottom: !tabBorderBottom && 1,
              borderColor: "divider",
              width: "auto",
              // maxWidth: "100%",
            }}
            style={tabsStyles}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="basic tabs "
              {...props}
              className={classes.tabs}
            >
              {tabData?.map((item) => {
                const { label, id, icon: Icon, link } = item;
                return (
                  <Tab
                    style={
                      tabstyles
                        ? tabstyles
                        : {
                            borderBottom:
                              tabBorderBottom && "1px solid rgba(0,0,0,0.1)",
                          }
                    }
                    // sx={{
                    //   '& .MuiTabs-indicator': {
                    //     backgroundColor: 'red !important',
                    //   },
                    // }}
                    key={id}
                    label={label}
                    value={link}
                    to={link}
                    component={Link}
                    icon={Icon && Icon}
                    iconPosition="start"
                    className={classes.tab}
                    {...a11yProps(link)}
                  />
                );
              })}
            </Tabs>
          </Box>

          {loading && loading ? (
            <SectionLoadingIndicator />
          ) : (
            <>
              {" "}
              {tabData?.map((item) => {
                const { id, component, link } = item;
                return (
                  <TabPanel key={id} value={value} index={link}>
                    {component}
                  </TabPanel>
                );
              })}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default LinkTabs;
