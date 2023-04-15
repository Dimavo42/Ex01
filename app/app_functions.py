import pandas as pd



df = pd.read_csv("data.csv")
df = df.set_index("index")


def get_number_of_items(number_items:int)->dict:
    all_items = {}
    for label, seria in df.iloc[:number_items].iterrows():
        all_items[label] = seria.to_dict()
    return all_items


def get_between_start_end(start: int, end: int, colume_name: str)->dict:
    df_result = df[(df[colume_name] >= start) & (df[colume_name] <= end)]
    all_items = {}
    for label, seria in df_result.iterrows():
        all_items[label] = seria.to_dict()
    return all_items


def get_maxuim_minium_price(user_request: str)->dict:
    if "max" == user_request:
        return df.loc[df["price"].idxmax()].to_dict()
    return df.loc[df["price"].idxmin()].to_dict()


def find_item(item_id: int)->bool:
    if item_id not in df.index:
        return False
    return True


def get_item(item_id: int)->dict:
    return df.loc[item_id].to_dict()


def update_item(item_id: int, updated_item: dict):
    df.loc[item_id] = updated_item

