import { PageParams  } from "@/types/pagination.type";
export const initialPage:PageParams = {
     pagination: {
        page: 1,
        limit: 10
     },
    filters: [],
    sort: []
}