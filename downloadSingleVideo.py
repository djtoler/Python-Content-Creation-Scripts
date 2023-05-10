import os
from youtubedl import YTDLLocalDownload

def download_youtube_video(url, save_path='./'):
    """Downloads a YouTube video given its URL to the specified directory"""
    yt_dl = YTDLLocalDownload(os.environ['HOME'])
    result = yt_dl.download([url])

    if result:
        downloaded_file = os.path.join(save_path, result['filename'])
        with open(downloaded_file, 'wb') as f:
            f.write(result['filesize'], result['hashes'].md5())
            yt_dl.cleanup(verbose=True)
            print('Successfully downloaded: {}'.format(result))
    else:
        print('Failed to download video')

if __name__ == '__main__':
    download_youtube_video('https://www.youtube.com/watch?v=OpsbT0jz7Js')