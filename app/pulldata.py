import requests
from bs4 import BeautifulSoup as bs
import pandas as pd
import re


def next_page(soup):
    if not soup.find(
        "a",
        {
            "class": "internalLink nuxt-link-exact-active nuxt-link-active no-button pagination-nav text disabled"
        },
    ) and soup.find("div", {"class": "pagination clickable"}):
        next_link = page.find(
            "a",
            {
                "class": "internalLink nuxt-link-active no-button pagination-nav text active"
            },
        )
        if next_link:
            return next_link.get("href")
        else:
            next_link = page.find(
                "a", {"class": "internalLink no-button pagination-nav text active"}
            )
            return next_link.get("href")
    else:
        return False


def make_new_path(name):
    if name:
        return "https://www.yad2.co.il/" + name
    else:
        return False


def scrap_info(soup):
    dico = {"city": [], "price": [], "size": [], "rooms": [], "floor": []}
    items = soup.find_all("div", {"class": "feeditem"})
    for item in items:
        if item.find("div", {"class": "data rooms-item"}):
            dico["rooms"].append(item.find("div", {"class": "data rooms-item"}).text)
        if item.find("div", {"class": "data floor-item"}):
            dico["floor"].append(item.find("div", {"class": "data floor-item"}).text)
        if item.find("div", {"class": "data SquareMeter-item"}):
            dico["size"].append(
                item.find("div", {"class": "data SquareMeter-item"}).text
            )
        if item.find("div", {"data-test-id": "item_price"}):
            dico["price"].append(
                (
                    (
                        (item.find("div", {"data-test-id": "item_price"}).text).split(
                            "\n"
                        )[1]
                    ).strip()
                )
            )
        if item.find("span", {"class": "subtitle"}):
            dico["city"].append((item.find("span", {"class": "subtitle"}).text))
    return dico


def remove_nonnumeric(s):
    return re.sub(r"\D", "", s)


def dafult_parmaters():
    rooms_start = 2
    rooms_end = 5
    Price_until = 1000000
    end_price = 3000000
    url = "https://www.yad2.co.il/realestate/forsale?propertyGroup=apartments&"
    url += "city=5000"
    url += f"&rooms={rooms_start}-{rooms_end}"
    url += f"&price={Price_until}-{end_price}"
    return url


def df_change_columes(df: pd.DataFrame):
    df["rooms"] = df["rooms"].apply(remove_nonnumeric)
    df["price"] = df["price"].apply(remove_nonnumeric)
    df["price"] = df["price"].astype(int)
    df["rooms"] = df["rooms"].astype(int)
    return df


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    "Referer": "https://www.yad2.co.il",
    "DNT": "1",
    "Accept-Language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
}


with requests.session() as session:
    url = dafult_parmaters()
    respones = session.get(url, headers=headers)
    page = bs(respones.text, "html.parser")
    scrapping_info = scrap_info(page)
    pages_wanted: int = 6
    current_page: int = 0
    while next_page(page) and current_page < pages_wanted:
        respones = session.get(make_new_path(next_page(page)), headers=headers)
        page = bs(respones.text, "html.parser")
        info = scrap_info(page)
        scrapping_info["city"].extend(info["city"])
        scrapping_info["price"].extend(info["price"])
        scrapping_info["size"].extend(info["size"])
        scrapping_info["rooms"].extend(info["rooms"])
        scrapping_info["floor"].extend(info["floor"])
        current_page += 1
    df = pd.DataFrame(scrapping_info)
    df = df_change_columes(df)
    df.index.name = "index"
    df.to_csv("data.csv")
