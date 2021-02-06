import json
import requests
from bs4 import BeautifulSoup

def hello(event=None, context=None):
    
    print("event :: " + str(event))
    searchTerm = event["pathParameters"]["name"]
    avgViews, totalViews = findTitalViews(searchTerm)
    
    #body = {}
    
    body = {
        "searchterm": searchTerm,
        "totalviews": totalViews,
        "avgviews": avgViews
    }
    
    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

    
def findTitalViews(searchTerm):


    url = "https://www.youtube.com/results?search_query="+searchTerm

    res = requests.get(url)
    
    bs = BeautifulSoup(res.text, 'lxml')

    elements = bs.find_all('ul', class_='yt-lockup-meta-info')

    print(len(elements))

    totalViews = 0
    for ele in elements:
        lis = ele.findChildren()
        for li in lis:
            if li.string.endswith('views'):
                temp = li.text
                temp = temp.replace(' views','')
                temp = temp.replace(',','')
                totalViews = totalViews + int(temp)
    print(totalViews)

    return totalViews/len(elements) , totalViews