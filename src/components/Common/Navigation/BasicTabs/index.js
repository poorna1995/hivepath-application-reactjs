import { Tab, Tabs, Box } from "@mui/material";

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles, styled } from "@mui/styles";

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
export default function BasicTabs({
  data = [],
  tabstyles,
  tabBorderBottom,
  tabsStyles,
  toShowData = [],
  tabsProps,
  ...props
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabListData =
    toShowData &&
    toShowData
      .map((item, index) => {
        const { id, label, show, component } = item;

        return {
          id: index,
          label,
          show,
          component,
        };
      })
      .filter((item, index) => {
        const { id, label, show, component } = item && item;
        if (show)
          return {
            id: index,
            label,
            show,
            component,
          };
        return null;
        // return {
        //   id: index,
        //   label,
        //   show,
        //   component,
        // };
      });
  // .filter((item, index) => {
  //   const { id, title, hide, component } = item && item;

  //   return {
  //     id: index,
  //     index,
  //     title,
  //     hide,
  //     component,
  //   };
  // });
  console.log({ tabListData });

  return (
    <Box
      sx={
        {
          // maxWidth: "100%"
        }
      }
    >
      {data.length > 0 && (
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
              className={classes.tabs}
              {...props}
            >
              {data.map((item) => {
                const { label, id, icon: Icon } = item;
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
                    icon={Icon && Icon}
                    iconPosition="start"
                    className={classes.tab}
                    {...a11yProps(id)}
                  />
                );
              })}
            </Tabs>
          </Box>

          {data?.map((item) => {
            const { id, component } = item;
            return (
              <TabPanel key={id} value={value} index={id}>
                {component}
              </TabPanel>
            );
          })}
        </>
      )}
      {tabListData.length > 0 && (
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
              aria-label="basic tabs "
              {...props}
              className={classes.tabs}
            >
              {tabListData?.map((item) => {
                const { label, id, icon: Icon } = item;
                return (
                  <Tab
                    className={classes.tab}
                    style={
                      tabstyles
                        ? tabstyles
                        : {
                            borderBottom:
                              tabBorderBottom && "1px solid rgba(0,0,0,0.1)",
                          }
                    }
                    key={id}
                    label={label}
                    icon={Icon && Icon}
                    iconPosition="start"
                    {...a11yProps(id)}
                  />
                );
              })}
            </Tabs>
          </Box>

          {tabListData?.map((item) => {
            const { id, component } = item;
            return (
              <TabPanel key={id} value={value} index={id}>
                {component}
              </TabPanel>
            );
          })}
        </>
      )}
    </Box>
  );
}
