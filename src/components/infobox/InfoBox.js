import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { prettyPrintDailyStat, prettyPrintTotalStat } from "../../util";
import "./InfoBox.css";

function InfoBox({ title, cases, total, isRed, active, ...rest }) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
      onClick={rest.onClick}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {prettyPrintDailyStat(cases)}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {prettyPrintTotalStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
