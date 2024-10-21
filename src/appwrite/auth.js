import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor(){
      this.client.setProject(config.appwriterPojectId);
      this.account = new Account(this.client);
    }
    async createAccount({email, password, name}){
      const userAccount = await this.account.create(ID.unique(), email, password, name); 
      if(userAccount){
        // call another method to login
        return userAccount;
      } else{
        return userAccount;
      }
    }

    async login({email, password}){
      const userAccount = await this.account.createEmailPasswordSession(email, password);
      if(userAccount){
        // call another method to login
        return userAccount;
      } else{
        return userAccount;
      }
    }
}

const authService = new AuthService();

export default authService