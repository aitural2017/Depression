from requests_oauthlib import OAuth1

from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream 
import requests
import json
import pyrebase


keyword="depressed"

class listener(StreamListener):

    def on_data(self,data):
        false = False
        null = "null"
        true = True

        replyText = None
        tweetContent = None
        tweetId = None
        screenName = None
        earlier_id = None
        earlier_screenName = None
        retweeted_status = None
        attachment_url = None
        new_tweet = None

        print ("data arrvied .." )
        try:
            tweet = json.loads(data)
            print(tweet)
            
            tweetContent = tweet.get('text')
            print("here is the text:")
            print(tweetContent)

            tweetId = tweet.get('user',{}).get('id_str')
            print("here is the user:")
            print(tweetId)
           
            created_at = tweet.get('user', {}).get('created_at')
            
            print("here is the created_at:")
            print(created_at)
            

            followers_count = tweet.get('user', {}).get('followers_count')
            print("here is the follower:")
            print(followers_count)
            
            #location = tweet.get('place', {}).get('country')
            #print("here is the place:")
            #print(location)
            

            print("here is data to be saved... " + str(tweetId) + str(created_at) +str(followers_count) + tweetContent)

            dataToSave = {}

            dataToSave['tweetId']=str(tweetId)
            dataToSave['text'] = str(tweetContent)
            dataToSave['created_at'] = str(created_at)
            dataToSave['followers_count'] = str(followers_count)
            
            print("again, printing the json out")
            print( dataToSave)
            
            save = open('twitDB.csv', 'a')
            save.write(str(dataToSave))
            
            save.write('\n')
            save.close()

            results = db.child("history").push(dataToSave, user['idToken'])
            
        except Exception as e:
            print("excpetion occurred while trying to reply with message: " + replyText)
            print("exception detail: " + str(e))
        finally:
            return

    def on_error(self,status):
        print(status)




firebase_config = {
  "apiKey": "AIzaSyDX2BZZNc3jz1IeiTHmEUEgwAZdlT5U-1E",
  "authDomain": "twittai-3b1fe.firebaseapp.com",
  "databaseURL": "https://twittai-3b1fe.firebaseio.com/",
  "storageBucket": "gs://twittai-3b1fe.appspot.com"
}

firebase = pyrebase.initialize_app(firebase_config)

firebase_auth = firebase.auth()

user = firebase_auth.sign_in_with_email_and_password("babalaba@gmail.com", "m4gnoliA")

global db 
db= firebase.database()


auth = OAuthHandler('Qr3NRJh6qfZ6U17y7CLOcjLjL', 'r7EQmE5w5BMaIY2j4NzgLpngedbdDxDGw4G6C9kR5lef49fNmq')
auth.set_access_token('886202670226317312-pQ6bdypm4QiDVYQWorlbvs2sXL0TAPK',
                          'tsFa4t8rOs7MuIECb6UVqUtypYtTwQTxlzsq2ZiSy8lwS')

global account_screen_name
account_screen_name= 'AngelHackathon'
global account_user_id
account_user_id= '886202670226317312'

global Oauth
Oauth = OAuth1('Qr3NRJh6qfZ6U17y7CLOcjLjL',
                client_secret='r7EQmE5w5BMaIY2j4NzgLpngedbdDxDGw4G6C9kR5lef49fNmq',
                resource_owner_key='886202670226317312-pQ6bdypm4QiDVYQWorlbvs2sXL0TAPK',
                resource_owner_secret='tsFa4t8rOs7MuIECb6UVqUtypYtTwQTxlzsq2ZiSy8lwS')


r = requests.get(url="https://api.twitter.com/1.1/statuses/mentions_timeline.json", auth=Oauth)
print ("Json object returned from requesting timeline:" + r.text)


twitterStream = Stream(auth=auth, listener=listener())
twitterStream.filter(track=[keyword])
print ("twitter stream opened with filter on keyword:" + keyword)