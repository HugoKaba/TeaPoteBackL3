import unittest

from bs4 import BeautifulSoup

from palaisDesThes import parse_tea

validhtml = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TEST</title>
</head>
<body>
<div class="product-wrapper">
     <div class="gallery-placeholder">
        <img src="https://images.unsplash.com/photo-1718914761742-e3de09b13e55?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
             alt=""/>
    </div>
    <div itemprop="name">Matcha latte</div>
    <div itemprop="caption">Thé noir aux plantes </div>
    <p class="additional-item-wrapper">
        <span class="value">5' - 7'</span>
    </p>
    <p class="additional-item-wrapper">
        <span>tea</span>
    </p>
    <p class="additional-item-wrapper">
        <span class="value">80°C</span>
    </p>
    <p class="additional-item-wrapper">
        <span class="value">Soirée</span>
    </p>
    <img alt="Agriculture Biologique" src=""/>
    <div class="product-attribute-wrapper">
        <div>
            <div data-role="title">Description</div>
            <div data-role="content">Thé noir avec des plantes</div>
        </div>
    </div>
    <div class="product-attribute-wrapper">
        <div>
            <div data-role="title">Ingrédients</div>
            <div data-role="content">thé noir (68%) et thé vert (30%) (Chine, Inde, Vietnam, Sri Lanka, Java), fleurs de jasmin, arômes, pétales de souci.</div>
        </div> 
    </div>
</div>
</div>
</body>
</html>
        """
validresponse = {
    "name": 'Matcha latte',
    "Tea Type": ['matcha', 'noir'],
    "TempMax": 80,
    "TempMin": 80,
    "TimerMax": 420,
    "TimerMin": 300,
    "is_bio": True,
    "country": ["Chine", "Inde", "Vietnam", "Sri Lanka"],
    "tip": 'Description : \n Thé noir avec des plantes \n ',
    "moment": 'Soirée',
    "images": [
        'https://images.unsplash.com/photo-1718914761742-e3de09b13e55?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    "ingredients": ['thé noir', 'thé vert  (Chine, Inde, Vietnam, Sri Lanka, Java)', 'fleurs de jasmin', 'arômes',
                    'pétales de souci']
}

notvalidhtml = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Tea</title>
</head>
<body>
<div class="product-wrapper">
    <div class="gallery-placeholder">
        <img src=""
             alt=""/>
    </div>
    <div itemprop="name">Coffret Plants based tea</div>
    <div itemprop="caption">
        oolong tea with plants leaves
    </div>
    <p class="">
        <span class="value">
            5' - 7'
        </span>
    </p>
    <p class="">
        <span>
            tea
        </span>
    </p>
    <p class="">
        <span class="value">
            80°C
        </span>
    </p>
    <p class="">
        <span class="value">
            Soirée
        </span>
    </p>
    <img alt="Agriculture Biologique" src=""/>
    <div class="product-attribute-wrapper">
        <div>
            <div data-role="title">
                Description
            </div>
            <div data-role="content">
                Tea with plants
            </div>
        </div>
        <div>
            <div data-role="title">
                Ingrédients
            </div>
            <div data-role="content">
                thé noir (68%) et thé vert (30%) (Chine, Inde, Vietnam, Sri Lanka, Java), fleurs de jasmin, arômes,
                pétales de souci.
            </div>
        </div>
    </div>

</div>
</body>
</html>
"""

failure_response = "Coffret Plants based tea"

emptyhtml = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test Tea</title>
</head>
<body>
<div class="product-wrapper">
    <div class="gallery-placeholder">
        <img src=""
             alt=""/>
    </div>
    <div itemprop="name">tea</div>
    <div itemprop="caption">
         tea with plants leaves
    </div>
    <p class="">
        <span class="value">
        </span>
    </p>
    <p class="value">
        <span>
        oui
        </span>
    </p>
    <p class="">
        <span class="value">
        </span>
    </p>
    <p class="">
        <span class="value">
            
        </span>
    </p>
    <img alt="Agriculture Biologique" src=""/>
    <div class="">
        <div>
            <div data-role="title">
            </div>
            <div data-role="content">
                Tea with plants
            </div>
        </div>
        <div>
            <div data-role="title">
            </div>
            <div data-role="content">
            </div>
        </div>
    </div>

</div>
</body>
</html>
"""

empty_response = {
    "name": 'tea',
    "Tea Type": [],
    "TempMax": '',
    "TempMin": '',
    "TimerMax": '',
    "TimerMin": '',
    "is_bio": True,
    "country": [],
    "tip": '',
    "moment": [],
    "images": [''],
    "ingredients": []
}


class MyTestCase(unittest.TestCase):
    def test_valid(self):
        soup = BeautifulSoup(validhtml, "html.parser")
        tea = parse_tea(soup, "url")
        self.assertDictEqual(validresponse, tea)

    def test_not_valid(self):
        soup = BeautifulSoup(notvalidhtml, "html.parser")

        tea = parse_tea(soup, "url")

        self.assertEqual(failure_response, tea)

    def test_empty(self):
        soup = BeautifulSoup(emptyhtml, "html.parser")
        tea = parse_tea(soup, "url")
        self.assertDictEqual(empty_response, tea)


if __name__ == '__main__':
    unittest.main()
