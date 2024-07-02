import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const OverflowBox = styled(Box)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});


const Component = ({ name, cost, url }) => {
  return (
    <Card sx={{ marginBottom: 1, marginLeft: 1}}>
      <CardHeader
        title={<OverflowBox>{name}</OverflowBox>}
        subheader={cost.toFixed(2)}
        avatar={
          <Avatar src={url} />
        }
      />
    </Card>
  );
}

export default Component;
