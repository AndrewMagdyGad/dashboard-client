import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./Alert";

interface IGenericSnackbar {
    open: boolean;
    handleClose: () => void;
    message: string;
    severity: "success" | "error" | "warning" | "info";
}

export default function GenericSnackbar({
    open,
    handleClose,
    message,
    severity,
}: IGenericSnackbar) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}
