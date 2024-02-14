import { Container, Box, Toolbar, useMediaQuery } from "@mui/material";
import Seo from "components/Seo";
import React from "react";
import AppHeader from "components/AppHeader";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";

const useStyles = makeStyles((theme) => ({}));

const UserProfileLayout = ({
  title,
  children,
  imageSrc,
  keywords,
  description,
}) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  return (
    <Box maxWidth="100%">
      <AppHeader position="fixed" />
      <Toolbar style={{ height: "80px" }} />
      <Seo
        title={title}
        keywords={keywords}
        description={description}
        image={imageSrc}
      />
      {matches ? <div>{children}</div> : <div>{children}</div>}
    </Box>
  );
};

export default UserProfileLayout;
