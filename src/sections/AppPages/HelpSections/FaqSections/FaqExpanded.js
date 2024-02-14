import { Typography, Grid, Button } from "@mui/material";
import { ReactComponent as ArrowLeft } from "assets/svg/admin-icons/arrow-left.svg";
import FaqLeftPanel from "./Components/FaqLeftPanel";
import GeneralOnboarding from "./Components/Pages/GeneralOnboarding";

const FaqExpanded = ({ data, setExpanded }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Button onClick={() => setExpanded(false)}>
          <ArrowLeft
            style={{ height: "18px", width: "auto", marginRight: "10px" }}
          />{" "}
          <Typography variant="h6" fontWeight="700" color="black">
            FAQ
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={3} md={3}>
        <FaqLeftPanel data={data} />
      </Grid>
      <Grid item xs={9} md={9} style={{ paddingLeft: "40px" }}>
        <GeneralOnboarding />
      </Grid>
    </Grid>
  );
};

export default FaqExpanded;
