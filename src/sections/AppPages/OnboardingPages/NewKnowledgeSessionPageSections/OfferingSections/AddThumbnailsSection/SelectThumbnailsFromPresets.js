import {
  Container,
  Grid,
  Typography,
  IconButton,
  ImageList,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import imageOne from "assets/images/new/onboarding/ks/one.png";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuggestedThumbnailsListStart,
  setDraftSessionThumbnail,
  setSelectedThumbnail,
} from "store/knowledge-sessions/knowledgeSessionsSlice";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import HivepathImage from "components/Common/HivepathImage";
import HivepathImageEditor from "components/Common/HivepathImageEditor";
import authFetch from "utils/authFetch";
import { useTheme } from "@mui/styles";
const removeUnderscore = function (str = "") {
  return str.replace(/[_]/gi, " ");
};

const mapState = ({ user, view, sessions }) => ({
  currentUser: user.currentUser,
  currentPath: view.knowledgeSessionCurrentPath,
  draftSession: sessions.draftKnowledgeSession,
  sessions: sessions,
});

const SelectThumbnailsFromPresets = ({ show, handleClick, category }) => {
  const { draftSession, sessions } = useSelector(mapState);
  const dispatch = useDispatch();

  const suggestedThumbnailsList = sessions.suggestedThumbnailsList;
  const enquequeSnackbar = useEnquequeSnackbar();
  useEffect(() => {
    const url = "https://utils.hivepath.io/api/thumbnailImages";
    const data = {
      category: category,
      extensions: ["webp"],
    };
    dispatch(fetchSuggestedThumbnailsListStart({ url, data }));
  }, [dispatch, category]);

  const handleAddImageURL = (e, image) => {
    dispatch(setSelectedThumbnail(image));
    handleClick();
    enquequeSnackbar("Thumbnail Selected!", {
      variant: "success",
    });
  };

  return (
    <Container
      // maxWidth="xs"
      style={{
        height: "100%",
        borderLeft: "1px solid rgba(0,0,0,0.1)",
        paddingBottom: "128px",
      }}
      sx={{
        maxWidth: {
          md: "xs",
          xs: "auto",
        },
      }}
    >
      <div
        style={{
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            lineHeight: "31px",

            color: "#000000",
            flex: 1,
          }}
        >
          Select from presets
        </Typography>
        <IconButton onClick={handleClick}>X</IconButton>
      </div>

      {suggestedThumbnailsList.map((item) => {
        const { category, files } = item;
        return (
          <>
            <Typography
              style={{
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              {removeUnderscore(category)}
            </Typography>

            <Grid container spacing={1}>
              {files.map((file) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    marginLeft: {
                      sm: "0px",
                      xs: "-8px",
                    },
                  }}
                >
                  <HivepathImage
                    src={file}
                    alt=""
                    style={{ width: "100%", margin: "8px" }}
                    onClick={(e) => handleAddImageURL(e, file)}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        );
      })}
    </Container>
  );
};

export default SelectThumbnailsFromPresets;
