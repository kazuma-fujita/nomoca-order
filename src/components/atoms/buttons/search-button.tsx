import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {
  isLoading: boolean;
};

export const SearchButton = ({ isLoading }: Props) => {
  return (
    <LoadingButton
      type='submit'
      variant='contained'
      loading={isLoading}
      loadingPosition='start'
      startIcon={<SearchIcon />}
    >
      検索する
    </LoadingButton>
  );
};
