import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CardMenu({title, onClick}) {
  return (
    <Card sx={{ maxWidth: 345 } , { maxHeight: 302}} onClick={onClick} className=' hover:scale-105 hover:cursor-pointer'>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://i.pinimg.com/originals/a9/5f/3d/a95f3d6a0419049a1ead03dd938333c4.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default CardMenu