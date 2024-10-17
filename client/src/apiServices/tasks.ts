import { getAPI, postAPI, putAPI, deleteAPI } from "./APIServices";

export const getTicketsList = async (page: number, pageSize = 10) => {
    if (!page) {
        return 
    }
    const res = await getAPI(`ticket`, { page, pageSize })
    console.log("JJJJ", res)
    if (res.status === 200) {
        return res.data as PaginatedResponseType;
    } else {
        throw new Error(`Error fetching tickets: ${res.error || 'Unknown error'}`);
    }
}

interface PostNewTicketData {
    description: string,
    status: "Closed" | "Open"
}

export const postNewTicket = async (data: PostNewTicketData) => {
    const res = await postAPI("ticket", data)
    if (res.status === 201) {
        console.log("rrrs", res)
        return res.data as Ticket;
    } else {
        throw new Error(`Error fetching tickets: ${res.error || 'Unknown error'}`);
    }
}

export const deleteTicket = async (id: string) => {
    const res = await deleteAPI(`ticket/${id}`)
    if (res.status === 204) {
        console.log("rrrs", res)
        return res.data;
    } else {
        throw new Error(`Error fetching tickets: ${res.error || 'Unknown error'}`);
    }
}

export const updateTicket = async (id: string, data: PostNewTicketData) => {
    const res = await putAPI(`ticket/${id}`, data);
    if (res.status === 204) {
        console.log("rrrs", res)
        return res.data;
    } else {
        throw new Error(`Error fetching tickets: ${res.error || 'Unknown error'}`);
    }
}

export const searchForTickets = async (searchValue: string) => {
    if (!searchValue.trim()) return [];
    const res = await getAPI("search", { searchValue });
    if (res.status === 200) {
        console.log("rrrs", res)
        return res.data as Ticket[];
    } else {
        throw new Error(`Error fetching tickets: ${res.error || 'Unknown error'}`);
    }
}