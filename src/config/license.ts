import { LicenseInfo } from "@mui/x-license";

const LICENSE_KEY = process.env.REACT_APP_MUI_X_LICENSE_KEY;

// Set MUI X Pro license key
export function initializeLicense() {
  if (LICENSE_KEY) {
    LicenseInfo.setLicenseKey(LICENSE_KEY);
  } else {
    console.warn("MUI X license key not found.");
  }
}
