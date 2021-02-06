
import requests
from bs4 import BeautifulSoup

url = "https://www.youtube.com/results?search_query=python"

res = requests.get(url)
#print(res.text)

bs = BeautifulSoup(res.text, 'lxml')

elements = bs.find_all('ul', class_='yt-lockup-meta-info')

print(len(elements))

totalView = 0
for ele in elements:
    lis = ele.findChildren()
    for li in lis:
        if li.string.endswith('views'):
            temp = li.text
            temp = temp.replace(' views','')
            temp = temp.replace(',','')
            totalView = totalView + int(temp)
print(totalView)