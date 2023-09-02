import { Button, Container, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../Redux/Product/ProductAction";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //   const handleIconClick = () => {
  //     dispatch(fetchProducts(null, null, searchTerm));
  //   };

  //   useEffect(() => {}, [dispatch, searchTerm]);

  const searchKeyWord = () => {
    dispatch(fetchProducts({ keyword: searchTerm }));
    setSearchTerm("");
  };

  return (
    <div>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={() => searchKeyWord()}>
                <SearchIcon style={{ cursor: "pointer" }} />
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
