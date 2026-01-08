import api from "@/services/api.service"
import type { placeorder as PlaceOrderType } from "@/types/placeorder.type"
export const palceOrder=(placeorder:PlaceOrderType)=>{
  return api.post("/order/placeorder",placeorder)
}
 