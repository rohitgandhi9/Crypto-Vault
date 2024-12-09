import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import "./styles.css" 
import { useState } from 'react';

export default function PaginationComponent({page,handleChange}) {

  return (
    <div className='pagination-component'>
        <Pagination
        count={10}
        page={page}
        onChange={(event,value)=>handleChange(event,value)}
        sx={{
            "& .MuiPaginationItem-text": {
              color: "#fff !important",
              border: "1.5px solid var(--grey)",
            },
            "& .Mui-selected  ": {
              backgroundColor: "var(--blue) !important",
              borderColor: "var(--blue)",
            },
            "& .MuiPaginationItem-text:hover": {
              backgroundColor: "transparent !important",
            },
            "& .MuiPaginationItem-ellipsis": {
              border: "none",
            },
          }}
      />
    </div>
  );
}