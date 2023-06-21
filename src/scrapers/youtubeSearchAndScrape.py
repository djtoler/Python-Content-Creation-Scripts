import time
import random
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

# create a new Chrome browser instance
driver = webdriver.Chrome(ChromeDriverManager().install())

# navigate to the YouTube page
driver.get('https://www.youtube.com')

# locate the search input field and enter the search term
search_input = driver.find_element(By.NAME, 'search_query')
search_term = "your+search+term+here"
search_input.send_keys(search_term)
search_input.send_keys(Keys.RETURN)
searchTerm 

# wait for the search results to load
time.sleep(5)

# create a list to store video IDs
video_ids = []

# create a set to store video titles that have been written to the file
written_titles = set()

# keep scrolling to the bottom of the page and appending video titles and IDs to the file
while True:
    # find all a tags with an id that equals "video-title-link"
    title_links = driver.find_elements(By.XPATH, '//a[@id="video-title-link"]')

    # write the title and ID of each new video to a file and append to video_ids list
    with open('ButtaPage_titles.txt', 'a', encoding='utf-8') as f:
        for link in title_links:
            title = link.get_attribute('aria-label')
            href = link.get_attribute('href')
            if title is not None and (
                    "billionaire" in title.lower() or "lil b" in title.lower() or "talks" in title.lower() or "story" in title.lower() or "speaks" in title.lower()) and title not in written_titles and href is not None:
                video_id = href.replace('https://www.youtube.com/results?search_query='+{search_term}, '')
                f.write(f"Title: {title}\n")
                f.write(f"Video ID: {video_id}\n")
                video_ids.append(video_id)
                written_titles.add(title)
                print(video_ids)
                if len(video_ids) >= 20:
                    break

    # check if the desired number of videos has been found
    if len(video_ids) >= 20:
        break

    with open('video_ids3.txt', 'w', encoding='utf-8') as f:
        for video_id in video_ids:
            f.write(video_id + '\n')

    # scroll down to the bottom of the page
    driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)

    # wait for new videos to load
    while True:
        if len(title_links) != len(driver.find_elements(By.XPATH, '//a[@id="video-title-link"]')):
            break
        time.sleep(1)

    # wait a random amount of time between 5 and 14 seconds
    time.sleep(random.randint(5, 9))

    # break the loop if no more videos are found
    if not title_links:
        break

print("Video IDs:")
for video_id in video_ids:
    print(video_id)

# close the browser
driver.quit()
