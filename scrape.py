import selenium.webdriver as webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
def scrape_website(url):
  print("Launching Chrome browser...")

  chrome_driver_path = "./chromedriver"
  options = webdriver.ChromeOptions()
  driver = webdriver.Chrome(service=Service(chrome_driver_path), options=options)

  try:
    driver.get(url)
    print("Website loaded successfully")
    html = driver.page_source

    return html
  except  Exception as e:
    print(f"Error loading website: {e}")
  finally:
    driver.quit()
    print("Browser closed")

def extract_text(html):
  soup = BeautifulSoup(html, "html.parser")
  body = soup.body

  if body:
    return str(body)
  return ""

def clean_text(text):
  soup = BeautifulSoup(text, "html.parser")

  for script_and_style in soup(["script", "style"]):
    script_and_style.extract()

  clean_text = soup.get_text(separator="\n")
  clean_text = "\n".join(line.strip() for line in clean_text.splitlines() if line.strip())

  return clean_text

def split_into_sections(text, max_length=6000):
  return [
    text[i: i + max_length] for i in range(0, len(text), max_length)
  ]