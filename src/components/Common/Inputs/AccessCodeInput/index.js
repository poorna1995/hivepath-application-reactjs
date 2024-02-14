import { Box, IconButton, InputLabel, styled, Tooltip } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { MdHelpOutline } from "react-icons/md";
import AccessCodeInfoDialog from "components/Common/Dialog/AccessCodeInfoDialog";
const StyledOtpInput = styled(OtpInput)(({ theme, props }) => ({
  ...props,
}));

const AccessCodeInput = ({ title, required, value, onChange, ...props }) => {
  // console.log(value);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {title && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputLabel
            required={required}
            sx={{
              color: "black",
              margin: (theme) => theme.spacing(1),
              marginLeft: 0,
              marginBottom: "10px",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "19px",
              letterSpacing: "-3%",
            }}
          >
            {title}
          </InputLabel>
          <Tooltip title="What is invitation code?">
            <IconButton
              sx={{
                "&:hover": {
                  background: "transparent",
                },
                padding: "0px",
              }}
              onClick={handleOpen}
            >
              <MdHelpOutline color="black" fontSize={`16px`} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <StyledOtpInput
        numInputs={6}
        value={value}
        onChange={onChange}
        separator={<span style={{ marginLeft: "8px" }}> </span>}
        // inputStyle={{
        //   padding: "16px",
        // }}
        sx={{
          "& input ": {
            // padding: "16px",
            fontSize: "18px",
            height: "50px",
            width: "2em !important",
            borderRadius: "10px",
            border: "1px solid rgba(0,0,0,0.1)",
            "&:focusVisible": {
              //   border: "1px solid divider",
            },
          },
        }}
        {...props}
      />

      <AccessCodeInfoDialog open={open} handleClose={handleClose} />
    </div>
  );
};

export default AccessCodeInput;
