from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb
import uuid

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="resume_data"
)

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def create_chunks(text):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    return splitter.split_text(text)


def store_chunks(chunks):

    collection.add(
        ids=[str(uuid.uuid4()) for _ in chunks],
        documents=chunks
    )


def retrieve_context(question):

    results = collection.query(
        query_texts=[question],
        n_results=5
    )

    context = "\n".join(
        results["documents"][0]
    )

    return context