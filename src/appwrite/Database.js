import conf from "../conf/conf.js";
import { Client, ID, TablesDB, Storage,Account } from "appwrite";
import { Query } from "appwrite";
export class Services {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.projectId);

    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client);
  }

  async createPatient({ name, age, gender, featuredimage, heatmapimage,contactno, email, symptoms, medicalhistory,result,confidence,stonesize,stone_size_mm }) {
    try {

    const user = await this.account.get();

      return await this.tablesDB.createRow({
        databaseId: conf.databaseId,
        tableId: conf.tableId,
        rowId: ID.unique(),
        data: { name, age, gender, featuredimage,heatmapimage, contactno, email, symptoms, medicalhistory,result,confidence,stonesize, stone_size_mm,       userid: user.$id    },
      });
    } catch (error) {
      console.log("Appwrite Service :: createPatient :: error", error);
      throw error;
    }
  }

  async deletePost(rowId) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.databaseId,
        tableId: conf.tableId,
        rowId: rowId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(rowId) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.databaseId,
        tableId: conf.tableId,
        rowId: rowId,
      });
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error", error);
      return null;
    }
  }


async getPatients(diagnosis, page = 1, limit = 10) {
  try {

    const user = await this.account.get();

    let queries = [
      Query.limit(limit), // ✅ kitne records chahiye
      Query.offset((page - 1) * limit), // ✅ pagination logic
      Query.orderDesc("$createdAt") ,// ✅ latest records first
       Query.equal("userid", user.$id)
    ];

    // ✅ filter by diagnosis
    if (diagnosis && diagnosis !== "All") {
      queries.push(Query.equal("result", diagnosis));
    }

    const response = await this.tablesDB.listRows({
      databaseId: conf.databaseId,
      tableId: conf.tableId,
      queries
    });

    return response;

  } catch (error) {
    console.log("Appwrite Service :: getPatients :: error", error);
    return null;
  }
}





 

  async uploadImage(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.bucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Appwrite Service :: uploadImage :: error", error);
      return null;
    }
  }

 async deletePost(id) {
  try {
    await this.tablesDB.deleteRow({
      databaseId: conf.databaseId,
      tableId: conf.tableId,
      rowId: id
    });

    return true;

  } catch (error) {
    console.log("Delete error:", error);
  }
}

 getFilePreview1(fileId) {
  const result = this.bucket.getFileDownload({
    bucketId: conf.bucketId,
    fileId: fileId,
  });

 return result.toString();   // important
}

async createAccount({ email, password, name }) {
  try {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );

    return userAccount;

  } catch (error) {
    console.error("Appwrite :: createAccount :: error", error);
    throw error;
  }
}

  async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession({
            email: email,
            password: password
        });

    } catch (error) {
        throw error;
    }
}
async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

async loginWithGoogle() {
  try {
    this.account.createOAuth2Session(
      "google",
      "http://localhost:5173/",   // success redirect
      "http://localhost:5173/AuthPage" // failure redirect
    );
  } catch (error) {
    console.log("Google login error:", error);
  }
}
async forgotPassword(email) {
  try {
    return await this.account.createRecovery(
      email,
      "http://localhost:5173/reset-password"
    );
  } catch (error) {
    console.log("Forgot password error:", error);
    throw error;
  }
}

async resetPassword(userId, secret, password) {
  try {
    return await this.account.updateRecovery(
      userId,
      secret,
      password
    );
  } catch (error) {
    console.log("Reset password error:", error);
    throw error;
  }
}

  

    
}

const services = new Services();
export default services;