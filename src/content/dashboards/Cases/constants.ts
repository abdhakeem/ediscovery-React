//Store stateless constant items/variables and stateless functions here

export const defaultColDef = {
  // set filtering on for all columns
  filter: true,
  resizable: true
};

export const columnDefs = [
  {
    headerName: 'S. NO',
    field: 'id',
    sortable: true,
    filter: true,
    checkboxSelection: true,
    floatingFilter: true,
    rowGroup: false,
    rowDrag: false,
    headerCheckboxSelection: true,
    width: 150
  },
  {
    headerName: 'CASE ID',
    field: 'caseId',
    filter: true,
    floatingFilter: true,
    width: 400
  },
  {
    headerName: 'CASE NAME',
    field: 'projectname',
    sortable: true,
    filter: true,
    floatingFilter: true,
    width: 400
  },
  {
    headerName: 'CASE CREATED (PST)',
    field: 'created_at',
    sortable: true,
    filter: true,
    floatingFilter: true,
    width: 250
  }
];

export const sideBar = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel'
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel'
    }
  ],
  defaultToolPanel: ''
};

export enum AddCaseStatus {
  Success,
  Failure,
  NoStatus
}
