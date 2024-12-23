import React from 'react';
import { Card, CardMedia } from '@mui/material';

const Component = props => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia image={props.square200 || "https://placehold.co/200"} />
    </Card>
  );
}

export default Component;
