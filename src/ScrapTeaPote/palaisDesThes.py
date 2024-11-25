import urllib.request
from bs4 import BeautifulSoup
import re
from itertools import chain

countries_list = [
    "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Antigua-et-Barbuda",
    "Arabie Saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn",
    "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie",
    "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge",
    "Cameroun", "Canada", "Cap-Vert", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo-Brazzaville",
    "Congo-Kinshasa", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d'Ivoire", "Croatie", "Cuba",
    "Danemark", "Djibouti", "Dominique", "Égypte", "Émirats Arabes Unis", "Équateur", "Érythrée", "Espagne",
    "Estonie", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Ghana",
    "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée-Bissau", "Guinée équatoriale", "Guyana", "Haïti",
    "Honduras", "Hongrie", "Îles Cook", "Îles Marshall", "Inde", "Indonésie", "Irak", "Iran", "Irlande",
    "Islande", "Israël", "Italie", "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan",
    "Kiribati", "Koweït", "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein",
    "Lituanie", "Luxembourg", "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali",
    "Malte", "Maroc", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie",
    "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Niue",
    "Norvège", "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", "Palaos", "Palestine",
    "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne",
    "Portugal", "Qatar", "République centrafricaine", "République dominicaine", "République tchèque",
    "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Saint-Kitts-et-Nevis", "Saint-Marin",
    "Saint-Vincent-et-les-Grenadines", "Taïwan",
    "Sainte-Lucie", "Salomon", "Salvador", "Samoa", "São Tomé-et-Príncipe", "Sénégal", "Serbie", "Seychelles",
    "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka",
    "Suède", "Suisse", "Suriname", "Swaziland", "Syrie", "Tadjikistan", "Tanzanie", "Tchad", "Thaïlande",
    "Timor oriental", "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu",
    "Ukraine", "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Yémen", "Zambie", "Zimbabwe"
]

tea_type_list = [" noir", " vert", " blanc", "rooïbos", "infusion", "matcha", "maté", "oolong", " sombre",
                 " fumé"]

ingredients_list = []
tea_countries = []
tea_types = []
timer_value_min = ""
timer_value_max = ""
temperature_value = ""


def parse_tea_from_url(url) -> dict:
    url_current = urllib.request.urlopen(url)
    soup = BeautifulSoup(url_current, "html.parser")
    return parse_tea(soup, url)


def parse_tea(soup: BeautifulSoup, url: str) -> dict | str:
    """
    Parse the tea from the soup
    :param url: url of the tea
    :param soup: html of the tea page parsed
    :return:
    """
    global tea_types, tea_countries, tea_type_list

    print("parse_tea")
    main_soup = soup.find(class_="product-wrapper")

    if main_soup is None:
        return "Main soup not found on " + url
    print(url)

    is_bio = False
    tips = ""
    moment_value = []
    img = []

    # Get tea name
    name_soup = main_soup.find(itemprop="name")
    if name_soup is None:
        return "No Name for " + url
    name = name_soup.get_text()
    print("name : " + name)

    # if tea name contains "coffret", return failure
    if "coffret" in name.lower() or "théothèque" in name.lower():
        return name

    # Get image url
    img_div = main_soup.find("div", class_="gallery-placeholder")
    if img_div is not None:
        images = main_soup.find("div", class_="gallery-placeholder").find_all("img")
        for image in images:
            image_url = image["src"]
            img.append(image_url)

    # Get tea caption for tea types
    caption = main_soup.find(itemprop="caption")
    if caption is not None:
        parse_tea_types(caption, name)

    specifications = main_soup.find_all("p", class_="additional-item-wrapper")
    if len(specifications) > 1:

        # Get timer value
        timer = specifications[0]
        parse_time(timer)

        # Get Temperature value
        temperature = specifications[2]
        parse_temperature(temperature)

        for specification in specifications:
            print("specification : " + specification.get_text())

        if len(specifications) >= 4:
            moment = specifications[3]
            moment_value = moment.find("span", class_="value").get_text()

    # Get if tea is bio or not
    bio_label = main_soup.find('img', alt="Agriculture Biologique")
    if bio_label:
        is_bio = True

    attributs = main_soup.find_all("div", class_="product-attribute-wrapper")

    for attribut in attributs:
        title = attribut.find(attrs={"data-role": "title"})
        content = attribut.find(attrs={"data-role": "content"})
        if title is not None:
            if content is not None:

                # Get all information about tea
                if ("Description" in title or "Suggestion de préparation" in title or
                        "Accord thé et mets" in title):
                    tips += title.get_text() + " : \n " + content.get_text() + ' \n '

                elif "Ingrédients" in title:
                    parse_ingredients_countries(content)

                elif "Spécificités" in title:
                    parse_specificity(content)

    tea_types = [tea_type.strip() for tea_type in tea_types]
    data = {
        "name": name,
        "Tea Type": tea_types,
        "TempMax": temperature_value,
        "TempMin": temperature_value,
        "TimerMax": timer_value_max,
        "TimerMin": timer_value_min,
        "is_bio": is_bio,
        "country": tea_countries,
        "tip": tips,
        "moment": moment_value,
        "images": img,
        'ingredients': ingredients_list,
    }
    print(data)

    return {
        "name": name,
        "Tea Type": tea_types,
        "TempMax": temperature_value,
        "TempMin": temperature_value,
        "TimerMax": timer_value_max,
        "TimerMin": timer_value_min,
        "is_bio": is_bio,
        "country": tea_countries,
        "tip": tips,
        "moment": moment_value,
        "images": img,
        'ingredients': ingredients_list,
    }


def parse_temperature(temperature) -> int:
    global temperature_value

    temperature_values = temperature.find("span", class_="value").get_text()
    if "ambiant" in temperature_values.lower():
        temperature_value = 0

    else:
        temperatures = re.findall(r'\d+', temperature_values)
        if temperatures:
            temperature_value = int(re.findall(r'\d+', temperature_values)[0])
    return temperature_value


def parse_tea_types(caption, name):
    caption = caption.get_text()

    print("caption : " + caption)

    if "matcha" in name.lower():
        tea_types.append(tea_type_list[5])
    for tea_type in tea_type_list:
        if tea_type in caption.lower():
            print("tea_type : " + tea_type)
            tea_types.append(tea_type)

    if "thé compressé" in caption.lower():
        tea_types.append(tea_type_list[8])


def parse_specificity(content):
    specificities = content.find_all("ul")
    if specificities:
        origin_ = specificities[0].get_text()
        couleur_ = specificities[1].get_text()
        if "Origine" in origin_:
            origins = re.split(r'\s*:\s*|\s*,\s*', origin_)
            for origin in origins[1:]:
                if origin in countries_list:
                    tea_countries.append(origin)
        if "Couleur" in couleur_:
            couleurs = couleur_.split(" :")
            for couleur in couleurs[1:]:
                ingredients_list.append(couleur.lower())


def parse_ingredients_countries(content):
    print("INGREDIENT")
    ingredients_div = content.get_text()
    print(ingredients_div)
    if ingredients_div is not None:
        ingredients = re.sub(r'\(\d+%\)', '', ingredients_div)
        ingredients = re.split(r',\s*(?![^()]*\))|\bet\b', ingredients)
        ingredients = [ingredient.strip('.').strip() for ingredient in ingredients]
        ingredient_without_brackets = [re.sub(r'\s*\([^)]*\)', '', ingredient).lower() for ingredient in
                                       ingredients]
        brackets = []
        for ingredient in ingredients:
            ingredients_list.append(ingredient)
            bracket = re.findall(r'\(([^)]+)\)', ingredient)
            if bracket:
                bracket_split = bracket[0].split(", ")

                brackets.append(bracket_split)
        countries = list(chain.from_iterable(brackets))
        for country in countries:
            if country in countries_list:
                tea_countries.append(country)
        print("tea_countries : ")
        print(tea_countries)


def parse_time(timer):
    global timer_value_min, timer_value_max

    timer_value = timer.find("span", class_="value").get_text()

    timer_values = re.split(r"\s*-\s*", timer_value)
    if len(timer_values) <= 1:
        timer_values.append(timer_values[0])
    if all(timer_value.strip() for timer_value in timer_values):

        converted_values = []
        if timer_values:
            for timer_value in timer_values:
                parts = re.split(r"'", timer_value)
                if len(parts) == 1:
                    parts.append('0')

                for i, part in enumerate(parts):
                    try:
                        int(part)
                    except ValueError:
                        parts[i] = 0
                minutes = int(parts[0])
                seconds = int(parts[1]) if parts[1] else 0

                total_seconds = minutes * 60 + seconds
                converted_values.append(total_seconds)
        if any(converted_values):
            timer_value_min = converted_values[0]
            timer_value_max = converted_values[1]
        print("timer_value : " + str(timer_value_min) + ", " + str(timer_value_max))


if __name__ == "__main__":
    parse_tea_from_url("https://www.palaisdesthes.com/fr/butterfly-of-taiwan-fr.html")
