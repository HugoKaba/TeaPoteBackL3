from bs4 import BeautifulSoup
import urllib.request


# Récup liens d'une page
def parse_list(soup):
    tea_links = []

    tea_links_div = soup.find("ol")
    h2 = tea_links_div.find_all("h2")

    for h2 in h2:
        tea_link = h2.find("a").get('href')
        tea_links.append(tea_link)

    return tea_links



