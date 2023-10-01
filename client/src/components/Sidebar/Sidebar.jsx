import { Container, Grid, Paper, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import DashboardChart from "../DashboardChart/DashboardChart";
import SeeAllProducts from "../SeeAllProducts/SeeAllProducts";
import AddProducts from "../AddProducts/AddProducts";
import SeeAllOrders from "../SeeAllOrders/SeeAllOrders";
import AllUsers from "../All Users/AllUsers";
import SeeAllReviews from "../../See All Reviews/SeeAllReviews";

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
      <Grid
        container
        spacing={2}
        style={{
          padding: "0rem 5rem",
          height: "100vh",
        }}
      >
        <Grid item md={3} xl={2}>
          <Toolbar variant="dense" />
          {/* <Paper
            style={
              {
                // boxShadow: "0 5px 10px rgb(0 0 0 / 0.2)",
                // position: "fixed",
                // width: "15rem",
              }
            }
          > */}
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
          >
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="All Products" {...a11yProps(1)} />
            <Tab label="Add Products" {...a11yProps(2)} />
            <Tab label="All Orders" {...a11yProps(3)} />
            <Tab label="All Users" {...a11yProps(4)} />
            <Tab label=" All Reviews" {...a11yProps(5)} />
          </Tabs>
          {/* </Paper> */}
        </Grid>
        <Grid item md={9} xl={10}>
          <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
            <TabPanel value={value} index={0}>
              <DashboardChart />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SeeAllProducts />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <AddProducts />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <SeeAllOrders />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <AllUsers />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <SeeAllReviews />
            </TabPanel>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
