// import { Tab, Tabs, Box } from "@mui/material";

// import React from "react";
// import PropTypes from "prop-types";

// function TabPanel(props) {
// 	const { children, value, index, ...other } = props;

// 	return (
// 		<div
// 			role="tabpanel"
// 			hidden={value !== index}
// 			id={`simple-tabpanel-${index}`}
// 			aria-labelledby={`simple-tab-${index}`}
// 			{...other}
// 		>
// 			{value === index && (
// 				<Box>
// 					<div>{children}</div>
// 				</Box>
// 			)}
// 		</div>
// 	);
// }

// TabPanel.propTypes = {
// 	children: PropTypes.node,
// 	index: PropTypes.number.isRequired,
// 	value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
// 	return {
// 		id: `simple-tab-${index}`,
// 		"aria-controls": `simple-tabpanel-${index}`,
// 	};
// }

// const CustomTabs = ({data}) => {
//     const [value, setValue] = React.useState(0);

// 	const handleChange = (event, newValue) => {
// 		setValue(newValue);
// 	};

//     const _renderTab = (navigation) => {
//         const { label, id } = navigation;
//         const title = (
//           <Grid container alignItems="center">
//             <Typography variant="body1" component="div" className={classes.tabText}>
//               {label}
//             </Typography>
//             {navigation.isDropdown && (
//               <MdKeyboardArrowDown
//                 className={classes.dropdownIcon}
//                 fontSize="small"
//               />
//             )}
//           </Grid>
//         );
//         return (
//           <Tab
//             key={id}
//             disableFocusRipple
//             disableRipple
//             disableTouchRipple
//             // classes={{ wrapper: classes.tabWrapper }}
//             label={_renderMenuList(title, navigation)}
//             aria-label={title}
//             style={{
//               textTransform: "capitalize",
//               fontSize: "16px",
//               paddingLeft: "16px",
//               paddingRight: "16px",
//             }}

//             // component={Link}
//             // to={navigation.url}
//           />
//         );
//       };
// 	return (
// 		<Box sx={{ width: "100%" }}>
// 			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
// 				<Tabs
// 					value={value}
// 					onChange={handleChange}
// 					aria-label="basic tabs "
// 				>
// 					{data?.map((item) => {
// 						const { label, id } = item;
// 						return (
// 							<Tab
// 								style={{
// 									textTransform: "capitalize",
// 									fontSize: "16px",
// 									paddingLeft:'16px',
// 									paddingRight:'16px'
// 								}}
// 								key={id}
// 								label={label}
// 								{...a11yProps(id)}
// 							/>
// 						);
// 					})}
// 				</Tabs>
// 			</Box>

// 			{data?.map((item) => {
// 				const { id, component } = item;
// 				return (
// 					<TabPanel key={id} value={value} index={id}>
// 						{component}
// 					</TabPanel>
// 				);
// 			})}
// 		</Box>
// 	);
// }

// export default CustomTabs
