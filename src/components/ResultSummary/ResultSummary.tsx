import React from "react";
import { Box, Typography } from "@mui/material";

type ResultSummaryProps = {
  rowCount: number;
  columnCount: number;
  executionTime?: number; // In milliseconds
};

const ResultSummary: React.FC<ResultSummaryProps> = ({
  rowCount,
  columnCount,
  executionTime,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #e0e0e0",
        color: "#666",
        fontSize: "14px",
      }}
    >
      <Typography>
        <strong>{rowCount}</strong> rows × <strong>{columnCount}</strong>{" "}
        columns
      </Typography>
      {executionTime !== undefined && (
        <Typography>
          Execution time: <strong>{executionTime} ms</strong>
        </Typography>
      )}
    </Box>
  );
};

export default ResultSummary;
