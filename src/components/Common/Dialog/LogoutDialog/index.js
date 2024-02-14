import React from "react";
import HivepathBaseDialog from "../HivepathBaseDialog";
import { DialogTitle, Typography, DialogActions } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import authFetch from "utils/authFetch";
import { useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { useDispatch } from "react-redux";
import { signOutUserSuccess } from "store/User/user.actions";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoadingBackdrop from "components/Common/Feedback/Backdrop/LoadingBackdrop";
import { useCookies } from "react-cookie";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const LogoutDialog = ({ open, handleClose }) => {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["huid", "htoken"]);

  const handleLogout = () => {
    setLoading(true);
    authFetch("https://auth.hivepath.io/api/logout", {
      user_id: USER_ID,
    })
      .then((json) => {
        if (json.status === "success") {
          enqueueSnackbar(json?.message, {
            variant: "success",
          });
          dispatch(signOutUserSuccess(USER_ID));
          removeCookie("huid");
          removeCookie("htoken");

          setLoading(false);
          handleClose();
          return history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <HivepathBaseDialog open={open} handleClose={handleClose}>
      <DialogTitle>
        <Typography
          textAlign={"center"}
          fontSize={"32px"}
          lineHeight={"32px"}
          letterSpacing={"-.03em"}
          fontWeight={700}
        >
          Are you sure you want to log out?
        </Typography>
      </DialogTitle>
      <DialogActions style={{ justifyContent: "center" }}>
        <OutlinedButton title="Cancel" onClick={handleClose} />
        <PrimaryButton
          title={"Logout"}
          style={{ fontWeight: "600", borderRadius: "10px" }}
          onClick={handleLogout}
        />
      </DialogActions>
      <LoadingBackdrop open={loading} handleClose={() => setLoading(false)} />
    </HivepathBaseDialog>
  );
};

export default LogoutDialog;
