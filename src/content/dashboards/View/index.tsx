import { Helmet } from 'react-helmet-async';
import PageHeader from './ViewHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography } from '@mui/material';
import Footer from 'src/components/Footer';

import { useEffect, useMemo, useState, useRef, useCallback, SyntheticEvent } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import 'src/style.css';
import { CellClickedEvent } from 'ag-grid-community';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { Component } from 'react';
import { Document, Page } from 'react-pdf';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function DashboardLogin() {

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  localStorage.removeItem('caseIds');
  localStorage.removeItem('pcaseId');
  const {caseid} = useParams();
  const {docid} = useParams();
  localStorage.setItem('pcaseId', caseid);
  localStorage.setItem('pdocid', docid);
  console.log(docid);
  const userId = localStorage.getItem('userId');
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  //const props = [];
  const defaultColDef = {
    // set filtering on for all columns
    filter: true,
    resizable: true,
    flex: 1,
    editable: true,
  };

  const carMappings = {
    Relevant: 'Relevant',
    NonRelevant: 'Non Relevant',
  };

  const extractValues = (mappings) => {
    return Object.keys(mappings);
  };

  //const actionR = extractValues(carMappings);
  
  //console.log(actionR);

  const lookupValue = (mappings, key) => {
    return mappings[key];
  };
  
  // const lookupKey = (mappings, name) => {
  //   const keys = Object.keys(mappings);
  //   for (let i = 0; i < keys.length; i++) {
  //     const key = keys[i];
  //     if (mappings[key] === name) {
  //       return key;
  //     }
  //   }
  // };

   const [columnDefs] = useState([
       //{ field: "make", sortable: true, filter: true, checkboxSelection: true, floatingFilter: true, rowGroup: false, rowDrag: false, width: 300 },
       { headerName: 'FILE ID', field: "id", sortable: true, filter: true, floatingFilter: true, rowGroup: false, rowDrag: false },
       { headerName: 'FILE NAME', field: "orgfilename", sortable: true, filter: true, floatingFilter: true},
       { headerName: 'UPLOADED ON', field: "created_at", sortable: true, filter: true, floatingFilter: true},
       { headerName: 'STATUS', field: "status", sortable: true, filter: true, floatingFilter: true},
       //{ headerName: 'ACTIONS', field: "action", sortable: true, filter: true, floatingFilter: true },
       {
        headerName: 'ACTIONS',
        field: 'action',
        sortable: true,
        filter: true,
        floatingFilter: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: extractValues(carMappings),
        },
        refData: carMappings,
        filterParams: {
          valueFormatter: function (params) {
            return lookupValue(carMappings, params.value);
          },
        },
        valueFormatter: function (params) {
          return lookupValue(carMappings, params.value);
        },
      },
   ]);   
   
    const enableFillHandle = true;

   useEffect(() => {
          //fetch('https://www.ag-grid.com/example-assets/row-data.json')
          fetch('https://ediscovery.inabia.ai/api/getcases?userId='+userId+'&type=Files&caseId='+caseid+'&fileId='+docid)
           .then(result => result.json())
           .then(rowData => setRowData(rowData))
         
   }, []);

  console.log(rowData);
  // const onCellClicked = (params: CellClickedEvent ) => alert(params.data.id);

  let navigate = useNavigate(); 

  const onCellClicked = (params: CellClickedEvent ) => { 
    let path = '/dashboards/documents/'+ params.data.id; 
    navigate(path);
  };
  
  // we will use async/await to fetch this data
  async function getData(action: string, fileId: any) {

      let payload: string;

      axios.get('https://ediscovery.inabia.ai/api/settags?userId='+userId+'&caseId='+caseid+'&docId='+docid+'&token=ljwboidwndwpnd&action='+action+'&fileId='+fileId)
      .then(res => {
      let tagstatus = res.data.Response.Data;
        console.log(res)
      if(tagstatus === 'Success') {
        alert('Action change to: '+action);
      }


      else if (tagstatus !== 'Success') {
        alert('Failed');

      }

      else {
        alert('Failed');

      }

    
      })
  }

  const onCellValueChanged = useCallback((params) => {
    // notice that the data always contains the keys rather than values after editing
    console.log('onCellValueChanged: ', params);
    //API Call
    getData(params.value, params.data.id);
  }, []);
  
  const autoGroupColumnDef = useMemo(()=> ({
        filter: true,
          // supplies 'country' values to the filter 
        filterValueGetter: params => params.data.model,  
        field: "model", // show model in group column at leaf levels
        cellRendererParams: {
        checkbox: true // put in checkbox selection in group column
         }
     }), [])

  const groupDisplayType = 'singleColumn';   

  //const sideBar = true;

  const sideBar = {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
        },
        {
            id: 'filters',
            labelDefault: 'Filters',
            labelKey: 'filters',
            iconKey: 'filter',
            toolPanel: 'agFiltersToolPanel',
        }
    ],
    defaultToolPanel: '',
};

const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);

function onDocumentLoadSuccess({ numPages }) {
  setNumPages(numPages);
}


  return (
    <>
      <Helmet>
        <title>Inabia - eDiscovery</title>
      </Helmet>
      <PageTitleWrapper>
      
        <PageHeader />

      
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item lg={3} xs={12}>
          <div className='acc-border'>
            <div className='acc-heading'>Document Tools</div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Tagging</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                <Box sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">Document Relevancy</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel value="Relevant" control={<Radio />} label="Relevant" />
                            <FormControlLabel value="Not Relevant" control={<Radio />} label="Not Relevant" />
                          </RadioGroup>
                        </FormControl>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">Document Confidentiality</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel value="Confidential" control={<Radio />} label="Confidential" />
                            <FormControlLabel value="Not Confidential" control={<Radio />} label="Not Confidential" />
                          </RadioGroup>
                        </FormControl>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
                </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Divider />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Documents</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                <Box sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Document 1" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                          <ListItemText primary="Document 2" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
                </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
      
          </Grid>

          <Grid item lg={5} xs={12}>
          <object className='pdfviewer' width="100%" height="400" data="http://www.africau.edu/images/default/sample.pdf" type="application/pdf">   </object>

          </Grid>

          <Grid item lg={4} xs={12}>

                <Box sx={{ width: '100%' }}>
                  <Tabs variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Extracted Text" {...a11yProps(0)} />
                    <Tab label="Table Data" {...a11yProps(1)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    Raw Data here...
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Table Data here...
                  </TabPanel>
                </Box>
      
          </Grid>

        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardLogin;

