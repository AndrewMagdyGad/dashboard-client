import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

const SortOptions = [
    { text: "None", value: "none" },
    { text: "Source", value: "source" },
    { text: "Users", value: "users" },
    { text: "New Users", value: "newUsers" },
    { text: "Sessions", value: "sessions" },
    { text: "Bounce Rate", value: "bounceRate" },
    { text: "First seen on", value: "firstSeenOn" },
    { text: "Pages / Session", value: "pagesPerSession" },
    { text: "Avg. Session Duration", value: "avgSessionDuration" },
    { text: "Conversion Rate", value: "conversionRate" },
    { text: "Goal Value", value: "goalValue" },
];

const SortDirectionOptions = [
    { text: "Descending", value: true },
    { text: "Ascending", value: false },
];

interface Filter {
    search: string | undefined;
    sortBy: string | undefined;
    desc: boolean | undefined;
}

interface LocalFilter {
    search: string;
    sortBy: number;
    desc: number;
}

interface ISearchAndSort {
    filter: Filter;
    setFilter: (filters: Filter) => void;
}

const mapFilterToLocalFilter = (filter: Filter) => {
    return {
        search: filter.search ? filter.search : "",
        sortBy: filter.sortBy
            ? SortOptions.findIndex((item) => item.value === filter.sortBy)
            : 0,
        desc: filter.sortBy
            ? SortDirectionOptions.findIndex(
                  (item) => item.value === filter.desc
              )
            : 0,
    };
};

export default function SearchAndSort({ filter, setFilter }: ISearchAndSort) {
    const [localFilter, setLocalFilter] = useState<LocalFilter>(
        mapFilterToLocalFilter(filter)
    );

    const onClearClicked = () => {
        setFilter({ search: undefined, sortBy: undefined, desc: undefined });
    };

    const onFilterClicked = (e: any) => {
        setFilter({
            search:
                localFilter.search.length > 0 ? localFilter.search : undefined,
            sortBy:
                localFilter.sortBy > 0
                    ? SortOptions[localFilter.sortBy].value
                    : undefined,
            desc:
                localFilter.sortBy > 0
                    ? Boolean(SortDirectionOptions[localFilter.desc].value)
                    : undefined,
        });
    };

    return (
        <>
            <Box py="1rem" px="0.5rem" display="flex" flexWrap="wrap">
                <Box px="1rem">
                    <TextField
                        label="Search 🔍"
                        value={localFilter.search}
                        onChange={(event) => {
                            event.persist();
                            setLocalFilter((prev: LocalFilter) => ({
                                ...prev,
                                search: event.target.value,
                            }));
                        }}
                    />
                </Box>
                <Box px="1rem" minWidth={200}>
                    <TextField
                        select
                        fullWidth
                        label="Sort By"
                        value={localFilter.sortBy}
                        onChange={(event) => {
                            setLocalFilter((prev: LocalFilter) => ({
                                ...prev,
                                sortBy: Number(event.target.value),
                            }));
                        }}
                    >
                        {SortOptions.map(
                            (
                                item: { text: string; value: string },
                                index: number
                            ) => (
                                <MenuItem key={index} value={index}>
                                    {item.text}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                </Box>
                <Box px="1rem" minWidth={200}>
                    <TextField
                        select
                        fullWidth
                        label="Sort Direction"
                        value={localFilter.desc}
                        onChange={(event) => {
                            setLocalFilter((prev: LocalFilter) => ({
                                ...prev,
                                desc: Number(event.target.value),
                            }));
                        }}
                    >
                        {SortDirectionOptions.map(
                            (
                                item: { text: string; value: boolean },
                                index: number
                            ) => (
                                <MenuItem key={index} value={index}>
                                    {item.text}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                </Box>
            </Box>
            <Box
                py="1rem"
                px="0.75rem"
                display="flex"
                flexWrap="wrap"
                flexDirection="row-reverse"
            >
                <Box px="1rem">
                    <Button variant="contained" onClick={onClearClicked}>
                        clear
                    </Button>
                </Box>
                <Box px="1rem">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onFilterClicked}
                    >
                        Filter
                    </Button>
                </Box>
            </Box>
        </>
    );
}
