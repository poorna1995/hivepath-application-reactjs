import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { FaTrash, FaCheck } from "react-icons/fa";
import { ReactComponent as CheckIcon } from "assets/svg/all/new-icons/landing-page/check.svg";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SocialButton from "components/Common/Buttons/SocialButton";
import { useHistory } from "react-router-dom";

const LPStatusCardBase = ({
  title,
  description,
  list = [],
  bgColor,
  component,
  icon,
  img,

  disableButton,
  buttonTitle,
  redirect_url,

  children,
}) => {
  const history = useHistory();
  const onButtonClick = () => {
    history.push(`/${redirect_url}`);
  };
  return (
    <Card
      sx={{
        background: bgColor ? bgColor : "#FCECE1",
        // boxShadow: "0px 0px 50px 4px rgba(72, 74, 158, 0.08)",
        boxShadow: "none",

        borderRadius: "20px",
        // height: "310px",

        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        // minHeight: "330px",
        // maxHeight: "330px",
        height: "100%",
        maxWidth: "calc(25rem)",
        minWidth: "calc(25rem)",
        maxHeight: "350px",
        // heihgt: "350px",
        minHeight: "350px",
        marginRight: "16px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            lineHeight: "31px",

            color: "#222222",
          }}
        >
          {title}
        </Typography>
        {icon && icon}
        <CardMedia
          sx={{
            // background:
            //   "linear-gradient(94.66deg, #667EEA 2.48%, #FA709A 97.47%)",
            height: "135px",
            objectFit: "contain",
            paddingTop: "16px",
            // width: "100%",
          }}
          component={"img"}
          src={img}
        />

        {description && (
          <Typography
            style={{
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "26px",

              color: "#222222",
              paddingTop: "16px",
              // flex: 1,
            }}
          >
            {description}
          </Typography>
        )}

        {/* {Array.isArray(list) &&
          list.length > 0 &&
          list.map((item) => {
            const { icon, title, component } = item;
            return (
              <
                // style={{
                //   display: "flex",
                //   justifyContent: "space-between",
                //   alignItems: "center",
                //   paddingBottom: "8px",
                //   paddingTop: "8px",
                //   flex: 1,
                //   paddingRight: "8px",
                //   marginLeft: "8px",
                // }}
              >
                {" "}
                {/* {icon ? (
                  <span style={{ marginRight: "16px" }}>{icon}</span>
                ) : (
                  <span style={{ marginRight: "16px" }}>
                    {" "}
                    <CheckIcon />
                  </span>
                )} */}
        {/* <span style={{ marginRight: "16px" }}>{icon && icon}</span> */}
        {/* <Typography
                  component="li"
                  sx={{
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "23px",

                    color: "#222222",
                    // flex: 1,
                    textAlign: "left",
                    paddingLeft: "16px",
                  }}
                >
                  {title && title}
                </Typography> */}
        {/* {component && component} 
              </>
            );
          })} */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // justifySelf: "flex-end",
            paddingTop: "16px",
            alignItems: "center",
          }}
        >
          <PrimaryButton
            style={{ height: "40px", fontWeight: "500" }}
            disabled={disableButton}
            title={buttonTitle}
            onClick={onButtonClick}
          />
        </div>
      </CardContent>
      {/* */}
    </Card>
  );
};

export default LPStatusCardBase;
