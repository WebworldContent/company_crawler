import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CompanyFormType } from '../lib/interfaces';
import { ChangeEvent, useState } from 'react';
import { updateCompany } from '../services/companies';

export const CompanyForm = ({ companyName, cin, pin, id, setEdit, setUpdateCard }: CompanyFormType) => {
    const [company, setCompany] = useState({ companyName, cin, pin, id });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCompany((prevCompany) => ({ ...prevCompany, [name]: value }))
    }

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const { status } = await updateCompany(company, id || 0)
        if (status === 'success') {
            setEdit(false);
            setUpdateCard(true);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                name="companyName"
                label="Company"
                type="text"
                value={company.companyName}
                onChange={handleChange}
            />

            <TextField
                name="cin"
                label="CIN"
                type="text"
                value={company.cin}
                onChange={handleChange}
            />

            <TextField
                name="pin"
                label="PIN"
                type="text"
                value={company.pin}
                onChange={handleChange}
            />

            <Button variant="contained" size="small" onClick={handleSubmit}>Update</Button>
        </Box>
    );
}
