import urllib.request
from bs4 import BeautifulSoup

# read the URL
text = urllib.request.urlopen(
    "https://www.laroutedescomptoirs.com/fr/thes-noirs/1034-19245-original-breakfast.html#/19-conditionnements"
    "-sachet_100_g")
# text_bytes = soup.read()
soup = BeautifulSoup(text.read(), "html.parser")
# print(soup.prettify())
main_soup = soup.find(id="main")

name = main_soup.find(itemprop="name").get_text()
print(name)

price = main_soup.find(itemprop="price").get_text()
print(price)

image = main_soup.find(attrs={"class": "product-cover"}).find("img").get("src")
print(image)

specifications = ["infusionTime", "temperature", "tastingMoment", "theineRate"]

for specification in specifications:
    info = main_soup.find(attrs={"class": specification})
    info_value = info.find("span", attrs={"class": "feature-value"}).get_text()
    print(info_value + "\n")

product_description = main_soup.find(attrs={"class": "product-description"}).find_all("p")

for product_description in product_description:
    product_description = product_description.get_text()
    print(product_description + "\n")