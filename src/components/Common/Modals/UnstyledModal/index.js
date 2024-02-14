import { useState } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";

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
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "14px",
  //   border: '2px solid #000',
  //   p: 2,
  //   px: 4,
  //   pb: 3,
};

export default function UnstyledModal(props) {
  const handleOpen = () => {
    props.modalToggleHandler(true);
  };

  const handleClose = () => {
    props.modalToggleHandler(false);
  };

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={props.open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style} style={props.style}>
          {props.children}
        </Box>
      </StyledModal>
    </div>
  );
}
