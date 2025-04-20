# recommender/engine.py
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import os

CSV_PATH = os.path.join(os.path.dirname(__file__), 'projects_dataset.csv')

df = pd.read_csv(CSV_PATH)
df.fillna('', inplace=True)
df['Domain'] = df['Domain'].str.lower().str.strip()
df['Keywords'] = df['Keywords'].str.lower().str.strip()
df['Description'] = df['Description'].str.lower().str.strip()
df['Complexity'] = df['Complexity'].str.lower().str.strip()
df['combined_text'] = df['Domain'] + ' ' + df['Keywords'] + ' ' + df['Description']

model = SentenceTransformer('all-MiniLM-L6-v2')
project_embeddings = model.encode(df['combined_text'].tolist(), convert_to_numpy=True)
project_embeddings = project_embeddings.astype('float32')
project_embeddings /= np.linalg.norm(project_embeddings, axis=1, keepdims=True)

dimension = project_embeddings.shape[1]
faiss_index = faiss.IndexFlatIP(dimension)
faiss_index.add(project_embeddings)

def recommend_projects(query, top_n=5, domain_filter=None, complexity_filter=None):
    query = query.lower().strip()
    query_embedding = model.encode([query], convert_to_numpy=True).astype('float32')
    query_embedding /= np.linalg.norm(query_embedding, axis=1, keepdims=True)
    similarity_scores, indices = faiss_index.search(query_embedding, len(df))

    mask = pd.Series([True] * len(df))
    if domain_filter:
        mask &= df['Domain'] == domain_filter.lower()
    if complexity_filter:
        mask &= df['Complexity'] == complexity_filter.lower()

    filtered_indices = mask[mask].index.tolist()
    ranked = [i for i in indices[0] if i in filtered_indices][:top_n]

    result = df.loc[ranked, ['Title', 'Complexity', 'Domain', 'Keywords', 'Description']]
    return result.to_dict(orient='records')
