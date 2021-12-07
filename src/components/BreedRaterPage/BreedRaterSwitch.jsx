import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';




// TODO: Change background color
const CatDogSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url("https://img.icons8.com/stickers/38/000000/dog.png")`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url("https://img.icons8.com/stickers/38/000000/cat.png")`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


export default function BreedRaterSwitch(props) {
  const {type, setType} = props;
  const handleChangeType = (event) => {
    if (type === "Cat") {
      setType("Dog")
    } else {
      setType("Cat")
    }
  };

  return (
<CatDogSwitch sx={{ m: 1 }}  defaultChecked onChange={handleChangeType}/>
  );
}
