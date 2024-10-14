import { getAPI, postAPI, putAPI, deleteAPI } from "./APIServices";

export const getTicketsList = async (page: number, size = 10) => {
    const res = await getAPI(`ticket`)
    console.log("JJJJ", res)
    if (res.status === 200) {
        return {
            success: true,
            data: res.data,
        };
    } else {
        return {
            success: false,
            message: 'Failed to retrieve tickets.',
            status: res.status,
        };
    }
}