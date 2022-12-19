import httpService from "./httpService";

class UserService {
  getToken() {
    const ls: Storage | null = localStorage || null;
    const defaultToken: any = ls?.getItem("x-auth-token") || null;
    return defaultToken;
  }
  getUser() {
    return httpService.get("/user");
  }
  updateUser(data: any) {
    return httpService.put("/user", data);
  }
  changePassword(data: any) {
    const { repeatNewPassword, ...rest } = data;
    return httpService.put("/user/change-password", rest);
  }
}

export default new UserService();
