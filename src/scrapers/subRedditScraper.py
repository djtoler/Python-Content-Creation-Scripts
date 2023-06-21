# import requests
# import time

# def scrape_subreddit(subreddit, before):
#     url = f"https://api.pushshift.io/reddit/search/submission/?subreddit={subreddit}&before={before}"
#     request = requests.get(url)
#     json_response = request.json()
#     print(f"API response: {json_response}")  # print the API response
#     if 'data' in json_response:
#         return json_response['data']
#     else:
#         return []

# def get_all_posts(subreddit):
#     all_posts = []
#     last_post_time = int(time.time())  # get the current time

#     while True:
#         try:
#             posts = scrape_subreddit(subreddit, last_post_time)
#             print(f"Number of posts fetched: {len(posts)}")  # print the number of posts fetched
#             if len(posts) == 0:  # if there are no more posts, break the loop
#                 break

#             all_posts.extend(posts)
#             last_post_time = posts[-1]['created_utc']  # get the time of the last post
#             print(f"Last post time: {last_post_time}")  # print the time of the last post

#             time.sleep(2)  # delay between requests to respect rate limits
#         except Exception as e:
#             print(f"Error: {e}")  # print any errors
#             break

#     return all_posts

# # Usage
# all_posts = get_all_posts('chiraqology')
# print(f"Total number of posts fetched: {len(all_posts)}")  # print the total number of posts fetched


# /////////////////////////////Working//////////////////////
# import praw

# reddit = praw.Reddit(
#     client_id="dM38_8We_sMEEYxoOPe5JA",
#     client_secret="_Y-U6UM-uWX3C5pfA-qKuwLXRc6TJg",
#     user_agent="RapKitchenNews",
# )

# def print_comments(comment, level=0):
#     print(("  "*level + str(comment.body)).encode('cp1252', errors='replace'))
#     if not hasattr(comment, "replies"):
#         replies = comment.comments
#     else:
#         replies = comment.replies
#     for child in replies:
#         print_comments(child, level=level+1)


# subreddit = reddit.subreddit("Chiraqology")

# for submission in subreddit.hot(limit=10):
#     print("Title: ", submission.title.encode('cp1252', errors='replace'))

#     print("Post: ", submission.title.encode('cp1252', errors='replace'))

#     submission.comments.replace_more(limit=None)
#     for comment in submission.comments.list():
#         print_comments(comment)



import praw

reddit = praw.Reddit(
    client_id="dM38_8We_sMEEYxoOPe5JA",
    client_secret="_Y-U6UM-uWX3C5pfA-qKuwLXRc6TJg",
    user_agent="RapKitchenNews",
)


def print_comments(comment, level=0):
    print(("  " * level + str(comment.body)).encode('cp1252', errors='replace'))
    if not hasattr(comment, "replies"):
        replies = comment.comments
    else:
        replies = comment.replies
    for child in replies:
        print_comments(child, level=level + 1)


def search_subreddit(subreddit_name, search_term, limit=10):
    subreddit = reddit.subreddit(subreddit_name)

    for submission in subreddit.search(search_term, limit=limit):
        print("Title: ", submission.title.encode('cp1252', errors='replace'))
        print("Post: ", submission.title.encode('cp1252', errors='replace'))

        submission.comments.replace_more(limit=None)
        for comment in submission.comments.list():
            print_comments(comment)


# Example usage: search for "pizza" in the subreddit "food"
search_subreddit("chiraqology", "cgr mubu", limit=10)
