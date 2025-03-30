import { useTheme } from "./context/ThemeContext";
import { Box, Switch, Typography, Stack } from "@mui/material";
import ResultTable from "./components/ResultTable";
import SqlEditor from "./components/SqlEditor";
import { useState } from "react";
import { TableRow } from "./types/result";
import ExecuteSql from "./components/ExecuteSql/ExecuteSql";
import ResultSummary from "./components/ResultSummary/ResultSummary";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [sql, setSql] = useState<string>("");
  const [result, setResult] = useState<TableRow[]>([]);
  const DUMMY_EXECUTION_TIME = 500;

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
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{
          padding: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" fontWeight={500}>
          SQL Executor
        </Typography>
        <Switch checked={theme === "dark"} onChange={toggleTheme} />
      </Stack>

      {/* Main Content */}
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
