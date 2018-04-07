import json
from oauth2client.service_account import ServiceAccountCredentials
import gspread


class SpreadsheetTools:
    def __init__(self, spreadsheet_id, scopes, key_file_path):
        self.spreadsheet_id = spreadsheet_id
        self.scopes = scopes
        self.key_file_path = key_file_path
        with open(key_file_path) as key_file:
            self.__private_key = json.load(key_file)
        self.__credentials = ServiceAccountCredentials.from_json_keyfile_dict(
                self.__private_key,
                self.scopes
                )
        self.__spreadsheet_client = gspread.authorize(self.__credentials)
        self.sheets = self.__spreadsheet_client.open_by_key(
                self.spreadsheet_id
                )
