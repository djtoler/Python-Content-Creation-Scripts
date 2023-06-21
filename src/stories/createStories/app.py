import os
from apikey import apikey

import streamlit     as st
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SimpleSequentialChain, SequentialChain
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI


os.environ['OPENAI_API_KEY'] = apikey

st.title('YouTube GPT Story Creator')
prompt = st.text_input('Plug in you prompt here')

title_template = PromptTemplate(
    input_variables = ['topic'],
    template='write me a youtube video title about {topic}'
)

script_template = PromptTemplate(
    input_variables = ['title'],
    template='write me a youtube video script of about 5000 words based on this title TITLE: {title}. Please note, that the 5000 word count is very important. It needs to be 5000 words, gve or take about 200 words. Please respond with and message of i cant if you cant get me approximatly 5000 words. Also, count and print the number of words contained in every paragrap'
)


memory = ConversationBufferMemory(input_key='topic', memory_key='chat_history')


llm = ChatOpenAI(temperature=0.9, model_name="gpt-3.5-turbo-16k", max_tokens=15000)
title_chain = LLMChain(llm=llm, prompt=title_template, verbose=True, output_key='title', memory=memory)
script_chain = LLMChain(llm=llm, prompt=script_template, verbose=True, output_key='script', memory=memory)
sequential_chain = SequentialChain(chains=[title_chain, script_chain], input_variables=['topic'], output_variables=['title', 'script'], verbose=True)

if prompt:
    response = sequential_chain({'topic':prompt})
    st.write(response['title'])
    st.write(response['script'])

    with st.expander('Message History'):
        st.info(memory.buffer)