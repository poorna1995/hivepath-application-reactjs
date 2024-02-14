import React, { useEffect } from "react";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import pdfIcon from "assets/svg/sessions/pdf-icon.svg";
import { Card, Container, IconButton, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
// import ResourceUploadComponent from "sections/AppPages/UserAccountPageSections/KnowledgeSessionSections/KSHostViewSections/ManageSection/KnowledgeSessionResourcesUploadSection/ResourceUploadComponent/index";
import { useState } from "react";
import authFetch from "utils/authFetch";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { fetchSessionResources } from "store/knowledge-sessions/knowledgeSessionsSlice";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import BaseEmptyStateComponent from "components/Common/EmptyStateComponents/BaseEmptyStateComponent";
import noResources from "assets/svg/all/new-icons/empty-states/sessions-view/no-resources.svg";
import { ReactComponent as DownloadIcon } from "assets/svg/all/new-icons/sessions/download.svg";
import ResourceUploadComponent from "sections/AppPages/UserAccountPageSections/NewKnowledgeSessionsPageSections/ManageSessionsView/ManageSection/KnowledgeSessionResourcesUploadSection/ResourceUploadComponent";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";

const mapState = ({ user, sessions }) => ({
  currentUser: user.currentUser,
  resources: sessions.sessionResources,
  booking: sessions.hostBookingDetails,
});
const HostDocuments = ({ dontShow, session_id }) => {
  const { currentUser, resources, booking } = useSelector(mapState);
  const USER_ID = currentUser.user_id;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const booking_id = booking.booking_id;
  const [data, setData] = useState(resources || []);

  useEffect(() => {
    setData(resources);
  }, [resources]);

  const handleFetchSessionResources = () => {
    const url = KNOWLEDGE_SESSIONS_SERVICES.FETCH_SESSION_DOCUMENTS;
    const data = {
      user_id: USER_ID,
      session_id: session_id,
    };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        setData(json.result);
        dispatch(fetchSessionResources(json.result));
      }
      console.log(json);
    });
  };
  useEffect(() => {
    handleFetchSessionResources();
  }, []);

  const handleDelete = (e, object_id) => {
    const url = "https://ks.hivepath.io/api/deleteSessionDocuments";
    const data = { object_id };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        handleFetchSessionResources();
        enqueueSnackbar(json.message, {
          variant: "success",
        });
      }

      console.log(json);
    });
  };

  return (
    <>
      {!dontShow && (
        <PaperBase>
          <ResourceUploadComponent
            open={open}
            handleClose={handleClose}
            session_id={session_id}
            api_url={"https://ks.hivepath.io/api/saveBookedSessionDocuments"}
            booking_id={booking_id}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Typography
              fontSize="24px"
              fontWeight="700"
              lineHeight="30px"
              paddingLeft="16px"
            >
              Documents
            </Typography>
            <OutlinedButton
              title={"Add"}
              onClick={handleOpen}
              style={{
                color: "black",
                height: "42px",
                // border: "2px solid #484A9E",
                borderRadius: "10px",
              }}
            />
          </div>
          <Container style={{ paddingTop: "16px" }}>
            {data.length > 0 ? (
              <>
                {" "}
                {data.map((item) => {
                  const { file_name, file_size, object_id, file_url } = item;
                  return (
                    <Card
                      sx={{
                        boxShadow: "none",
                        // boxShadow: "0px 0px 40px 5px rgba(72, 74, 158, 0.06)",
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "15px",
                        display: "flex",
                        padding: "16px",
                        alignItems: "center",
                        marginBottom: "16px",
                        "&:hover": {
                          border: "1px solid transparent",
                          boxShadow: "0px 0px 40px 5px rgba(72, 74, 158, 0.06)",
                        },
                      }}
                    >
                      <img
                        src={pdfIcon}
                        alt=""
                        style={{
                          height: "40px",
                          width: "40px",
                          marginRight: "24px",
                        }}
                      />

                      <div style={{ flex: 1 }}>
                        <Typography
                          fontSize="18px"
                          fontWeight="600"
                          lineHeight="22px"
                        >
                          {file_name || "Title of the file.pdf"}
                        </Typography>
                        <Typography>{file_size || "13kb"}</Typography>
                      </div>
                      <IconButton
                        component="a"
                        href={file_url}
                        style={{ padding: "0px" }}
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton onClick={(e) => handleDelete(e, object_id)}>
                        <FaTrash />
                      </IconButton>
                    </Card>
                  );
                })}{" "}
              </>
            ) : (
              <BaseEmptyStateComponent
                imgSrc={noResources}
                shortDescription={`No files found`}
              />
            )}
          </Container>
        </PaperBase>
      )}
    </>
  );
};

export default HostDocuments;
