import { useState } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import { Grid } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "14px",
  padding: "25px",
  textAlign: "center",
  fontWeight: "bold",
  //   border: '2px solid #000',
  //   p: 2,
  //   px: 4,
  //   pb: 3,
};

export default function ConfirmDialog(props) {
  const { open, setOpen, onConfirm, message, isConfirm } = props;

  const closeHandler = () => {
    setOpen(false);
  };

  const btnStyle = { width: "65px", height: "35px" };

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={closeHandler}
        BackdropComponent={Backdrop}
      >
        <Box sx={style} style={props.style}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={12}>
              <p>{message}</p>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6} align="right">
                  {!isConfirm && (
                    <OutlinedButton
                      title={"No"}
                      onClick={closeHandler}
                      style={isConfirm ? {} : btnStyle}
                    />
                  )}
				  {isConfirm && (
                    <PrimaryButton
                      title={"Confirm"}
                      onClick={onConfirm}
                      style={isConfirm ? {} : btnStyle}
                    />
                  )}
                </Grid>
                <Grid item xs={6} md={6} align="left">
                  {!isConfirm && (
                    <PrimaryButton
                      title={"Yes"}
                      onClick={onConfirm}
                      style={isConfirm ? {} : btnStyle}
                    />
                  )}
				  {isConfirm && (
                    <OutlinedButton
                      title={"Cancel"}
                      onClick={closeHandler}
                      style={isConfirm ? {} : btnStyle}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </StyledModal>
    </div>
  );
}
