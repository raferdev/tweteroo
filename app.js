import express from 'express';
import cors from 'cors';
import {env} from 'node:process';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/images',express.static('images'));

let usernameLog = '';
let avatarLog = '';
let http = env.HTTP;
let tweets = [{
	username: "Sandy Cheeks",
	avatar: `${http}images/sandy-cheeks.jpg`,
    tweet: "Hellow, good to see you here. You are awesome.",
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

app.listen(env.PORT, ()=> {
    console.log(`Hello i'm running on port = ${env.PORT}`)
});