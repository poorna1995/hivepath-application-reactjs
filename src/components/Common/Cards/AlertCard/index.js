import {
  Button,
  CircularProgress,
  circularProgressClasses,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

// this card show notification or alert to user to update profile
// this card appears on the landing page

function CircularProgressWithLabel(props) {
  const value = 25;
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        sx={{
          color: "white",
        }}
        size={50}
        // thickness={4}
        value={100}
        variant="determinate"
        {...props}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: "#22B04A",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        value={value}
        size={50}
        thickness={4}
        {...props}
      />
      {/* 
       <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  
       
       
       */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="span"
          color="text.secondary"
          fontWeight="bold"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const AlertCard = ({ progress, title, description, buttonTitle }) => {
  return (
    <div
      style={{
        background: "#C7E2EF",
        height: "100px",
        borderRadius: "14px",
      }}
    >
      <Grid
        paddingLeft="32px"
        container
        alignItems="center"
        direction="row"
        height="100%"
      >
        {progress && (
          <Grid item xs={2} style={{ paddingLeft: "16px" }}>
            {/* progress bar */}
            <CircularProgressWithLabel />
          </Grid>
        )}
        <Grid item xs={progress ? 6 : 8} paddingLeft="16px">
          {/* Text */}
          <Typography variant="body1" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="subtitle2">{description}</Typography>
        </Grid>
        <Grid item xs={3}>
          {/*Button */}
          <Button variant="outlined" style={{ textTransform: "capitalize" }}>
            {buttonTitle}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AlertCard;
