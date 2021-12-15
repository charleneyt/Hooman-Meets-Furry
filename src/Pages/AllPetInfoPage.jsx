
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';


export default function AllPetInfoPage(props) {
  const {openModal, handleClose, petIt} = props;
  return (
    <>
    <Dialog open={openModal} onClose={handleClose}>
      123
    </Dialog>
    </>
  )
}