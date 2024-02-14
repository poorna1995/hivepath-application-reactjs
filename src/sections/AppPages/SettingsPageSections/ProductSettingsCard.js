import {
  Card,
  CardContent,
  CardMedia,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";

const ProductSettingsCard = ({ title }) => {
  return (
    <div>
      <Card>
        <CardMedia src="" />
        <CardContent>
          <Switch />
          <Typography>{title}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSettingsCard;
