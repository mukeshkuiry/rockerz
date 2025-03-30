import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { TableRow } from "../../types/result";
import { executeSql } from "../../utils/executeSql";

type ExecuteSqlProps = {
  sql: string;
  setResult: (result: TableRow[]) => void;
  disabled?: boolean;
};

const ExecuteSql: React.FC<ExecuteSqlProps> = ({
  sql,
  setResult,
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    setLoading(true);
    try {
      const result = await executeSql(sql);
      setResult(result);
      console.log("SQL executed successfully");
    } catch (error) {
      console.error("Error executing SQL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleExecute}
      disabled={disabled || loading}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : null
      }
    >
      {loading ? "Executing..." : "Execute SQL"}
    </Button>
  );
};

export default ExecuteSql;
