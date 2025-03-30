import { Editor } from "@monaco-editor/react";
import { useTheme } from "../../context/ThemeContext";
import { Box, Button, Tooltip, Snackbar, Stack } from "@mui/material";
import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";

type SqlEditorProps = {
  sql: string;
  setSql: (value: string) => void;
};

const SqlEditor = ({ sql, setSql }: SqlEditorProps) => {
  const { theme } = useTheme();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (sql) {
      try {
        await navigator.clipboard.writeText(sql);
        setCopySuccess(true);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleClear = () => setSql("");

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: (theme) => theme.palette.divider,
        padding: 1.5,
        backgroundColor: (theme) => theme.palette.background.paper,
        overflow: "hidden",
      }}
    >
      <Editor
        height="180px"
        defaultLanguage="sql"
        theme={theme === "light" ? "vs-light" : "vs-dark"}
        value={sql}
        onChange={(value) => setSql(value || "")}
        options={{
          fontSize: 20,
          lineNumbers: "off",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          placeholder: "Write your SQL query here...",
        }}
      />

      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        sx={{ marginTop: 1 }}
      >
        {/* Clear Button */}
        <Tooltip title="Clear SQL" arrow>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClear}
            startIcon={<ClearIcon />}
            disabled={!sql}
            sx={{
              textTransform: "none",
              fontSize: 14,
              padding: "6px 16px",
              minWidth: "110px",
              borderRadius: 0,
            }}
          >
            Clear
          </Button>
        </Tooltip>

        {/* Copy Button */}
        <Tooltip title="Copy to Clipboard" arrow>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            startIcon={<ContentCopyIcon />}
            disabled={!sql}
            sx={{
              textTransform: "none",
              fontSize: 14,
              padding: "6px 16px",
              minWidth: "110px",
              borderRadius: 0,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#357ab7",
              },
            }}
          >
            Copy
          </Button>
        </Tooltip>
      </Stack>

      {/* Snackbar for Copy Success */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default SqlEditor;
