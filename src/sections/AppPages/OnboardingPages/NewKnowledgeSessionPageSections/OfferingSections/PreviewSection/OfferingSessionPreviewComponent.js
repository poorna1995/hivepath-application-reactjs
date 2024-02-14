import React from "react";
import {
  Typography,
  Chip,
  Tooltip,
  tooltipClasses,
  Avatar,
  Button,
} from "@mui/material";
import sampleBG from "assets/images/new/onboarding/ks/sample-bg.png";
import { makeStyles } from "@mui/styles";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import GradientText from "components/Common/Typography/GradientText";
import HivepathImage from "components/Common/HivepathImage";
import ProductImageSlideShow from "components/Common/Slideshow/ProductImageSlideShow.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > div:hover ": {
      position: "fixed",
      display: "none",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: " rgba(0,0,0,0.5)",
      zIndex: 2,
      cursor: "pointer",
    },
  },
}));
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <div {...props} ref={ref}>
      {props.children}
    </div>
  );
});

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const OfferingSessionPreviewComponent = ({ data, border, minHeight }) => {
  const classes = useStyles();
  // const data = dummyData;

  // const [data, setData] = useState({});
  const {
    title,
    thumbnails: imgSrc,
    description,
    related_topics: relatedTopics,
    prerequisites,
    user_data,
  } = data && data;
  const { company, first_name, image_url, last_name, role } =
    user_data !== undefined && user_data;

  const userName = `${first_name} ${last_name}`;
  //   const dummy_description = "";

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "10px",
        border: border ? "1px solid rgba(0,0,0,0.1)" : "none",
        marginBottom: "32px",
        background: "white",
      }}
    >
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "36px",
          lineHeight: " 47px",
          marginBottom: "16px",
        }}
      >
        {title}
      </Typography>
      {user_data && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
            flex: 1,
          }}
        >
          <Avatar src={image_url} />{" "}
          <div
            style={{
              marginLeft: "16px",
              flex: 1,
            }}
          >
            <GradientText style={{ fontWeight: "700" }}>
              {" "}
              {userName}
            </GradientText>
            <Typography fontSize={"14px"}>
              {role} at {company}
            </Typography>
          </div>
          <Button>Only Preview</Button>
        </div>
      )}
      <div style={{ minHeight: minHeight ? "500px" : "", width: "100%" }}>
        <ProductImageSlideShow
          data={imgSrc && imgSrc}
          containerStyle={{
            width: "100%",
            height: "500px",
            maxHeight: "500px",
            // maxWidth: "800px",
            objectFit: "contain",
            overflow: "hidden",
            // width: minHeight ? "80%" : "100%",
            // height: "400px",
            // objectFit: "contain",
          }}
          autoplay={true}
        />
      </div>
      {/* )} */}

      {description && (
        <Typography
          dangerouslySetInnerHTML={{ __html: description }}
          style={{
            padding: "16px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        ></Typography>
      )}
      {Array.isArray(relatedTopics) && relatedTopics.length > 0 && (
        <div>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: " 28px",
              lineHeight: "36px",
              marginBottom: "16px",
            }}
          >
            Related Topics
          </Typography>
          <div>
            {relatedTopics?.map((item) => (
              <Chip
                style={{
                  marginRight: "8px",
                  fontWeight: 500,
                  fontSize: "15px",
                  height: "32px",
                  lineHeight: "20px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  marginTop: "8px",
                }}
                label={`# ${item}`}
              />
            ))}
          </div>
        </div>
      )}
      {Array.isArray(prerequisites) && prerequisites.length > 0 && (
        <div
          style={{
            paddingBottom: "32px",
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: " 28px",
              lineHeight: "36px",
              marginBottom: "16px",
              marginTop: "16px",
            }}
          >
            Prerequisites
          </Typography>
          {prerequisites?.map((item) => (
            <li>{item}</li>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferingSessionPreviewComponent;

const dummyData = {
  title: "General Networking in Data science ",
  images: [
    {
      url: "image1url",
    },
    {
      url: "image2url",
    },
  ],
  description: `<h1>About Offering</h1>
  <p>With an experience of 7+ in the Data science field. I have worked in numerous data science problems in this space.</p>
  <ul>
  <li>Machine Learning (Supervised &amp; Un supervised)</li>
  <li>Deep learning (Computer vision)</li>
  <li>Search based planning</li>
  <li>Event based forecasting</li>
  </ul>
  <p><strong>Schedule a meeting with me for following</strong></p>
  <ol>
  <li>General profile review in data science.</li>
  <li>Future direction in data science.</li>
  </ol>
  <p>Send me what you like to discuss in the session.</p>
  <p>Happy to be a host and help your for future endeavors!&nbsp;</p>`,
  relatedTopics: [
    "Machine learning",
    " Forecasting",
    "Reinforcement Learning",
    "Data science",
    "Ecommerce domain",
  ],
  prerequisites: [
    "Interest towards data science",
    "Proven 1+ years of experience in Datascience",
  ],
};
