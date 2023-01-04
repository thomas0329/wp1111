# Ref: https://ithelp.ithome.com.tw/articles/10238155
# Ref: https://stackoverflow.com/questions/42718547/how-to-connect-remote-mongodb-with-pymongo
# Ref: https://www.mongodb.com/languages/python/pymongo-tutorial


from dotenv import dotenv_values
config = dotenv_values(".env")
from pymongo import MongoClient
# import pymongo

mongodb_client = MongoClient(config["MONGO_URL"])
# print(mongodb_client)
database = mongodb_client[config["DB_NAME"]]
# print(database)
print("Connected to the MongoDB database!")

temp = database["images"].find_one({"name": "test"})
print(temp)