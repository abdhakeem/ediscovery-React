import { Helmet } from 'react-helmet-async';
import PageHeader from './ViewHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography } from '@mui/material';
import Footer from 'src/components/Footer';

import { useEffect, useMemo, useState, useRef, useCallback, SyntheticEvent } from 'react';
import { render } from 'react-dom';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Card, CardHeader, CardContent, Divider } from '@mui/material';




import 'src/style.css';
import { CellClickedEvent } from 'ag-grid-community';
import id from 'date-fns/esm/locale/id/index.js';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';


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

  const handleChanges = (event: SyntheticEvent, newValue: number) => {
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
            123
      
          </Grid>

          <Grid item lg={6} xs={12}>
                <Box sx={{ width: '100%' }}>
                  <Tabs variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    Item One
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                </Box>

          </Grid>

          <Grid item lg={3} xs={12}>
          <Box sx={{ width: '100%' }}>
                  <Tabs variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary" value={value} onChange={handleChanges} aria-label="basic tabs example">
                    <Tab label="Item three" {...a11yProps(3)} />
                    <Tab label="Item four" {...a11yProps(4)} />
                  </Tabs>
                  <TabPanel value={value} index={3}>
                    Item three
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    Item four
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

