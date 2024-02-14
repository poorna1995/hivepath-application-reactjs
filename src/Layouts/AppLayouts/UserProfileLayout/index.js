import { Container, Box, useMediaQuery } from "@mui/material";
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
    <div>
      <AppHeader />
      <Seo
        title={title}
        keywords={keywords}
        description={description}
        image={imageSrc}
      />
      {matches ? (
        <div>{children}</div>
      ) : (
        <Container style={{ maxWidth: "80%" }}>{children}</Container>
      )}
    </div>
  );
};

export default UserProfileLayout;
