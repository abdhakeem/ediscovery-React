import { Helmet } from 'react-helmet-async';
import PageHeader from './FileHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { render } from 'react-dom';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


import 'src/style.css';
import { CellClickedEvent } from 'ag-grid-community';
import id from 'date-fns/esm/locale/id/index.js';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

function DashboardLogin() {

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
    let path = '/dashboards/view/'+caseid+'/'+docid+'/'+params.data.id+'/'+params.data.orgfilename; 
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
          <Grid item lg={12} xs={12}>
          <div className="ag-theme-alpine" style={{height: 600, width: '100%'}}>
          <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection="multiple"
                groupSelectsChildren={true}
                pagination={true}
                autoGroupColumnDef={autoGroupColumnDef}
                enableCellTextSelection={true}
                paginationPageSize={30}
                cacheBlockSize={30}
                // paginationAutoPageSize={true}
                paginateChildRows={true}
                ensureDomOrder={true}
                rowMultiSelectWithClick={true}
                defaultColDef={defaultColDef}
                enableRangeSelection={true}
                enableFillHandle={enableFillHandle}
                groupDisplayType={groupDisplayType}
                sideBar={sideBar}
                onCellClicked={onCellClicked}
                onCellValueChanged={onCellValueChanged}
                // rowDragManaged={true}  //Doesn't work with pagination
        
                >
           </AgGridReact>
        </div>
      
            </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardLogin;

