import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setProject(config.appwriterPojectId);
    this.account = new Account(this.client);
  }

  // Craete account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password })
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service is :: createAccount :: error", error);
    }
    return null
  }

  // Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service is :: createAccount :: error", error);
    }
    return null;
  }

  // Get current user
  async getCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service is :: getCurrentUser :: error", error);
    }
    return null;
  }

  // Logout
  async logoutUser() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service is :: logoutUser :: error", error);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService