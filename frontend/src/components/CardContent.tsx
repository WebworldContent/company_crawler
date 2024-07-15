import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CompanyFormType } from '../lib/interfaces';
import { deleteCompany } from '../services/companies';



export const CardElements = ({ cin, pin, companyName, setEdit, id, setUpdateCard }: CompanyFormType) => {

    const handleDelete = async () => {
        const { status } = await deleteCompany(id || 0);
        if (status === 'success') {
            setUpdateCard(true);
        }
    };

    return (<>
        <Typography gutterBottom variant="p" component="div" style={{ textTransform: 'uppercase' }}>
            {companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            <p><b>{cin}</b></p>
            <p><b>{pin}</b></p>
        </Typography>
        <Stack direction="row" spacing={2} className="card-btn">
            <Button variant="contained" size="small" onClick={() => setEdit(true)}>Edit</Button>
            <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
        </Stack>
    </>)
};
