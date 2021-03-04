import React, { useState } from "react";
import Dashboard from "./Dashboard";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import GenericSnackbar from "./Components/Snackbar";

function App() {
    // snackbar state
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error" | "warning" | "info";
    }>({
        open: false,
        message: "",
        severity: "info",
    });

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbar({ ...snackbar, open: false });
    };
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg">
                <Dashboard setSnackbar={setSnackbar} />
            </Container>
            <GenericSnackbar
                handleClose={handleClose}
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
            />
        </>
    );
}

export default App;
