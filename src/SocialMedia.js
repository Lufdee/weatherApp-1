import React, { useState, useEffect } from 'react';


const SocialMedia = ({ responseObj, mainCity }) => {

    const MAXPOSTS = 3
    let [data, setData] = useState([])
    let [gettem, setGettem] = useState(false)

    const getPosts = async() => {

        var tagBeforeSpaces = responseObj.list[mainCity].name
        var j = '';
        for (let i = 0; i < tagBeforeSpaces.length; i++) {
                j += tagBeforeSpaces[i].replace(' ', '');
        }
        var tag = j.toLowerCase()

        const res = await fetch(`https://instagramdimashirokovv1.p.rapidapi.com/tagtop/${tag}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Host': 'InstagramdimashirokovV1.p.rapidapi.com',
                'X-RapidAPI-Key': '0a1494a602msh705260b0e4c166dp1cb901jsn36fcf81fb794',
            }
        })

        const dataIn = await res.json()
        console.log("getPosts:")
        console.log(dataIn)
        var dataInput = []

        if (dataIn.edges.length !== 0) {
            for (var i = 0; i < MAXPOSTS; i++) {
                dataInput.push(dataIn.edges[i])
                var url = dataInput[i].node.thumbnail_src
                const p = url.split("/");
                var t = '';
                for (let i = 0; i < p.length; i++) {
                    if (i == 2) {
                        t += p[i].replaceAll('-', '--').replaceAll('.', '-') + atob('LnRyYW5zbGF0ZS5nb29n') + '/';
                    } else {
                        if (i != p.length - 1) {
                            t += p[i] + '/';
                        } else {
                            t += p[i];
                        }
                    }
                }
                dataInput[i].node.thumbnail_src = t
            }

            console.log(dataInput)
            setData(dataInput)
            setGettem(true)
        }
    }

    return (
            <div className='SocialMedia'>
                <button className="instagramBtn" onClick={getPosts} >Check Instagram</button>
                {/* <p>Here is whats popping on the gram for {responseObj.list[mainCity].name}</p> */}
                <p className="postsIntroText" style = {{width: "352px"}}>Top posts from {responseObj.list[mainCity].name}!</p>
                {gettem === true ?
                    data.map(post => (
                    <div className='igTopPosts'>
                            <ol key={post["node"]["id"]}>
                                {/* cros error when uploading images */}
                                <img id={post["node"]["id"]} src={post["node"]["thumbnail_src"]} width="100" height="100" />
                                {/* <p>{post["node"]["accessibility_caption"]}</p> */}
                            </ol>            </div>

                        )) :
                "No posts" }
                </div>
        )
}

//link for api used: https://rapidapi.com/v.sobolev/api/Instagram/

export default SocialMedia