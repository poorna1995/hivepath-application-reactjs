import "./App.css";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import LoginPage from "pages/AuthenticationPages/LoginPage";
import SignUpPage from "pages/AuthenticationPages/SignUpPage";

import ResetPasswordPage from "pages/AuthenticationPages/ResetPasswordPage";
import VerificationPage from "pages/AuthenticationPages/VerificationPage";
import ResetLinkPage from "pages/AuthenticationPages/ResetLinkPage";
import SetNewPasswordPage from "pages/AuthenticationPages/SetNewPasswordPage";
import WithAuth from "hoc/withAuth";
import VerifyTokenPage from "pages/AuthenticationPages/ResetPasswordPage/VerifyResetPasswordTokenPage";
import VerifySignUpTokenPage from "pages/AuthenticationPages/SignUpPage/VerifySignUpToken";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import authFetch from "utils/authFetch";
import LinkedInPopUp from "./components/Common/SocialAuthButtonGroup/LinkedinAuth/LinkedinPopup";
import NoMatchPath from "./components/NoMatch";
import { useDispatch } from "react-redux";
import { signOutUserSuccess } from "./store/User/user.actions";
import { SnackbarProvider } from "notistack";
import CustomSuccessSnackbar from "components/Common/Feedback/Snackbars/CustomSuccessSnackbar";
// import enquesnack from 'customHooks/useEnquequeSnackbar'
// #### swastik imports ####
import SelectSlot from "pages/AppPages/UserPages/SchedulePage/SelectSlot";
import StateQuestions from "pages/AppPages/UserPages/SchedulePage/StateQuestions";
import ConfirmBooking from "pages/AppPages/UserPages/SchedulePage/ConfirmBooking";
import BookingSuccess from "pages/AppPages/UserPages/SchedulePage/BookingSuccess";

import HelpPages from "pages/AppPages/HelpPages";
import UserGuidePage from "pages/AppPages/HelpPages/UserGuidePage";
import FaqPage from "pages/AppPages/HelpPages/FaqPage";
import ContactUsPage from "pages/AppPages/HelpPages/ContactUsPage";
import FeedbackPage from "pages/AppPages/HelpPages/FeedbackPage";

import NewOffering from "pages/AppPages/UserPages/NewOffering";
import NoAuthOffering from "pages/AppPages/UserPages/NewOffering/noAuthOffering";
import UserProfilePage from "pages/AppPages/UserProfilePage";
import NoAuthProfilePage from "pages/AppPages/UserProfilePage/NoAuthProfilePage";

import EventPage from "pages/AppPages/UserPages/EventPage";

// #### swastik imports end ####
import appRoutes from "routes/appRoutes/appRoutes";
import AuthorizeZoomPage from "pages/AuthenticationPages/AuthorizeZoom";
import VerifyReferPage from "pages/AuthenticationPages/VerifyReferPage";
import { Button } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { createBrowserHistory } from "history";
import { setCalendarTimezone } from "store/slots/slots.actions";
const mapState = ({ user, slotsData }) => ({
  currentUser: user.currentUser,
  timezone: slotsData.timezone,
});
const defaultHistory = createBrowserHistory();
const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
  },
  success: {
    background: "black",
  },
}));

function App() {
  const theme = useTheme();
  // console.log("appTheme", { theme });
  const classes = useStyles();
  const { currentUser, timezone } = useSelector(mapState);
  const history = useHistory();
  // const classes = useStyles();
  const dispatch = useDispatch();
  const notistack = React.createRef();
  const onClickDismiss = (key) => () => {
    notistack.current.closeSnackbar(key);
  };

  useEffect(() => {
    if (!currentUser) return;

    if (currentUser) {
      authFetch("https://auth.hivepath.io/api/verifyLoginToken", {
        user_id: currentUser.user_id,
        login_token: currentUser.login_token,
      })
        .then((json) => {
          if (json.status === "success") {
            // if (onboardingDone) return history.push("/");
            // return history.push("/add-info");
            // return console.log(json);
          } else {
            dispatch(signOutUserSuccess());
            history.push("/login");
          }

          // console.log("verify login session", json);
        })
        .catch((error) => {
          history.push("/login");
          // console.log(error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (!timezone) {
      return dispatch(
        setCalendarTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
      );
    }
  }, [timezone]);
  return (
    <div className="App">
      <SnackbarProvider
        classes={
          {
            // root: classes.root,
            // containerRoot: classes.contentRoot,
            // variantSuccess: classes.success,
            // variantError: classes.error,
            // variantWarning: classes.warning,
            // variantInfo: classes.info,
          }
        }
        autoHideDuration={3000}
        ref={notistack}
        maxSnack={3}
        preventDuplicate
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        // action={(key) => (
        //   <Button onClick={onClickDismiss(key)}>'Dismiss'</Button>
        // )}
        content={(key, message) => {
          return <CustomSuccessSnackbar id={key} message={message} />;
        }}
        // TransitionComponent={Slide}
      >
        <Switch>
          <Redirect exact from="/add-info" to="/add-info/step-one" />
          {/* <Redirect exact from="/" to="/login" /> */}
          <Redirect
            exact
            from="/u/account/knowledge-session/host"
            to="/u/account/knowledge-session/host/my-sessions"
          />
          <Redirect
            exact
            from="/u/account/knowledge-session/attendee"
            to="/u/account/knowledge-session/attendee/my-sessions"
          />
          <Redirect
            exact
            from="/onboarding/ks/intro"
            to="/onboarding/ks/intro/about"
          />
          <Redirect
            exact
            from="/onboarding/ks/create"
            to="/onboarding/ks/create/add-category"
          />
          <Redirect
            exact
            from="/onboarding/ks/availability"
            to="/onboarding/ks/availability/add-availability"
          />
          <Redirect
            exact
            from="/onboarding/ks/preferences"
            to="/onboarding/ks/preferences/add-preferences"
          />
          <Redirect
            exact
            from="/onboarding/event"
            to="/onboarding/event/add-details"
          />
          <Redirect
            exact
            from="/sessions/:bookingID"
            to="/u/account/sessions/:bookingID"
          />
          {/* <Redirect
            from={`/offering/:sessionID/edit/`}
            to={`/offering/:sessionID/edit/category`}
            exact
          /> */}
          {/* {console.log(appRoutes)} */}
          {appRoutes.map((route) => {
            const { path, component: Component } = route;
            return (
              <Route exact path={path} key={path}>
                <WithAuth>
                  <Component />
                </WithAuth>
              </Route>
            );
          })}
          {/*
           
          "hivepath.io/u/user_id"   if user_name return username else user_id
          /o/:session_id

          
          */}
          <Route
            exact
            path="/auth/verifyRegistration/id/:id"
            component={VerifySignUpTokenPage}
          />
          <Route exact path="/zoomauth" component={AuthorizeZoomPage} />
          <Route
            exact
            path="/auth/resetPassword/id/:id"
            component={VerifyTokenPage}
          />
          <Route exact path="/linkedin" component={LinkedInPopUp} />
          <Route exact path="/login" render={() => <LoginPage />} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route
            exact
            path="/reset-password"
            render={() => <ResetPasswordPage />}
          />
          <Route
            exact
            path="/refer/:referralID"
            render={() => <VerifyReferPage />}
          />
          <Route exact path="/verify" render={() => <VerificationPage />} />
          <Route exact path="/reset-link" render={() => <ResetLinkPage />} />
          <Route
            exact
            path="/set-new-password"
            component={SetNewPasswordPage}
          />{" "}
          {/* <Route
            exact
            path="/user/"
            render={() => (
              <WithAuth>
                <UserProfilePage />
              </WithAuth>
            )}
            // component={UserProfilePage}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <WithAuth>
                <EditProfile />
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/profile/update-profile"
            render={() => (
              <WithAuth>
                <EditProfileForm />
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/admin/slot-planner/week"
            render={() => (
              <WithAuth>
                <SlotPlannerPage />
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/admin/slot-planner/month"
            render={() => (
              <WithAuth>
                <SlotPlannerMonthViewPage />
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/settings"
            render={() => (
              <WithAuth>
                <SettingsPage />
              </WithAuth>
            )}
          /> */}
          {/* routes defined by swastik */}
          <Route
            exact
            path="/schedule/:sessionId/:hostId/slot/:bookingId?"
            render={() => (
              <WithAuth>
                <SelectSlot />
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/schedule/:sessionId/:hostId/questions/:bookingId"
            render={() => (
              <WithAuth>
                <StateQuestions />
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/schedule/:sessionId/:hostId/confirm/:bookingId"
            render={() => (
              <WithAuth>
                <ConfirmBooking />
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/schedule/:sessionId/:hostId/confirmed/:bookingId"
            render={() => (
              <WithAuth>
                <BookingSuccess />
              </WithAuth>
            )}
          />
          <Route
            exact
            path="/offering/:session_id"
            render={() => {
              // NoAuthOffering
              // currentUser
              if (currentUser) {
                return (
                  <WithAuth>
                    <NewOffering />
                  </WithAuth>
                );
              } else {
                return <NoAuthOffering />;
              }
            }}
          />
          <Route
            exact
            path="/u/:slug_id"
            render={() => {
              // NoAuthOffering
              // currentUser
              if (currentUser) {
                return (
                  <WithAuth>
                    <UserProfilePage />
                  </WithAuth>
                );
              } else {
                return <NoAuthProfilePage />;
              }
            }}
          />
          <Route
            exact
            path="/event/"
            render={() => (
              <WithAuth>
                <EventPage />
              </WithAuth>
            )}
          />
          <Route exact path="/help/" component={HelpPages} />
          <Route exact path="/help/user-guide" component={UserGuidePage} />
          <Route exact path="/help/faq" component={FaqPage} />
          <Route exact path="/help/contact" component={ContactUsPage} />
          <Route exact path="/help/feedback" component={FeedbackPage} />
          {/* swastik routes end */}
          <Route exact path="*">
            <NoMatchPath />
          </Route>
        </Switch>
      </SnackbarProvider>
    </div>
  );
}

export default App;
