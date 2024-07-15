import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { esSearch } from '../services/companies';

type SearchType = {
  setCompanies: Function;
}

export const SearchBar = ({ setCompanies }: SearchType) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const response = await esSearch(query);
    setCompanies(response)
    // console.log(data);
    // const searchedCompanies = []
  };

  return (
    <div className="search-wrapper">
      <Box
        component="form"
        sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100vh', flexWrap: 'wrap' }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </div>
  );
};
