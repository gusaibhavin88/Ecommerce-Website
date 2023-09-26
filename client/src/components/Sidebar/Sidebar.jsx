import { Container, Grid, Paper, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import OrderSuccess from "../OrderSuccess/OrderSuccess";
import OrderConfirm from "../OrderConfirm/OrderConfirm";
import DashboardChart from "../DashboardChart/DashboardChart";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`setting-vertical-tabpanel-${index}`}
      aria-labelledby={`setting-vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `setting-vertical-tab-${index}`,
    "aria-controls": `setting-vertical-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   mainContainer: {
//     marginTop: 48,
//     marginBottom: 56,
//     paddingBottom: 16,
//   },
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: "flex",
//   },
// }));

export default function Slider() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item md={3} xl={2}>
          <Toolbar variant="dense" />
          <Paper>
            <Tabs
              TabIndicatorProps={{
                style: { display: "none" },
              }}
              textColor="primary"
              variant="fullWidth"
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="setting tabs"
              //   className={classes.tabs}
            >
              <Tab label="Dashboard" {...a11yProps(0)} />
              <Tab label="All Products" {...a11yProps(1)} />
              <Tab label="Add Products" {...a11yProps(2)} />
              <Tab label="Orders" {...a11yProps(2)} />
              <Tab label="Users" {...a11yProps(2)} />
              <Tab label="Reviews" {...a11yProps(2)} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item md={9} xl={10}>
          <TabPanel value={value} index={0}>
            <DashboardChart />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderConfirm />
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
}
