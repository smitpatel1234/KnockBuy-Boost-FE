import type { PageParams } from "@/types/pagination.types";
export const initialPage: PageParams = {
   pagination: {
      page: 1,
      limit: 10
   },
   filters: [],
   sort: []
}