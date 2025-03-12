require("dotenv").config();
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

class BlobStorageService {
  constructor() {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    this.containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

    if (!accountName || !accountKey || !this.containerName) {
      throw new Error("Azure storage configuration is missing.");
    }

    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey
    );
    this.blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      sharedKeyCredential
    );

    this.containerClient = this.blobServiceClient.getContainerClient(
      this.containerName
    );
  }


  async ensureContainerExists() {
    try {
      const exists = await this.containerClient.exists();
      if (!exists) {
        await this.containerClient.create({ access: "container" });
        console.log(`Container ${this.containerName} created.`);
      }
    } catch (error) {
      console.error("Error ensuring container exists:", error);
      throw new Error("Failed to ensure Azure Blob Storage container exists.");
    }
  }
  
  async uploadFileToBlobStorage(fileName, fileBuffer, mimeType) {
    try {
      await this.ensureContainerExists(); 

      const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
      await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: { blobContentType: mimeType },
      });

      console.log(`File uploaded: ${blockBlobClient.url}`);
      return blockBlobClient.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file to Azure Blob Storage.");
    }
  }
}
module.exports = new BlobStorageService();
