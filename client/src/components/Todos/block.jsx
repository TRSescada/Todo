import React from 'react';
import {
  Box,
  Card,
  Badge,
  Typography,
  Divider,
  Grid,
  styled,
  Button,
  Dialog,
  DialogContent,
  TextField
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';
import EditIcon from '@mui/icons-material/Edit';

const CardBorderBottom = styled(Card)(
  () => `
        border-bottom: transparent 5px solid;
        border-radius: 20px;
  `
);

function Block1({data}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate("/task",{state:{id}})
  };
  const editTodo= (id) => {
    console.log(id);
  }
  return (
      <>
      <Grid container spacing={4}>
        {data.map((item) => (
          <Grid item xs={12} md={4}>
            <CardBorderBottom
              sx={{
                borderBottomColor: "blue",
              }}
            >
              <Box p={2} onClick={() => handleClick(item._id)}>
                {item.title}
                <Box mt={1.5} display="flex">
                  <Box mr={0.5}>
                    <Badge
                      color="success"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      variant="dot"
                      overlap="rectangular"
                    >
                    </Badge>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                sx={{
                  background: "grey"
                }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  variant="subtitle1"
                >
                  <ScheduleTwoToneIcon
                    sx={{
                      mr: 0.4
                    }}
                    fontSize="small" />
                  Today - 9:45 am
                </Typography>
                <EditIcon onClick={() => editTodo(item._id)} />
              </Box>
            </CardBorderBottom>
          </Grid>
        ))}
      </Grid>
      </>
  );
}

export default Block1;
