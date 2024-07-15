import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PaginationProp = {
    count: number
}

const PaginationElement = ({ count }: PaginationProp) => {
    return (<Stack
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
        <Pagination count={count} color="primary" />
    </Stack>)
};

export default PaginationElement;