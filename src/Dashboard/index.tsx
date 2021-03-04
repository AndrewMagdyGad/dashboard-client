import React, { useRef, useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import FileUpload from "@material-ui/icons/PublishTwoTone";
import DeleteForeverTwoTone from "@material-ui/icons/DeleteForeverTwoTone";
import SearchAndSort from "../Components/SearchAndSort";
import tableIcons from "./TableIcons";
import { Services } from "./services";
import { columns } from "./utils";
import { IDashboard, IData } from "./interfaces";

export default function Dashboard({ setSnackbar }: IDashboard) {
    const itemsPerPage = 20;
    const uploadFile = useRef<any>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IData>();

    // pagination hooks
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    // filter hook
    const [filter, setFilter] = useState<{
        search: string | undefined;
        sortBy: string | undefined;
        desc: boolean | undefined;
    }>({ search: undefined, sortBy: undefined, desc: undefined });

    const nextPage = (page: number) => {
        setPage(page);
    };

    // reset table on filter change
    useEffect(() => {
        setPage(0);
    }, [filter]);

    useEffect(() => {
        setLoading(true);
        Services.getData({
            page,
            itemsPerPage,
            search: filter?.search,
            sortBy: filter?.sortBy,
            desc: filter?.desc,
        })
            .then(({ response, responseData }) => {
                if (response.ok) {
                    setData(responseData.result);
                    setTotalCount(responseData.count);
                } else {
                    setSnackbar({
                        open: true,
                        message: JSON.stringify(responseData.message),
                        severity: "error",
                    });
                }
            })
            .catch((e) => {
                setSnackbar({
                    open: true,
                    message: e.message,
                    severity: "error",
                });
            })
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line
    }, [page, filter]);

    const resetToInitial = () => {
        setFilter({
            search: undefined,
            sortBy: undefined,
            desc: undefined,
        });
    };

    return (
        <MaterialTable
            title="Miro Dashboard"
            icons={tableIcons}
            isLoading={isLoading}
            columns={columns}
            data={data as any}
            onChangePage={nextPage}
            page={page}
            totalCount={totalCount}
            components={{
                Toolbar: (props) => (
                    <>
                        <MTableToolbar {...props} />
                        <SearchAndSort filter={filter} setFilter={setFilter} />
                    </>
                ),
            }}
            editable={{
                onRowUpdate: (newData: IData) => {
                    setLoading(true);
                    return Services.updateGoalValue(
                        newData._id,
                        Number(newData.goalValue)
                    )
                        .then(({ response, responseData }) => {
                            if (response.ok) {
                                setSnackbar({
                                    open: true,
                                    message: "This row is updated successfully",
                                    severity: "success",
                                });
                            } else {
                                setSnackbar({
                                    open: true,
                                    message: JSON.stringify(
                                        responseData.message
                                    ),
                                    severity: "error",
                                });
                            }
                        })
                        .catch((e) => {
                            setSnackbar({
                                open: true,
                                message: e.message,
                                severity: "error",
                            });
                        })
                        .finally(() => {
                            setLoading(false);
                            resetToInitial();
                        });
                },
                onRowDelete: (rowData) => {
                    setLoading(true);
                    return Services.deleteById(rowData._id)
                        .then(({ response, responseData }) => {
                            if (response.ok) {
                                setSnackbar({
                                    open: true,
                                    message: "This row is deleted successfully",
                                    severity: "success",
                                });
                            } else {
                                setSnackbar({
                                    open: true,
                                    message: JSON.stringify(
                                        responseData.message
                                    ),
                                    severity: "error",
                                });
                            }
                        })
                        .catch((e) => {
                            setSnackbar({
                                open: true,
                                message: e.message,
                                severity: "error",
                            });
                        })
                        .finally(() => {
                            setLoading(false);
                            resetToInitial();
                        });
                },
            }}
            options={{
                search: false,
                sorting: false,
                headerStyle: {
                    backgroundColor: "#DDD",
                    fontSize: "20px",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                },
                rowStyle: {
                    fontSize: "16px",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                },
                pageSize: itemsPerPage,
                pageSizeOptions: [],
            }}
            actions={[
                {
                    icon: () => (
                        <>
                            <FileUpload fontSize="large" />
                            <input
                                accept=".csv"
                                onChange={async (event: any) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    const file = event.target.files[0];
                                    if (file && file.type === "text/csv") {
                                        setLoading(true);
                                        Services.uploadFile(file)
                                            .then(
                                                ({
                                                    response,
                                                    responseData,
                                                }) => {
                                                    if (response.ok) {
                                                        setSnackbar({
                                                            open: true,
                                                            message:
                                                                responseData.message,
                                                            severity: "success",
                                                        });
                                                    } else {
                                                        setSnackbar({
                                                            open: true,
                                                            message: JSON.stringify(
                                                                responseData.message
                                                            ),
                                                            severity: "error",
                                                        });
                                                    }
                                                }
                                            )
                                            .catch((e) => {
                                                setSnackbar({
                                                    open: true,
                                                    message: e.message,
                                                    severity: "error",
                                                });
                                            })
                                            .finally(() => {
                                                setLoading(false);
                                                resetToInitial();
                                            });
                                    } else {
                                        setSnackbar({
                                            open: true,
                                            message:
                                                "we only support csv files",
                                            severity: "error",
                                        });
                                    }
                                }}
                                ref={uploadFile}
                                style={{ display: "none" }}
                                id="upload-file"
                                name="upload-file"
                                type="file"
                            />
                        </>
                    ),
                    tooltip: "Upload File",
                    isFreeAction: true,
                    onClick: () => {
                        uploadFile?.current?.click();
                    },
                },
                {
                    icon: () => <DeleteForeverTwoTone fontSize="large" />,
                    tooltip: "Delete All Data",
                    isFreeAction: true,
                    onClick: () => {
                        setLoading(true);
                        Services.deleteAll()
                            .then(({ response, responseData }) => {
                                if (response.ok) {
                                    setSnackbar({
                                        open: true,
                                        message:
                                            "All data are deleted successfully",
                                        severity: "success",
                                    });
                                } else {
                                    setSnackbar({
                                        open: true,
                                        message: JSON.stringify(
                                            responseData.message
                                        ),
                                        severity: "error",
                                    });
                                }
                            })
                            .catch((e) => {
                                setSnackbar({
                                    open: true,
                                    message: e.message,
                                    severity: "error",
                                });
                            })
                            .finally(() => {
                                setLoading(false);
                                resetToInitial();
                            });
                    },
                },
            ]}
        />
    );
}
