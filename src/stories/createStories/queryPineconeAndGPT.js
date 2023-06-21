
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { ConversationChain } from "langchain/chains";
import { Document } from "langchain/document";

console.log('in create file');

export const queryPineconeVectorStoreAndQueryLLM = async ( client, indexName, question) => {
  console.log("Querying Pinecone vector store...");
  
  const index = client.Index(indexName);
  
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);
  
  let queryResponse = await index.query({
    queryRequest: {
      topK: 20,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    },
  });
  console.log(`Found ${queryResponse.matches.length} matches...`);
  console.log(queryResponse.matches);
  console.log(`Asking question: ${question}...`);

  if (queryResponse.matches.length) {
    const llm = new OpenAI({temperature:0.7, model:"gpt-3.5-turbo-16k", max_tokens:15000, verbose: true});
    const chain = ConversationChain(llm);
    
    const concatenatedPageContent = queryResponse.matches
      .map((match) => match.metadata.pageContent)
      .join(" ");
    
      const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question: question,
    });
    
    console.log(`Answer: ${result.text}`);
  } 
  else {
    console.log("Since there are no matches, GPT-3 will not be queried.");
  }
};