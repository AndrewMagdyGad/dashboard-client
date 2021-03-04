/**
 * Props interface for Dashboard component
 * */
export interface IDashboard {
    setSnackbar: (snackbar: {
        open: boolean;
        message: string;
        severity: "success" | "error" | "warning" | "info";
    }) => void;
}

/**
 * Dataset interface
 */
export interface IData {
    _id: string;
    source: string;
    users: number;
    newUsers: number;
    sessions: number;
    bounceRate: number;
    firstSeenOn: Date;
    pagesPerSession: number;
    avgSessionDuration: string;
    conversionRate: number;
    goalValue: number;
}

/**
 * Input interface for getData service
 */
export interface IParams {
    page: number;
    itemsPerPage: number;
    search?: string;
    sortBy?: string;
    desc?: boolean;
}
