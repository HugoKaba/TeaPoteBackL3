import unittest

from bs4 import BeautifulSoup

from palaisDesThes import parse_tea

validhtml = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <titel>TEST</title>
</head>
<body>
<div class="product-wrapper">

    <div itemprop="name"></div>
    <div itemprop="caption">tea with plants leaves</div>
    <p class="additional-item-wrapper">
        <span class="value">c'est quoi</span>
    </p>
    <p class="additional-item-wrapper">
        <span>
            tea
        </span>
    </p>
    <p class="additional-item-wrapper">
        <span class="value">macron</span>
    </p>
    <p class="additional-item-wrapper">
        <span class="value">koui</span>
    </p>
    <img alt="" src=""/>
    <div class="product-attribute-wrapper">
        <div>
            <div data-role="title"Description></div>
            <div data-role="content"></div>
        </div>
    </div>
    <div class="product-attribute-wrapper">
        <div>
            <div data-role="title"></div>
            <div data-role="content"></div>
        </div> 
    </div>
</div>
</div>
</body>
</html>
        """

failureresponse = "TEST"


class MyTestCase(unittest.TestCase):
    def test_something(self):
        soup = BeautifulSoup(validhtml, "html.parser")

        tea = parse_tea(soup)
        print("tea")
        print(tea)
        print(validresponse)

        self.assertDictEqual(validresponse, tea)


if __name__ == '__main__':
    unittest.main()
