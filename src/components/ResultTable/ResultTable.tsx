import { Box } from "@mui/material";
import {
  DataGridPro,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid-pro";

type ResultTableProps<T> = {
  queryResult: T[];
};

const ResultTable = <T extends { id?: number }>({
  queryResult,
}: ResultTableProps<T>) => {
  if (queryResult.length === 0) {
    return (
      <Box
        sx={{
          padding: 2,
          textAlign: "center",
          color: "text.secondary",
          fontSize: 16,
        }}
      >
        No results found
      </Box>
    );
  }

  // Dynamically generate columns from query result
  const columns: GridColDef[] = Object.keys(queryResult[0]).map((key) => ({
    field: key,
    headerName: key.toUpperCase(),
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
    headerAlign: "left",
    align: "left",
  }));

  // Custom toolbar for DataGridPro
  const CustomToolbar = () => (
    <GridToolbarContainer
      sx={{
        padding: "4px 8px",
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ marginLeft: "auto" }}>
        <GridToolbarQuickFilter />
      </Box>
    </GridToolbarContainer>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: 600,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <DataGridPro
        rows={queryResult.map((row, index) => ({
          id: row.id ?? index,
          ...row,
        }))}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        pagination
        pageSizeOptions={[10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 20, page: 0 } },
        }}
        sortingOrder={["asc", "desc"]}
        slots={{ toolbar: CustomToolbar }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "background.default",
            fontSize: 14,
            fontWeight: 500,
          },
          "& .MuiDataGrid-cell": { fontSize: 14 },
          "& .MuiCheckbox-root": { padding: 4 },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "background.default",
          },
        }}
      />
    </Box>
  );
};

export default ResultTable;
