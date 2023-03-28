import Grid from "@mui/material/Grid";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import IconButton from '@mui/material/IconButton';

function RearrangeFooter({ rearrangeFavourites, index, listSize }) {
  const rearrange = (swapA, swapB) => {
    rearrangeFavourites(swapA, swapB)
  }
  return (
    <>
      <Grid container style={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>
        <IconButton aria-label="add to favorites" color="primary" disabled={index === 0} onClick={() => rearrange(index - 1, index)}>
          <KeyboardDoubleArrowLeftIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="add to favorites" color="primary" disabled={index + 1 >= listSize} onClick={() => rearrange(index, index + 1)}>
          <KeyboardDoubleArrowRightIcon fontSize="large" />
        </IconButton>
      </Grid>
    </>
  );
}
export default RearrangeFooter;