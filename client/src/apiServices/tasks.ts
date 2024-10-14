import { getAPI, postAPI, putAPI, deleteAPI } from "./APIServices";

export const getTicketsList = async (page: number, pageSize = 10) => {
    if (!page) return [];
    const res = await getAPI(`ticket`, { page, pageSize })
    console.log("JJJJ", res)
    if (res.status === 200) {
        return res.data;
    } else {
        return {
            error: true,
            message: 'Failed to retrieve tickets.',
            status: res.status,
        };
    }
}