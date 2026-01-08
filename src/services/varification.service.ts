import api from "./api.service";

export const verifyUser = async (): Promise<boolean> => {
   try {
      const res = await api.get('/api/verify');
      return res.status === 200;
   } catch {
      return false;
   }
};
export const verifyAdmin = async (): Promise<boolean> => {
   try {
      const res = await api.get('/api/verify');
      return res.status === 200;
   } catch {
      return false;
   }
};