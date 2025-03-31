import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={600}>
          SQL Executor
        </Typography>
        <FormControlLabel
          control={<Switch checked={theme === "dark"} onChange={toggleTheme} />}
          label={theme === "dark" ? "Dark Mode" : "Light Mode"}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
