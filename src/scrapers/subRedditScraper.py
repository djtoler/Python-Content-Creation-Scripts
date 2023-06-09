import requests
import time

def scrape_subreddit(subreddit, before):
    url = f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&before={before}"
    request = requests.get(url)
    json_response = request.json()
    print(f"API response: {json_response}")  # print the API response
    if 'data' in json_response:
        return json_response['data']
    else:
        return []

def get_all_posts(subreddit):
    all_posts = []
    last_post_time = int(time.time())  # get the current time

    while True:
        try:
            posts = scrape_subreddit(subreddit, last_post_time)
            print(f"Number of posts fetched: {len(posts)}")  # print the number of posts fetched
            if len(posts) == 0:  # if there are no more posts, break the loop
                break

            all_posts.extend(posts)
            last_post_time = posts[-1]['created_utc']  # get the time of the last post
            print(f"Last post time: {last_post_time}")  # print the time of the last post

            time.sleep(1)  # delay between requests to respect rate limits
        except Exception as e:
            print(f"Error: {e}")  # print any errors
            break

    return all_posts

# Usage
all_posts = get_all_posts('chiraqology')
print(f"Total number of posts fetched: {len(all_posts)}")  # print the total number of posts fetched
