import React, {useState} from 'react';

export default (props) => 
{
    const [mentions, setMentions] = useState()

    function getMentions(){
        const targetUrl = 'http://localhost:4000/getMentions?url='+props.url

        fetch(targetUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            setMentions(data);
        })
        .catch(err => console.log(err))        
    }

    function getMentionsCount(){
        return mentions === undefined ? ""
                : mentions.map(item => {
                    return <li key={item[0]}>{item[0]} - {item[1]}</li>
        })
    }
    
    return <div>
            <button onClick={getMentions}>Obtain mentions</button>
            <div>
                <ul>
                    {getMentionsCount()}
                </ul>
            </div>
        </div>
}