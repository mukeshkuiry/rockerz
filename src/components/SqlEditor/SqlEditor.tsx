import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "../../context/ThemeContext";
import { Box, Button, Tooltip, Snackbar, Stack } from "@mui/material";
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
    if (!sql) return;
    try {
      await navigator.clipboard.writeText(sql);
      setCopySuccess(true);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: (theme) => theme.palette.divider,
        padding: 1.5,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      {/* SQL Code Editor */}
      <Editor
        height="180px"
        defaultLanguage="sql"
        theme={theme === "light" ? "vs-light" : "vs-dark"}
        value={sql}
        onChange={(value) => setSql(value || "")}
        options={{
          fontSize: 20,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />

      {/* Buttons: Clear & Copy */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        sx={{ mt: 1 }}
      >
        <Tooltip title="Clear SQL" arrow>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setSql("")}
            startIcon={<ClearIcon />}
            disabled={!sql}
            sx={{ textTransform: "none", fontSize: 14 }}
          >
            Clear
          </Button>
        </Tooltip>

        <Tooltip title="Copy to Clipboard" arrow>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            startIcon={<ContentCopyIcon />}
            disabled={!sql}
            sx={{ textTransform: "none", fontSize: 14 }}
          >
            Copy
          </Button>
        </Tooltip>
      </Stack>

      {/* Snackbar Notification */}
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
