import TextField from '@mui/material/TextField';

const Input = ({ text, value, onChange, name, type }) => (
  <TextField
    style={{
      root: {
        '&:before': {
          borderBottom: '2px solid #e0e0e0)',
        },
        '&:hover:not(.Mui-disabled, .Mui-error):before': {
          borderBottom: '2px solid #e0e0e0',
        },
        '&.Mui-focused:after': {
          borderBottom: '2px solid #e0e0e0',
        },
      },
    }}
    id="standard-basic"
    label={text}
    variant="standard"
    value={value}
    onChange={onChange}
    name={name}
    type={type}
  />
);

export default Input;
