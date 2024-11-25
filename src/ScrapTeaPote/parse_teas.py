import json
from dataclasses import dataclass, field

from bs4 import BeautifulSoup
import urllib.request

from palaisDesThes import parse_tea_from_url
from parse_list import parse_list

tea_links = []
tea_data_list = []


@dataclass
class ParseTeaResult:
    success_teas: list[dict] = field(default_factory=list)
    failure_teas: list[str] = field(default_factory=list)

    def add_data_tea(self, tea: dict):
        if isinstance(tea, dict):
            print(self.success_teas)
            self.success_teas.append(tea)
            print(f"Successfully added tea {tea['name']}")
        elif isinstance(tea, str):
            self.failure_teas.append(tea)
            print(f"Failure")
        else:
            raise ValueError("Tea must be either a dict or a str")


def parse_teas(url="https://www.palaisdesthes.com/fr/thes/") -> ParseTeaResult:
    url_current = urllib.request.urlopen(url)
    soup = BeautifulSoup(url_current, "html.parser")
    parse_result = ParseTeaResult()
    main_soup = soup.find(id="amasty-shopby-product-list")

    # Add links to array
    for link in parse_list(main_soup):
        tea_links.append(link)

    next_page_btn = main_soup.find("li", {"class": "item pages-item-next"})

    # While there is a next page button, parse next page to get links
    if next_page_btn:
        print("Next Page found")
        next_page_link = next_page_btn.find("a").get('href')
        parse_teas(next_page_link)

    # When last page is reach
    else:
        # Navigate to each tea page for parsing
        for tea_link in tea_links:
            tea = parse_tea_from_url(tea_link)

            # Get results
            if tea is not None:
                parse_result.add_data_tea(tea)

        # Add success and failed parsing data to json
        with open('success_data.json', 'w', encoding='utf-8') as f:
            json.dump(parse_result.success_teas, f, ensure_ascii=False, indent=4)
        with open('failure_data.json', 'w', encoding='utf-8') as f:
            json.dump(parse_result.failure_teas, f, ensure_ascii=False, indent=4)

    return parse_result


parse_teas()
