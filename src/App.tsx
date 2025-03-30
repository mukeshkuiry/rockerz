import { useTheme } from "./context/ThemeContext";
import {
  Box,
  Switch,
  Typography,
  Stack,
  FormControlLabel,
  AppBar,
  Toolbar,
} from "@mui/material";
import ResultTable from "./components/ResultTable";
import SqlEditor from "./components/SqlEditor";
import { useState } from "react";
import { TableRow } from "./types/result";
import ExecuteSql from "./components/ExecuteSql/ExecuteSql";
import ResultSummary from "./components/ResultSummary/ResultSummary";
import { LicenseInfo } from "@mui/x-license";

const REACT_APP_MUI_X_LICENSE_KEY = process.env.REACT_APP_MUI_X_LICENSE_KEY;
if (REACT_APP_MUI_X_LICENSE_KEY)
  LicenseInfo.setLicenseKey(REACT_APP_MUI_X_LICENSE_KEY);
else console.error("Invalid MUI X license key or license key not found");

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
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={600}>
            SQL Executor
          </Typography>
          <FormControlLabel
            control={
              <Switch checked={theme === "dark"} onChange={toggleTheme} />
            }
            label={theme === "dark" ? "Dark Mode" : "Light Mode"}
          />
        </Toolbar>
      </AppBar>

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
