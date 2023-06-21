from PyPDF2 import PdfReader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS 
from apikey import apikey
import os
import re

os.environ['OPENAI_API_KEY'] = apikey

doc_reader = PdfReader('./documents/mapsOfMeaning.pdf')

# read data from the file and put them into a variable called raw_text
raw_text = ''
for i, page in enumerate(doc_reader.pages):
    text = page.extract_text()
    if text:
        raw_text += text

len(raw_text)
raw_text[:100]

print(len(raw_text))
print("RawText:-->")
print('-----------------------')
print(raw_text[:100])

# Splitting up the text into smaller chunks for indexing
text_splitter = CharacterTextSplitter(        
    separator = "\n",
    chunk_size = 1000,
    chunk_overlap  = 200, #striding over the text
    length_function = len,
)
texts = text_splitter.split_text(raw_text)
print(len(texts))
print("TextSplitter:-->")
print("array:-->")
print(texts[10])
print(texts[20])


# Download embeddings from OpenAI
embeddings = OpenAIEmbeddings()
docsearch = FAISS.from_texts(texts, embeddings)

docsearch.embedding_function


query = "what is reality made up of?"
docs = docsearch.similarity_search(query)

# print(len(docs))
# print("Docs:-->")
# print("------------------------")
# print("------------------------")
# print("------------------------")
# print("------------------------")
# print(docs[0])
# print(type(docs[0]))
# print(docs[0].__dict__)
# print("------------------------")
# print("------------------------")
# print("------------------------")
# print("------------------------")
# print(docs[1])
# print(type(docs[1]))
# print(docs[1].__dict__)
# print("------------------------")
# print("------------------------")
# print("------------------------")
# print("------------------------")
# print(docs[2])
# print(type(docs[2]))
# print(docs[2].__dict__)
# print("------------------------")
# print("------------------------")
# print("------------------------")
# print("------------------------")
# print(docs[3])
# print(type(docs[3]))
# print(docs[3].__dict__)
print("DocsArray[0]:-->")


def remove_unwanted_parts(items):
    cleaned_items = []
    i=0
    for item in items:
        # Use the `page_content` attribute that holds the actual text
        text = item.page_content
        # Remove 'page_content='
        cleaned_item = re.sub(r'^page_content=', '', text)
        # Remove '\n' breaks
        cleaned_item = cleaned_item.replace('\n', '')
        # Remove 'metadata={}'
        cleaned_item = re.sub(r'metadata={.*?}', '', cleaned_item)
        cleaned_items.append(cleaned_item)
        print(cleaned_items[i])
        print("------------------------")
        i = i+1
    return cleaned_items

remove_unwanted_parts(docs)