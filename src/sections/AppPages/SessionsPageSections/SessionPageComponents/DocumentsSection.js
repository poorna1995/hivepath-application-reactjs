import { Card, Container, IconButton, Typography } from "@mui/material";
import BasicTabs from "components/Common/Navigation/BasicTabs";
import React, { useEffect } from "react";
import PaperBase from "../../../../components/Common/PaperBase/PaperBase";
import pdfIcon from "assets/svg/sessions/pdf-icon.svg";
import { useSelector } from "react-redux";
import { useState } from "react";
import authFetch from "utils/authFetch";
import { ReactComponent as DownloadIcon } from "assets/svg/all/new-icons/sessions/download.svg";
import { KNOWLEDGE_SESSIONS_SERVICES } from "constants/API_URLS";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const DocumentsSection = ({ dontShow, session_id, user_id }) => {
  const [docs, setDocs] = useState([]);

  console.log({ user_id });

  const DocumentsList = () => {
    return (
      <Container style={{ marginTop: "16px" }}>
        {docs.length > 0 ? (
          <>
            {docs.map((item) => {
              const { file_name, file_size, object_id, file_url } = item;
              return (
                <Card
                  key={object_id}
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

                  <div>
                    <a href={file_url} target={"_blank"} rel="noreferrer">
                      <Typography
                        fontSize="18px"
                        fontWeight="600"
                        lineHeight="22px"
                      >
                        {file_name}
                      </Typography>
                    </a>
                    <Typography>{file_size}</Typography>
                  </div>
                  <IconButton
                    component="a"
                    href={file_url}
                    style={{ padding: "0px" }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Card>
              );
            })}
          </>
        ) : (
          <div
            style={{ height: "200px", display: "grid", placeItems: "center" }}
          >
            <Typography
              style={{
                fontSize: "22px",
                fontWeight: 700,
                lineHeight: "28px",
                letterSpacing: "-.01em",
              }}
            >
              No Resources Found
            </Typography>
          </div>
        )}
      </Container>
    );
  };
  const tabs = [
    {
      id: 0,
      label: "Documents",
      component: <DocumentsList />,
    },
  ];

  useEffect(() => {
    const url = KNOWLEDGE_SESSIONS_SERVICES.FETCH_SESSION_DOCUMENTS
    const data = {
      user_id,
      session_id,
    };
    authFetch(url, data).then((json) => {
      if (json.status === "success") {
        setDocs(json.result);
      }
      console.log(json);
    });
  }, [user_id, session_id]);

  return (
    <>
      {
        <>
          {Array.isArray(docs) && docs.length > 0 && (
            <PaperBase>
              {/* <BasicTabs data={tabs} />
               */}
              <Typography
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                Documents
              </Typography>
              <DocumentsList />
            </PaperBase>
          )}
        </>
      }
    </>
  );
};

export default DocumentsSection;
