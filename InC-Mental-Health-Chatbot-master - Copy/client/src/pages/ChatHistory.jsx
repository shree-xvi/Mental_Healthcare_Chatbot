import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"
function ChatHistory() {
    const [list, setList] = useState([]);

    useEffect(() => {
        retrieveList()
    }, [])

    function retrieveList() {
        axios.get("http://localhost:5000/chat")
            .then((res) => {
                setList(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <div className="chathistory">
            <div>
                <b><h1 align="center" className="chathistory-h1">Chat History</h1></b>
                <br></br>

            </div>
            {list.map((item) => {
                return (<ChatTile date={item.date} id={item._id} />)
            })}
        </div>
    )
}

function ChatTile(props) {
    const navigate = useNavigate();
    function gotoChat(){
        navigate('/newchat',{
            state:{
                key:props.id
            }
        })
    }
    return (
        <div className="combined">
            <h2 className="combined-h2"> Chat on {props.date} </h2>
            <div className="button-container">
                <input type="submit" value="Open Chat" onClick={gotoChat}/>
            </div>

        </div>)
}
export default ChatHistory;