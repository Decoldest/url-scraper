import streamlit as st
from scrape import scrape_website, extract_text, clean_text, split_into_sections
from parse import gemini_parse
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Check for Gemini API key
if not os.getenv('GEMINI_API_KEY'):
    st.error("Gemini API key not found. Please set the GEMINI_API_KEY environment variable.")
    st.stop()

st.set_page_config(page_title="Website Content Analyzer", page_icon="🔍")
st.title("Website Content Analyzer 🔍")

# Add some instructions
st.markdown("""
This app allows you to:
1. Scrape content from any website
2. Ask questions about the content
3. Get AI-powered responses using Google's Gemini
""")

url = st.text_input("Enter the URL of a website:", placeholder="https://example.com")

if st.button("Scrape Website", type="primary"):
    with st.spinner("Scraping website..."):
        try:
            result = scrape_website(url)
            if result:
                body_text = extract_text(result)
                cleaned_text = clean_text(body_text)
                st.session_state.dom_content = cleaned_text
                st.success("Website scraped successfully!")
                
                with st.expander("View scraped content"):
                    st.text_area("Content", cleaned_text, height=300)
            else:
                st.error("Failed to scrape the website. Please check the URL and try again.")
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")

if "dom_content" in st.session_state:
    st.markdown("---")
    
    # Add radio button for analysis type
    analysis_type = st.radio(
        "Choose analysis type:",
        ["Custom Analysis", "Classify Visitors"],
        horizontal=True
    )
    
    if analysis_type == "Custom Analysis":
        parse_instructions = st.text_area(
            "What would you like to know about this website?",
            placeholder="Example: What are the main products mentioned on this page?"
        )
    else:
        parse_instructions = "Analyze the content and classify the target visitors or audience of this website based on their interests, industry, or demographic. Provide a clear, concise list of the main visitor segments."
        st.info("This will analyze and classify the website's target audience segments.")
    
    if st.button("Analyze", type="primary"):
        if parse_instructions:
            with st.spinner("Analyzing content..."):
                try:
                    dom_chunks = split_into_sections(st.session_state.dom_content)
                    result = gemini_parse(dom_chunks, parse_instructions)
                    st.markdown("### Analysis Result:")
                    st.write(result)
                except Exception as e:
                    st.error(f"An error occurred during analysis: {str(e)}")
        else:
            st.warning("Please enter your question first.")