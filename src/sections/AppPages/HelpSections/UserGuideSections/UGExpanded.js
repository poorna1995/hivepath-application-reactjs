import { Typography, Grid, Button } from "@mui/material";
import { ReactComponent as ArrowLeft } from "assets/svg/admin-icons/arrow-left.svg";
import UGLeftPanel from "./Components/UGLeftPanel";
import JoinHivepath from "./Components/Pages/JoinHivepath";

const UGExpanded = ({ data, setExpanded }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Button onClick={() => setExpanded(false)}>
          <ArrowLeft
            style={{ height: "18px", width: "auto", marginRight: "10px" }}
          />{" "}
          <Typography variant="h6" fontWeight="700" color="black">
            About Hivepath
          </Typography>
        </Button>
      </Grid>
      <Grid item xs={4} md={4}>
        <UGLeftPanel data={data} />
      </Grid>
      <Grid item xs={8} md={8} style={{ paddingLeft: "40px" }}>
        <JoinHivepath />
      </Grid>
    </Grid>
  );
};

export default UGExpanded;
