

import { Card, CircularProgress, Container, Dialog, DialogContent } from '@mui/material'
import { useGetOrderByIdQuery } from '../../redux/RtkSlices/orderSlice'
import Spinner from '../../components/Spinner/Spinner'
import useHeaders from '../../hooks/useHeaders'
import SoftBox from '../SoftBox'
import { useTranslation } from 'react-i18next'
import SoftTypography from '../SoftTypography'
import { useSoftUIController } from '../../context'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordeon from '../Accordeon/Accordeon'
function OrderDialogCompennt({orderId ,dialog ,setDialog}){
    const [controller, dispatch] = useSoftUIController();

    const {  sidenavColor } = controller;
    const headers = useHeaders()
    const {t} = useTranslation()
    const {data ,isLoading} =useGetOrderByIdQuery({headers:headers ,id:orderId})
    const orderData = data ?data?.data:[]

    const address = orderData ?orderData?.address:{}
    console.log('orderData',orderData)
    return(
        <Dialog  open={dialog} className='bg_dialog'  fullWidth onClose={()=>setDialog(false)}>
        <DialogContent >
            {isLoading?<Spinner/>:
            <Container mt={5} mb={3}>
                <div className='order_id'>
                    <SoftTypography color={sidenavColor} style={{fontSize:'15px'}}>
                        <p ><span>{t('oid')}</span> : <span># {orderData?.id}</span></p>
                    </SoftTypography>
                </div>
                    <Accordeon id="1" tilte='test' expanded={true}>
                        <div >
                            <div className='orderDetailesText'>
                                <div>
                                    <p><span className='spanTranslate'>{t('Region')}</span> : <span className='spanText'>{address?.neighborhood}</span></p>
                                    <p><span className='spanTranslate'>{t('Streetname')}</span> : <span className='spanText'>{address?.street}</span></p>

                                </div>

                                <div>
                                    <p><span className='spanTranslate'>{t('floor')}</span> : <span className='spanText'>{address?.floor}</span></p>
                                    <p><span className='spanTranslate'>{t('building_number')}</span> : <span className='spanText'>{address?.building_number}</span></p>
                                </div>
                            </div>

                            {/* <div>
                                <p><span className='spanTranslate'>{t('otherdetails')}</span> : <span className='spanText'>{}</span></p>
                                <p><span className='spanTranslate'>{t('nextto')}</span> : <span className='spanText'>{}</span></p>
                            </div> */}
                        </div>
                    </Accordeon>
            </Container>

            }
        </DialogContent>
        </Dialog>
    )
}
export default OrderDialogCompennt