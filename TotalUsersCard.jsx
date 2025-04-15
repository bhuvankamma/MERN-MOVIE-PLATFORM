import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

const TotalUsersCard = ({ totalUsers = 1024 }) => {
  return (
    <Card sx={{ backgroundColor: '#1e1e1e', color: '#00e676', borderRadius: 3, boxShadow: 3 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <GroupIcon sx={{ fontSize: 40 }} />
        <div>
          <Typography variant="h6" fontWeight="bold">Total Users</Typography>
          <Typography variant="h4">{totalUsers}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalUsersCard;
