import {
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ searchInput, setSearchInput }) {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">
        Search todo
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="Search todo"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </FormControl>
  );
}
