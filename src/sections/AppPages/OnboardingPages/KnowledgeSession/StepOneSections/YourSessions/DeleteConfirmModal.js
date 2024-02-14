import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import React from "react";
import KnowledgeSessionBaseDialog from "../BaseDialog";

const DeleteConfirmModal = ({ open, handleClose, handleDelete }) => {
  return (
    <KnowledgeSessionBaseDialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle
        style={{
          maxWidth: "400px",
          minWidth: "360px",
          paddingTop: "32px",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "28px",
          lineHeight: "32px",
          letterSpacing: "-0.03em",
        }}
      >
        Do you want to delete?
      </DialogTitle>
      <DialogActions
        style={{ paddingBottom: "32px", justifyContent: "center" }}
      >
        <OutlinedButton
          title="No"
          style={{ width: "56px", height: "36px", border: "2px solid #484a9e" }}
          onClick={handleClose}
        />
        <PrimaryButton
          title="Yes"
          style={{ width: "70px", height: "36px" }}
          onClick={handleDelete}
        />
      </DialogActions>
    </KnowledgeSessionBaseDialog>
  );
};

export default DeleteConfirmModal;
