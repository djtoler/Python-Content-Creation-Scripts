import { PineconeClient } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import * as dotenv from "dotenv";
import { createPineconeIndex } from "./createPineconeIndex.js";
import { updatePinecone } from "./updatePinecone.js";
import { queryPineconeVectorStoreAndQueryLLM } from "./queryPineconeAndGPT.js";

dotenv.config();

const loader = new DirectoryLoader("./documents", {
    ".txt": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
});
const docs = await loader.load();

const question = "what are the four means of escaping the terrible situation in which we all find ourselves.do not use anything from Nietzsche. use jordan peterson maps of meaning";
const indexName = "mapsofmeaning";
const vectorDimension = 1536;

const client = new PineconeClient();
await client.init({
  apiKey: '',
  environment: 'us-west1-gcp-free',
});

(async () => {

  await createPineconeIndex(client, indexName, vectorDimension);

  await updatePinecone(client, indexName, docs);

  await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);
})();