import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';

import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { render } from 'react-dom';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

import 'src/style.css';

function DashboardCrypto() {

  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Case ID', field: 'caseId', rowGroup: true, hide: false, width: 150 },
    { headerName: 'Case Name', field: 'projectname', rowGroup: true, hide: false, width: 150 },
    // { headerName: 'S. NO', field: 'gold', aggFunc: 'sum' },
    // { headerName: 'S. NO', field: 'silver', aggFunc: 'sum' },
    // { headerName: 'S. NO',field: 'bronze', aggFunc: 'sum' },
    // { headerName: 'S. NO', field: 'age', minWidth: 120, aggFunc: 'sum' },
    { headerName: 'Company', field: 'company',  width: 250 },
    { headerName: 'Create at', field: 'created_at',  width: 150 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'S. NO',
      field: 'id',
      minWidth: 250,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://ediscovery.inabia.ai/api/getcases?userId=1&type=Cases&caseId=&fileId=')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

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
          <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            rowSelection={'multiple'}
            groupSelectsChildren={true}
            suppressRowClickSelection={true}
            suppressAggFuncInHeader={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
            </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
