import { formatMuiErrorMessage as _formatMuiErrorMessage } from "@mui/utils";
export default function withStyles() {
  throw new Error(process.env.NODE_ENV !== "production" ? "MUI: withStyles is not longer exported from @mui/material/styles.\nYou have to import it from @mui/styles.\nSee https://mui.com/r/migration-v4/#material-ui-core-styles for more details." : _formatMuiErrorMessage(15));
}