import streamlit as st
from scrape import scrape_website, extract_text, clean_text, split_into_sections

st.title("Website Analyzer")
url = st.text_input("Enter the URL of a website:")

if st.button("Scrape Website"):
  st.write("Scraping website...")
  result = scrape_website(url)

  body_text = extract_text(result)
  cleaned_text = clean_text(body_text)
  st.session_state.dom_content = cleaned_text

  with st.expander("View DOM Content"):
    st.text_area("DOM Content", cleaned_text, height=300)
  print(result)

