import React, { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
    Add: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <AddBox {...props} ref={ref} />
    )),
    Check: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <Check {...props} ref={ref} />
    )),
    Clear: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <Clear {...props} ref={ref} />
    )),
    Delete: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <DeleteOutline {...props} ref={ref} />
    )),
    DetailPanel: forwardRef(
        (props, ref: React.Ref<SVGSVGElement> | undefined) => (
            <ChevronRight {...props} ref={ref} />
        )
    ),
    Edit: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <Edit {...props} ref={ref} />
    )),
    Export: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <SaveAlt {...props} ref={ref} />
    )),
    Filter: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <FilterList {...props} ref={ref} />
    )),
    FirstPage: forwardRef(
        (props, ref: React.Ref<SVGSVGElement> | undefined) => (
            <FirstPage {...props} ref={ref} />
        )
    ),
    LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <LastPage {...props} ref={ref} />
    )),
    NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <ChevronRight {...props} ref={ref} />
    )),
    PreviousPage: forwardRef(
        (props, ref: React.Ref<SVGSVGElement> | undefined) => (
            <ChevronLeft {...props} ref={ref} />
        )
    ),
    ResetSearch: forwardRef(
        (props, ref: React.Ref<SVGSVGElement> | undefined) => (
            <Clear {...props} ref={ref} />
        )
    ),
    Search: forwardRef((props, ref: React.Ref<SVGSVGElement> | undefined) => (
        <Search {...props} ref={ref} />
    )),
    SortArrow: forwardRef(
        (props, ref: React.Ref<SVGSVGElement> | undefined) => (
            <ArrowDownward {...props} ref={ref} />
        )
    ),
    ThirdStateCheck: forwardRef(
        (props, ref: React.Ref<SVGSVGElement> | undefined) => (
            <Remove {...props} ref={ref} />
        )
    ),
    ViewColumn: forwardRef(
        (props, ref: React.Ref<SVGSVGElement> | undefined) => (
            <ViewColumn {...props} ref={ref} />
        )
    ),
};

export default tableIcons;
