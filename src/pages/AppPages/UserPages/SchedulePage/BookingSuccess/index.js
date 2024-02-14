// import UserLayout from "Layouts/UserLayout/index";
// import SettingsLayout from "Layouts/AppLayouts/SettingsLayout";
// ##########################################################
// ################NOT USING THIS FILE#######################
// ##########################################################
// import { Container, Grid } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";

// import changeTimeZone from "utils/changeTimeZone";
// import enUS from "date-fns/locale/en-US";

// import SchedulerWrapper from "Layouts/UserLayout/SchedulerLayout/SchedulerWrapper";

// import BookingConfirmed from "sections/AppPages/UserPages/SchedulerSections/BookingConfirmed";
// import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";

// import authFetch from "utils/authFetch";
// import getParsedDayTime, { getTwelveHourFormat } from "utils/formatDateFn";
// import {
//   updateScheduleCard,
//   updateSelectedDate,
// } from "store/Scheduler/scheduler.actions";
// import { SCHEDULE_SERVICES } from "constants/API_URLS";
// const mapState = ({ slotsData }) => ({
//   timezone:
//     slotsData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
// });

// const BookingSuccess = () => {
//   const { user_id } = useSelector((state) => state.user.currentUser);
//   const { timezone } = useSelector(mapState);

//   //   const { timezone } = useSelector((state) => state.slotsData);

//   const enqueueSnackbar = useEnquequeSnackbar();
//   const history = useHistory();
//   const { sessionId, hostId, bookingId } = useParams();
//   const dispatch = useDispatch();

//   const [isLoading, setIsLoading] = useState(false);

//   const fetchBookingDetails = () => {
//     setIsLoading(true);
//     const requestData = {
//       user_id: user_id,
//       booking_id: bookingId,
//     };
//     const data_t = authFetch(
//       SCHEDULE_SERVICES.FETCH_SCHEDULE_BOOKING,
//       requestData
//     )
//       .then((res) => {
//         setIsLoading(false);
//         if (res.status === "success") {
//           if (res.result && res.result.length > 0) {
//             const {
//               booking_status,
//               //   date,
//               from_date,
//               to_date,
//               from_time,
//               to_time,
//               // from,
//               // to,
//               duration,
//             } = res.result[0];
//             if (booking_status === "draft") {
//               // booking has not yet completed
//               history.push(
//                 `/schedule/${sessionId}/${hostId}/slot/${bookingId}`
//               );
//             } else {
//               //   let dateSplit = date.split("-");
//               let selectedSlotDate = getParsedDayTime(from_date, from_time);

//               //   let selectedSlotDate = new Date(
//               //     Date.UTC(dateSplit[0], parseInt(dateSplit[1]) - 1, dateSplit[2])
//               //   );

//               let fromTime = changeTimeZone(
//                 selectedSlotDate,
//                 enUS,
//                 timezone
//               ).toLocaleTimeString(navigator.language, {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               });

//               let toTime = changeTimeZone(
//                 getParsedDayTime(to_date, to_time),
//                 enUS,
//                 timezone
//               ).toLocaleTimeString(navigator.language, {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               });

//               fetchUserMetaData();
//               fetchSessionDetails();
//               // set data into state here
//               dispatch(updateSelectedDate(selectedSlotDate));
//               dispatch(
//                 updateScheduleCard({
//                   duration: duration + " Min",
//                   sessionTime: fromTime + " - " + toTime,
//                   sessionDate: selectedSlotDate,
//                   sessionDateString: from_date,
//                 })
//               );
//             }
//           } else {
//             history.push("/not_found");
//           }
//         } else {
//           history.push("/not_found");
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         setIsLoading(false);
//         enqueueSnackbar("Connection failed", {
//           variant: "error",
//         });
//         console.log(err);
//       });
//   };
//   const fetchSessionDetails = () => {
//     setIsLoading(true);
//     const requestData = {
//       //   user_id: user_id,
//       loggedin_user_id: user_id,
//       type: "one-one",
//       session_id: sessionId,
//     };

//     const data_t = authFetch(
//       "https://ks.hivepath.io/api/fetchUserOffering",
//       requestData
//     )
//       .then((res) => {
//         setIsLoading(false);
//         const { status, result } = res;
//         if (status === "success") {
//           if (result.length > 0) {
//             const { title, category, thumbnails } = result[0];
//             dispatch(
//               updateScheduleCard({
//                 category: category,
//                 title: title,
//                 card_image: thumbnails[0] || "",
//               })
//             );
//           } else {
//             enqueueSnackbar("No offering found", {
//               variant: "error",
//             });
//           }
//         } else {
//           enqueueSnackbar("Couldn't fetch the session data", {
//             variant: "error",
//           });
//           console.log(res);
//         }
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         enqueueSnackbar("Connection failed", {
//           variant: "error",
//         });
//         console.log(err);
//       });
//   };

//   const fetchUserMetaData = () => {
//     setIsLoading(true);
//     const requestData = {
//       user_id: hostId,
//     };
//     const prevSessions = authFetch(
//       "https://profile.hivepath.io/api/fetchUserData",
//       requestData
//     )
//       .then((res) => {
//         setIsLoading(false);
//         if (res.status === "success") {
//           let {
//             name,
//             location,
//             profile_pic_url,
//             designation,
//             company,
//             rating,
//             reviews,
//           } = res.result;

//           if (profile_pic_url === "") {
//             profile_pic_url =
//               "https://mhcd.org/wp-content/uploads/2017/12/placeholder-man.png";
//           }

//           let updateScheduleCardData = {
//             username: name,
//             location: location,
//             userImage: profile_pic_url,

//             designation: designation,
//             companyName: company || "",
//             rating: rating || "",
//             reviews: reviews || "",
//           };
//           dispatch(updateScheduleCard(updateScheduleCardData));
//         } else {
//           console.log(res);
//           enqueueSnackbar("Error occured while fetching user data", {
//             variant: "error",
//           });
//           // alert("An error occured, Contact admin");
//         }
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         enqueueSnackbar("Connection failed", {
//           variant: "error",
//         });
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     fetchBookingDetails();
//   }, []);

//   return (
//     <SchedulerWrapper title="Booking Success - Hivepath">
//       {isLoading && <LoadingBackdrop open={isLoading} />}
//       <Container
//         sx={{ pt: "16px", height: { md: "95vh", xs: "auto" } }}
//         style={{
//           display: "flex",
//           //   alignItems: "center",
//           justifyContent: "center",
//           textAlign: "center",

//           marginTop: "4%",
//           //   paddingBottom: "10%",
//         }}
//       >
//         <Grid item xs={12} md={12}>
//           <BookingConfirmed />
//         </Grid>
//       </Container>
//     </SchedulerWrapper>
//   );
// };

// export default BookingSuccess;
