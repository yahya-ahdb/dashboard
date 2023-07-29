import React from 'react'
import { CircularProgress, Dialog, DialogContent } from '@mui/material'
import {GridLoader ,SyncLoader} from 'react-spinners'
const SpinnerLoader = () => {
  return (
    <Dialog  open={open} className='dialogSpinner' >
    <DialogContent >
    <div className='div_loader'>
    {/* <SyncLoader color="#36d7b7" /> */}
    <GridLoader color="#36d7b7" />
    {/* <SyncLoader color="#36d7b7" /> */}

    </div>

    </DialogContent>
    </Dialog>
  )
}

export default SpinnerLoader
