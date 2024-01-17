import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(() => ({
  color: '#4a56e2',
  width: 280,
  height: 50,
  borderRadius: 20,
  backgroundColor: 'white',
  border: '1px solid #4A56E2',
  '&:hover': {
    backgroundColor: 'white',
  },
}));

const ButtonSecondary = ({ text, onClick }) => (
  <>
    <ColorButton variant="contained" onClick={onClick}>
      {text}
    </ColorButton>
  </>
);

export default ButtonSecondary;
