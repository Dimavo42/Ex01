import pandas as pd

def set_table_name(table:str="TelAviv.csv"):
    table_name = table
    df = pd.read_csv(table_name)
    df.set_index("index")
    df = df.convert_dtypes()
    return df,table_name


global df,table_name 
df,table_name =set_table_name()




def get_all_items(table:str ="TelAviv.csv")->dict:
    global df, table_name
    df,table_name = set_table_name(table)
    all_items = {}
    for label, seria in df.iterrows():
        all_items[label] = seria.to_dict()
    return all_items


def get_number_of_items(number_items:int)->dict:
    global df
    all_items = {}
    for label, seria in df.iloc[:number_items].iterrows():
        all_items[label] = seria.to_dict()
    return all_items


def get_between_start_end(start: int, end: int, colume_name: str)->dict:
    global df
    df_result = df[(df[colume_name] >= start) & (df[colume_name] <= end)]
    all_items = {}
    for label, seria in df_result.iterrows():
        all_items[label] = seria.to_dict()
    return all_items


def get_maxuim_minium_price(user_request: str)->dict:
    global df
    format_dict = {} 
    if "max" == user_request:
        max_user = df.loc[df["price"].idxmax()].to_dict()
        format_dict[max_user["index"]] = max_user
    else:
       min_user =  df.loc[df["price"].idxmin()].to_dict()
       format_dict[min_user["index"]] = min_user
    return format_dict


def find_item(item_id: int)->bool:
    global df
    if item_id not in df.index:
        return False
    return True


def get_item(item_id: int)->dict:
    global df
    return df.loc[item_id].to_dict()


def update_item(item_id: int, updated_item: dict):
    global df,table_name
    df.loc[item_id] = updated_item
    df.convert_dtypes()
    df.reset_index()
    df.to_csv(table_name,index=False)

