import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./SeeAllReviews.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { getAllReviewsAction } from "../Redux/Product/ProductAction";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SeeAllReviews() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [reviewId, setReviewId] = React.useState("");
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.products);

  function createData(id, name, comment, rating) {
    return { id, name, comment, rating };
  }

  const getReviewsData = React.useCallback(async () => {
    if (!reviews) return [];

    const rowData = await Promise.all(
      reviews.map(async (item) => {
        return createData(item._id, item.name, item.comment, item.rating);
      })
    );

    return rowData;
  }, [reviews]);

  const searchReview = () => {
    dispatch(getAllReviewsAction(reviewId));
    setReviewId("");
  };

  React.useEffect(() => {
    if (reviews) {
      async function fetchData() {
        const data = await getReviewsData();
        setRows(data);
      }

      fetchData();
    }
  }, [getReviewsData]);

  return (
    <div className="tableCont">
      <TableContainer component={Paper}>
        <div className="reviewSearch">
          <h2>ALL REVIEWS </h2>
          <input
            placeholder="Please feel Product Id"
            value={reviewId}
            onChange={(e) => setReviewId(e.target.value)}
          />
          <Button variant="contained" onClick={searchReview}>
            Search
          </Button>
        </div>
        <div
          style={{ maxHeight: "100vh", overflowY: "auto", marginTop: "1rem" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{ color: "red" }}>
              <TableRow>
                <StyledTableCell style={{ fontSize: "1.2rem" }}>
                  Review ID
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Users
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Comment
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="left">
                  Rating
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="center">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows ? (
                rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.comment}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.rating}</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      onClick={() => navigate(`/orderinfo/${row.id}`)}
                    >
                      <DeleteIcon />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    jjfjj
                  </StyledTableCell>
                  <StyledTableCell align="left">gjgj</StyledTableCell>
                  <StyledTableCell align="left">jg</StyledTableCell>
                  <StyledTableCell align="left">hfhfhfh</StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteIcon />
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
}
