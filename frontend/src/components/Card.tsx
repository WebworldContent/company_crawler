import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import defaultImage from '../assets/default.jpg';
import { Company } from '../lib/interfaces';
import { useState } from 'react';
import { CardElements } from './CardContent';
import { CompanyForm } from './Form';
import { Dispatch, SetStateAction } from 'react';


interface CardElementType extends Company {
  setUpdateCard: Dispatch<SetStateAction<boolean>>
}

export const CardElement = ({ cin, pin, id, companyName, setUpdateCard }: CardElementType) => {
  const [isEdit, setEdit] = useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={defaultImage}
          alt="green iguana"
        />
        <CardContent>
          {!isEdit ? (<CardElements cin={cin} id={id} pin={pin} companyName={companyName} setEdit={setEdit} setUpdateCard={setUpdateCard} />) : (<CompanyForm cin={cin} pin={pin} id={id} companyName={companyName} setEdit={setEdit} setUpdateCard={setUpdateCard} />)}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
