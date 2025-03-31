import { Box, Typography } from "@mui/material";

type ResultSummaryProps = {
  rowCount: number;
  columnCount: number;
  executionTime?: number;
};

const ResultSummary = ({
  rowCount,
  columnCount,
  executionTime,
}: ResultSummaryProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.secondary",
        fontSize: 14,
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
