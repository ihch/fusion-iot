import json
from pprint import pprint
from logging import getLogger
from spreadsheet_tools import SpreadsheetTools

logger = getLogger(__name__)

SPREADSHEET_ID = "1gnInzFHiK8aGHNUH4ZgeYqGkuVkyHvqDev0yTFsPVzk"
SCOPES = ["https://spreadsheets.google.com/feeds"]
KEY_FILE_PATH = "./private/fusion-iot-d4cc9aaed1d2.json"


def main():
    spreadsheet = SpreadsheetTools(SPREADSHEET_ID, SCOPES, KEY_FILE_PATH)
    worksheet = spreadsheet.sheets.get_worksheet(0)

    """
    # post ex.
    data = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
            ]
    for i, datum in enumerate(data):
        worksheet.append_row([i] + datum)


    # get ex.
    worksheet = sheets.get_worksheet(0)
    pprint(worksheet.get_all_values())
    """


if __name__ == '__main__':
    main()
