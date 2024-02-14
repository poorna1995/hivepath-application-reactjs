import { Grid } from "@mui/material";
import EventCard from "components/Common/Cards/EventCard";

const EventsList = () => {
  const dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const data = dataList;
  return (
    <div>
      <Grid container>
        {data?.map((item) => {
          const { imgUrl } = item;
          return (
            <Grid item md={4} xs={12}>
              <EventCard
                imgUrl={imgUrl}
                title={"Basic introduction to the  UX  Design Principles"}
                date={"27 Sep 6:30am - 3 Oct  7:30pm"}
                authorName={"Christina Lee"}
                authorDesignation={"Web Developer"}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default EventsList;

// const eventListData = [
// 	{
// 		imgUrl: "",
// 		title: "Basic introduction to the  UX  Design Principles",
// 		date: "27 Sep 6:30am - 3 Oct  7:30pm",
// 		authorName: "Christina Lee",
// 		authorDesignation: "Web Developer",
// 	},
//     {
// 		imgUrl: "",
// 		title: "Basic introduction to the  UX  Design Principles",
// 		date: "27 Sep 6:30am - 3 Oct  7:30pm",
// 		authorName: "Christina Lee",
// 		authorDesignation: "Web Developer",
// 	},{
// 		imgUrl: "",
// 		title: "Basic introduction to the  UX  Design Principles",
// 		date: "27 Sep 6:30am - 3 Oct  7:30pm",
// 		authorName: "Christina Lee",
// 		authorDesignation: "Web Developer",
// 	},{
// 		imgUrl: "",
// 		title: "Basic introduction to the  UX  Design Principles",
// 		date: "27 Sep 6:30am - 3 Oct  7:30pm",
// 		authorName: "Christina Lee",
// 		authorDesignation: "Web Developer",
// 	},
// ];
