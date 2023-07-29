import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function Accordeon({children , id ,title ,expanded}) {
  return (
    <Accordion style={{background:'#F2F2F2',marginBottom:'0.5rem',marginTop:'0.5rem',borderRadius:'0.5rem'}} expanded={expanded?expanded:true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id}
          id="panel1a-header"
          
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{background:"#EEF9FE"}}>
            {children}
        </AccordionDetails>
    </Accordion>

  )
}

export default Accordeon
