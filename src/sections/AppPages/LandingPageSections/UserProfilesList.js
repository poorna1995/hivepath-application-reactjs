import { Grid, Typography } from "@mui/material";
import LPUserProfileCard from "./LPUserProfileCard";
import "./styles.css";
import img1 from "assets/images/placeholder-images/img1.png";

import img2 from "assets/images/placeholder-images/img2.png";

import img3 from "assets/images/placeholder-images/img3.png";

import img4 from "assets/images/placeholder-images/img4.png";

const UserProfilesList = ({ title, row, container }) => {
  const dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const data = UserProfilesListData;
  return (
    <div style={{ paddingTop: "16px" }}>
      {!row ? (
        <>
          <Typography
            style={{
              color: "#323232",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </>
      ) : (
        <Typography
          style={{
            color: "black",
            letterSpacing: "-1px",
            fontSize: "34px",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      )}

      {row ? (
        <div className="row">
          {data?.map((item) => {
            const { imgUrl } = item;
            return (
              <LPUserProfileCard
                imgUrl={imgUrl}
                key={item.id}
                userName={"Ray John Abrham"}
                // repsonseTime={repsonseTime}
                designation={"UX designer at amazon"}
                offerings={["1:1 Session", "Webinars"]}
              />
            );
          })}
        </div>
      ) : (
        <>
          <Grid container spacing={2}>
            {data?.map((item) => {
              const { imgUrl } = item;
              return (
                <Grid item md={3} sm={6} xs={12}>
                  <LPUserProfileCard
                    imgUrl={imgUrl}
                    key={item.id}
                    userName={"Ray John Abrham"}
                    // repsonseTime={repsonseTime}
                    designation={"UX designer at amazon"}
                    offerings={["1:1 Session", "Webinars"]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default UserProfilesList;

const UserProfilesListData = [
  {
    imgUrl: img1,
    id: 1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 2,
    imgUrl: img2,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 3,
    imgUrl: img3,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 4,
    imgUrl: img4,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 5,
    imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 6,
    imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 7,
    imgUrl: img2,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 8,
    imgUrl: img3,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 9,
    imgUrl: img4,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 10,
    imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 11,
    imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 12,
    imgUrl: img2,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 13,
    imgUrl: img3,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 14,
    imgUrl: img4,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
  {
    id: 15,
    imgUrl: img1,
    userName: "Ray John Abrham",
    repsonseTime: "1 hour",
    designation: "UX designer at amazon",
    offerings: ["1:1 Session", "Webinars"],
  },
];
