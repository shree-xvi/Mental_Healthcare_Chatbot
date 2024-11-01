import React, {useEffect, useState} from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";

var id;

function NewChat() {
    const request = useLocation();
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        id=request.state.key;
        retrieveList();
    },[])
    async function  retrieveList() {
        axios.get("http://localhost:5000/chat/"+id)
          .then((res) => {
            const localMessages = [];
            res.data.chat.map((item)=>{
                localMessages.push(item);
            });
            setMessages(localMessages);
          }).catch((err) => {
            console.log(err);
          })
      }
    const handleQuestion = () => {
        console.log(id)
        axios.post("http://localhost:5000/chat/"+id,{
            question:question
        }).then((data)=>{
            const localMessages = [];
            data.data.chat.map((item)=>{
                localMessages.push(item);
            });
            setMessages(localMessages);
        })
        setQuestion("");
    }
    return (
        <div className="newchat">
            <div>
                <b><h1 align="center" className="newchat-h1">New Chat</h1></b>
                <br></br>
                
            </div>
            {messages?.map((res)=>{
                return(
                    <div>
                    <Answer chat={res.question} />
                    <Question chat={res.answer} />
                    </div>)
            })}
            <div className="Input">
                    <textarea placeholder="Ask.." rows={"3"} value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
                    <br></br>
                    <br></br>
                    <input type="button" value="Submit" onClick={handleQuestion} className="btn btn-primary" />
                </div>
        </div>
    )
}
function Answer(props){
    return(
        <div className="answer">
            <h4>{props.chat}</h4>
        </div>
    )
}
function Question(props){
    return(
        <div className="question">
            <h4>{props.chat}</h4>
        </div>
    )
}
export default NewChat;