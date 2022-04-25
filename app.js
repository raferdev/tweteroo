import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
let usernameLog = '';
let avatarLog = '';
let tweets = [{
	username: "bobesponja",
	avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  tweet: "eu amo o hub",
}];
function ultimos10() {
    if(tweets.length<=10) {
        return tweets;
    }
    if(tweets.length>10) {
        let ultimosTweets = [];
        for(let i = 0;i<10;i++){
            ultimosTweets.push(tweets[i])
        }
        return ultimosTweets;
    }
}
app.post("/sign-up",(req,res) => {
    let user = req.body;
     usernameLog=user.username;
     avatarLog=user.avatar;
    res.send("OK");
});
app.post("/tweets",(req,res)=>{
    let tweet = req.body.tweet;
    let tweetLog = {
        username:usernameLog,
        avatar:avatarLog,
        tweet:tweet
    }
    tweets = [tweetLog,...tweets];
    res.send("OK");
});
app.get("/tweets", (req, res) => {
    res.send(ultimos10());
});
app.listen(5000);