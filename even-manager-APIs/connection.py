import pyodbc
from dotenv import load_dotenv
import os

load_dotenv()
login_string = os.getenv('login_string')


def get_connection():
    try: 
        conn = pyodbc.connect(login_string) 

        return conn
    
    except Exception as e:
        print(f"Error: {e}")
        return None