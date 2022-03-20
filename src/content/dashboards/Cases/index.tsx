import { Box, Button, Container, Typography } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { CellClickedEvent } from 'ag-grid-community';
import { useNavigate } from 'react-router';
import { defaultColDef, columnDefs, sideBar, AddCaseStatus } from './constants';
import AddCaseDialog from './AddCaseDialog';
import MyCasesBc from './breadcrumb';
import { eDiscoveryUrl } from 'src/common/routes';
import Axios, { API } from 'src/common/api';
function DashboardLogin() {
  const userId = localStorage.getItem('userId');
  localStorage.removeItem('pdocid');
  localStorage.removeItem('pcaseId');
  localStorage.removeItem('caseIds');

  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  //const props = [];

  const enableFillHandle = true;

  let navigate = useNavigate();

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  const fetchCasesData = async () => {
    if (gridApi) gridApi.showLoadingOverlay();
    const params = { type: 'Cases' };
    const { data: rowData } = await Axios.get(API.GetCases, { params });

    if (gridApi) gridApi.hideOverlay();
    setRowData(rowData);
  };

  useEffect(() => {
    fetchCasesData();
  }, []);

  const onCellClicked = (params: CellClickedEvent) => {
    let path = `${eDiscoveryUrl.Case}/${params.data.id}`;
    navigate(path);
  };

  const autoGroupColumnDef = useMemo(
    () => ({
      filter: true,
      // supplies 'country' values to the filter
      filterValueGetter: (params) => params.data.model,
      field: 'model', // show model in group column at leaf levels
      cellRendererParams: {
        checkbox: true // put in checkbox selection in group column
      }
    }),
    []
  );

  const groupDisplayType = 'singleColumn';

  //const sideBar = true;

  const onSelectionChanged = (event) => {
    const values = event.api.getSelectedRows();
    const caseIds = values.map((val) => val.id).join(',');

    console.log(caseIds);
    localStorage.setItem('caseIds', caseIds);
  };

  const [caseDialogShown, setShowCaseDialog] = useState<boolean>(false);

  const handleClickOpen = () => {
    setShowCaseDialog(true);
  };

  const handleClose = (status: AddCaseStatus) => {
    setShowCaseDialog(false);

    fetchCasesData();
  };

  return (
    <>
      <MyCasesBc />
      <Container>
        <div data-v-4fb88474="" className="HeaderContent center-content">
          <div className="HeaderContent-container">
            <h1 className="HeaderContent-title">Welcome to Inabia Ebot</h1>
            <h3 className="HeaderContent-paragraph">
              Create new cases and extract results
            </h3>
          </div>
        </div>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Typography variant="h3" className="page-title">
            My Cases ({rowData ? rowData.length : '0'})
          </Typography>
          <Button
            size="medium"
            onClick={handleClickOpen}
            variant="text"
            className="theme-btn"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            ADD NEW CASE
          </Button>
        </Box>
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
          <AgGridReact
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
            onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            // rowDragManaged={true}  //Doesn't work with pagination
          />
        </div>
      </Container>
      <AddCaseDialog open={caseDialogShown} onClose={handleClose} />
      <Footer />
    </>
  );
}

export default DashboardLogin;
