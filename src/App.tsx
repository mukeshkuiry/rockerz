import { useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./components/Header/Header";
import SqlEditor from "./components/SqlEditor/SqlEditor";
import ExecuteSql from "./components/ExecuteSql/ExecuteSql";
import ResultSummary from "./components/ResultSummary/ResultSummary";
import ResultTable from "./components/ResultTable/ResultTable";
import { TableRow } from "./types/result";
import { initializeLicense } from "./config/license";

initializeLicense();
const DUMMY_EXECUTION_TIME = 500;

function App() {
  const [sql, setSql] = useState("");
  const [result, setResult] = useState<TableRow[]>([]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      <Header />

      <Stack spacing={2} sx={{ flexGrow: 1, padding: 2 }}>
        <SqlEditor sql={sql} setSql={setSql} />
        <ExecuteSql sql={sql} setResult={setResult} />
        {result.length > 0 && (
          <ResultSummary
            rowCount={result.length}
            columnCount={Object.keys(result[0]).length}
            executionTime={DUMMY_EXECUTION_TIME}
          />
        )}
        <ResultTable queryResult={result} />
      </Stack>
    </Box>
  );
}

export default App;
