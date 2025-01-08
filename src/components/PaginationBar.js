import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationBar = ({ pageNum, onPageChange, totalPageNum }) => {
  const handleChange = (event, value) => {
    event.preventDefault();
    onPageChange(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination count={totalPageNum} page={pageNum} onChange={handleChange} showFirstButton showLastButton />
    </Stack>
  );
};

export default PaginationBar;
