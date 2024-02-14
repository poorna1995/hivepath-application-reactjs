// import classes from "../../UserProfileInfo.module.css";
import group from "assets/svg/scheduler-icons/Group.png";
import bookmarkIcon from "assets/svg/user-profile/bookmark.svg";
import { useHistory } from "react-router";
import { MdClose } from "react-icons/md";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import RoundCornersButton from "components/Common/Buttons/RoundCornersButton";

const RecommendedOfferingModal = (props) => {
  const history = useHistory();
  const {
    title,
    description,
    category,
    scheduleLink,
    sessions_duration,
    sessions_taken,
  } = props.data;

  const scheduleBooking = () => {
    history.push(scheduleLink);
  };

  return (
    <div>
      <CardContent
        sx={{
          padding: "8px",
          paddingLeft: "16px",
          paddingRight: "20px",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => props.modalToggleHandler(false)}
          style={{ marginLeft: "98%", top: "-10px" }}
        >
          <MdClose />
        </IconButton>

        <Typography
          component="h3"
          sx={{
            color: "black",
            position: "relative",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
          fontSize="21px"
          fontWeight="bold"
          letterSpacing="-1px"
          lineHeight="28px"
        >
          <span style={{ paddingRight: "50px" }}>{title}</span>

          {/* <IconButton
            style={{
              height: "18px",
              float: "right",
              position: "absolute",
              top: "10px",
              right: "0",
            }}
          >
            <img src={bookmarkIcon} alt="bookmark" />
          </IconButton> */}
        </Typography>

        <RoundCornersButton
          title={
            <>
              <img
                src={group}
                alt="group icon"
                style={{
                  height: "16px",
                  marginBottom: "-3px",
                  marginRight: "3px",
                }}
              />{" "}
              {category}
            </>
          }
          //   className={classes.categoryButton}
        ></RoundCornersButton>

        <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#616161",
            }}
            fontSize="16px"
            fontWeight="500"
            letterSpacing="-0.01em"
            lineHeight="27px"
            dangerouslySetInnerHTML={{ __html: description }}
          ></Typography>
        </div>

        <PrimaryButton
          title="Schedule"
          onClick={scheduleBooking}
          style={{
            display: "block",
            margin: "0 auto",
            marginTop: "30px",
          }}
        />
      </CardContent>
    </div>
  );
};

export default RecommendedOfferingModal;
