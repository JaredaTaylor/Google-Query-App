# credit: https://stackoverflow.com/questions/38619478

# INSTALLs
# pip install "fastapi[all]"
# pip install bs4

# RUNs
# uvicorn main:app --reload
# http://127.0.0.1:8000/docs

from bs4 import BeautifulSoup
import urllib.request
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def _convert(query):
    assert query
    return 'https://google.com/search?q=' + '+'.join(query.split())


def search(query):
    url = _convert(query)

    # Perform the request
    request = urllib.request.Request(url)

    # Set a normal User Agent header, otherwise Google will block the request.
    request.add_header('User-Agent',
                       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    raw_response = urllib.request.urlopen(request).read()

    # Read the repsonse as a utf-8 string
    html = raw_response.decode("utf-8")

    # The code to get the html contents here.

    soup = BeautifulSoup(html, 'html.parser')

    # Find all the search result divs
    divs = soup.select("#search div.g")
    res = []  # results
    for div in divs:
        # Search for a h3 tag
        results = div.select("h3")
        desc = div.select('.VwiC3b', first=True)
#         results = div.select('.IsZvec')

#         if (len(results) >= 1):
#             h3 = results[0]
#             res.append(h3.get_text())
        for d in desc:
            res.append(d.text)
    return res


#search('best coffee')


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/search/{query}")
def search_api(query: str):
    return search(query)
