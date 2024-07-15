import Container from '@mui/material/Container';
import { SearchBar } from './components/Search';
import { CardListing } from './components/Listing';
import { Pagination } from '@mui/material';
import { useState } from 'react';
import { Company } from './lib/interfaces';

export default function App() {
  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState<Array<Company>>([]);

  const handleChangePage = (e: any, value: number) => {
    setPage(value - 1);
  };

  return (
    <>
      <Container maxWidth="lg">
        <div className='search'>
          <SearchBar setCompanies={setCompanies} />
        </div>
        <CardListing page={page} setCompanies={setCompanies} companies={companies} />
      </Container>
      <div className='pagination'>
        <Pagination count={10} defaultPage={page - 1} page={page} color="primary" onChange={handleChangePage} />
      </div>
    </>
  );
}
