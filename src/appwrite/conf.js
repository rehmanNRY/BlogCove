import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriterPojectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create Post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {
        title,
        content,
        featuredImage,
        status,
        userId,
      })
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  // Update Post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {
        title,
        content,
        featuredImage,
        status,
      })
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  // Delete Post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false
    }
  }

  // Get Post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false
    }
  }

  // Get Posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId,
        queries)
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false
    }
  }

  // File Upload Method
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file)
    } catch (error) {
      console.log("Appwrite service :: uplaodFile :: error", error);
      return false
    }
  }

  // File Delete Method
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(config.appwriteBucketId,
    fileId)
  }

}
const service = new Service();
export default service;