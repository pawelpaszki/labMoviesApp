import React from "react";
import "./styles.css";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

function Pagination({ data, page, setPage }) {
  return (
    <>
      <div className="footerFill">
      </div>
      <div className="footer">
        <div className="footerCol">
          <Button variant="contained"
            onClick={() => setPage(old => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            Previous Page
          </Button>{' '}
        </div>
        <div className="footerCol">
          <Chip label="Current Page" color="primary" /> <Chip label={page} />
          <Chip label="Total # of Pages" color="primary" /> <Chip label={data?.total_pages} />
        </div>
        <div className="footerCol">
          <Button variant="contained"
            onClick={() => {
              if (!data?.total_pages <= page) {
                setPage(old => old + 1)
              }
            }}
          >
            Next Page
          </Button>
        </div>
      </div>
    </>
  );
}
export default Pagination;
