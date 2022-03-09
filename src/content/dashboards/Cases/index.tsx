import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
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

function DashboardLogin() {

  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  //const props = [];
  const defaultColDef = {
    // set filtering on for all columns
    filter: true,
    resizable: true,
  };

   const [columnDefs] = useState([
       //{ field: "make", sortable: true, filter: true, checkboxSelection: true, floatingFilter: true, rowGroup: false, rowDrag: false, width: 300 },
       { headerName: 'S. NO', field: "id", sortable: true, filter: true, checkboxSelection: true, floatingFilter: true, rowGroup: false, rowDrag: false, headerCheckboxSelection: true, width: 150 },
       { headerName: 'CASE ID', field: "caseId", sortable: true, filter: true, floatingFilter: true, width: 400},
       { headerName: 'CASE NAME', field: "projectname", sortable: true, filter: true, floatingFilter: true, width: 400},
       { headerName: 'CASE CREATED (PST)', field: "created_at", sortable: true, filter: true, floatingFilter: true, width: 250 },

   ]);   
   
    const enableFillHandle = true;

   useEffect(() => {
          //fetch('https://www.ag-grid.com/example-assets/row-data.json')
          fetch('https://ediscovery.inabia.ai/api/getcases?userId=1&type=Cases&caseId=5&fileId=215')
           .then(result => result.json())
           .then(rowData => setRowData(rowData))
         
   }, []);

   //console.log(rowData[0]['caseId']);
   const onCellClicked = (params: CellClickedEvent ) => alert(params.value);

  //     const onButtonClick = e => 
  //     const selectedNodes = gridRef.current.api.getSelectedNodes()
  //     const selectedData = selectedNodes.map( node => node.data )
  //     const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ')
  //     alert(`Selected nodes: ${selectedDataStringPresentation}`)
  // }
  
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
    defaultToolPanel: 'columns',
};


  return (
    <>
      <Helmet>
        <title>Inabia - eDiscovery</title>
      </Helmet>
      <PageTitleWrapper>
      <div data-v-4fb88474="" className="HeaderContent center-content">      
        <div className="HeaderContent-container">
                  <h1 className="HeaderContent-title" >Welcome to Inabia Ebot</h1>
                  <h3 className="HeaderContent-paragraph">Create new cases and extract results</h3>
        </div>
      </div> 
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