import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useSelector, useDispatch } from "react-redux";

import { hideToast } from "store/reducers/uiSlice";

function Toast() {
  const { isToastShown, toastType, toastMessage } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideToast());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={3000}
      open={isToastShown}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={toastType}
        variant="filled"
        elevation={8}
        sx={{ width: "100%" }}
      >
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
