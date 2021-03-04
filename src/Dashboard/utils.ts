import moment from "moment";

const formatNumber = (x: string) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const columns: any = [
    { title: "Source", field: "source", editable: "never" },
    {
        title: "Users",
        field: "users",
        editable: "never",
        render: (rowData: { users: string }) => formatNumber(rowData.users),
    },
    {
        title: "New Users",
        field: "newUsers",
        editable: "never",
        render: (rowData: { newUsers: string }) =>
            formatNumber(rowData.newUsers),
    },
    {
        title: "Sessions",
        field: "sessions",
        editable: "never",
        render: (rowData: { sessions: string }) =>
            formatNumber(rowData.sessions),
    },
    {
        title: "Bounce Rate",
        field: "bounceRate",
        editable: "never",
        render: (rowData: { bounceRate: string }) =>
            Number(rowData.bounceRate).toFixed(2) + "%",
    },
    {
        title: "First seen on",
        field: "firstSeenOn",
        editable: "never",
        render: (rowData: { firstSeenOn: string }) =>
            moment(rowData.firstSeenOn).format("YYYY-MM-DD H:mm:ss"),
    },
    {
        title: "Pages / Session",
        field: "pagesPerSession",
        editable: "never",
        render: (rowData: { pagesPerSession: string }) =>
            Number(rowData.pagesPerSession).toFixed(2),
    },
    {
        title: "Avg. Session Duration",
        field: "avgSessionDuration",
        editable: "never",
    },
    {
        title: "Conversion Rate",
        field: "conversionRate",
        editable: "never",
        render: (rowData: { conversionRate: string }) =>
            Number(rowData.conversionRate).toFixed(2) + "%",
    },
    {
        title: "Goal Value",
        field: "goalValue",
        render: (rowData: { goalValue: string }) =>
            Number(rowData.goalValue).toFixed(2),
        // validate that goal value is number
        validate: (rowData: { goalValue: string }) =>
            !!String(rowData.goalValue).match(/^-?\d*\.?\d*$/)
                ? ""
                : "Must be number",
    },
];
