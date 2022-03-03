import { FC, Fragment } from "react";
import { Title, Chart, Form, TableData } from "src/components";
import { Grid } from "@mui/material";

interface IPeakShavingProps {}

export const PeakShaving: FC<IPeakShavingProps> = () => {
  return (
    <Fragment>
      <Title title="Peak Shaving & Alert" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Chart />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Form />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <TableData />
        </Grid>
      </Grid>
    </Fragment>
  );
};
