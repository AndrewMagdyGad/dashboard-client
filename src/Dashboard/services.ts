import { IParams } from "./interfaces";

export class Services {
    static baseUrl = process.env.REACT_APP_API_URL;

    /**
     * upload csv file
     * @param file
     */
    static uploadFile = async (file: File) => {
        const url = `${Services.baseUrl}/data/upload`;
        const data = new FormData();
        data.append("file", file);

        const requestOptions = { method: "POST", body: data };
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        return { response, responseData };
    };

    /**
     * list data with pagination, search and sort
     * @param payload
     */
    static getData = async (payload: IParams) => {
        const url = new URL(`${Services.baseUrl}/data`);
        const params: string[][] = [];

        Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                params.push([key, value]);
            }
        });

        url.search = new URLSearchParams(params).toString();
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(String(url), requestOptions);
        const responseData = await response.json();
        return { response, responseData };
    };

    /**
     * update goal value for a particular row
     * @param id of row
     * @param goalValue
     */
    static updateGoalValue = async (id: string, goalValue: number) => {
        const url = `${Services.baseUrl}/data/${id}`;

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ goalValue }),
        };
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        return { response, responseData };
    };

    /**
     * deleta a particular row
     * @param id of row
     */
    static deleteById = async (id: string) => {
        const url = `${Services.baseUrl}/data/${id}`;

        const requestOptions = { method: "DELETE" };
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        return { response, responseData };
    };

    /**
     * delete all dataset
     */
    static deleteAll = async () => {
        const url = `${Services.baseUrl}/data/delete-all`;

        const requestOptions = { method: "DELETE" };
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        return { response, responseData };
    };
}
