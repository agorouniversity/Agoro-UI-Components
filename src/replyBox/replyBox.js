import './replyBox.css';
import {IconButton, Modal, TextInput} from '../src/UI';
import { useContext, useState} from 'react';
import Context from '../../../context';
import { post, put } from '../../../util/api';


export const ReplyBox = (props) => {
  const {adminAccessable, user} = useContext(Context);
  const [deleteReplyModal, setDeleteReplyModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [showTextBox, setShowTextBox] = useState(false);
  const [message, setMessage] = useState("");
  const [editMessage, setEditMessage] = useState(props.answer);

  const submitReply = (message, author) => {
    const body = {
       "Message": "Replying To " + author + ": " + message,
       "Anonymity": props.anon
     }
     return new Promise((res, rej) => {
       post(`question/${props.replyID}/reply`, body)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            rej(err.message);
          })
      })
   }


   const submitEdit = (message) => {
    const body = {
      "Message": message,
      "Archieved": false
    }
    return new Promise((res, rej) => {
      put(`reply/${props.replyID}`, body)
        .then((data) => {
          console.log(data);
          setEditPostModal(false);
          props.fetchNewReplies(props.questionID);
        })
        .catch((err) => {
          rej(err.message);
        })
    })
   }

   const submitDelete = () => {
    const body = {
		  "Message": props.answer,
      "Archieved": true
    }
    return new Promise((res, rej) => {
      put(`reply/${props.replyID}`, body)
        .then((data) => {
          console.log(data);
          props.fetchNewReplies(props.questionID);
        })
        .catch((err) => {
          rej(err.message);
        })
    })
   }

   const submitVote = (type1, type2) => {
    const body = {};
    if (props.voters.includes(user.info.accountID)) {
      return new Promise((res,rej) => {
        put(`message/${props.replyID}/${type2}/unvote`,body)
        .then((data) => {
          console.log(data);
          props.fetchNewReplies(props.questionID);
        })
        .catch((err) => {
          rej(err.message);
        })
      })
    }
    else {
      return new Promise((res,rej) => {
        put(`message/${props.replyID}/${type1}`,body)
        .then((data) => {
          console.log(data);
          props.fetchNewReplies(props.questionID);
        })
        .catch((err) => {
          rej(err.message);
        })
      })
    }
   }

   const formatAnswer = (answer) => {
    if(answer.includes("Replying To")) {
      var splitSentence = answer.split(":");
      return <p className="answer"><strong>{splitSentence[0]}:</strong><br/><br/>{splitSentence[1]}</p>;
    }
    return <p className="answer">{answer}</p>;
  }

  return(
    <div className="boxy">
      {formatAnswer(props.answer)}
      <div className="flexy">
        <h4>{props.anon? "Anonymous" : props.authorName}</h4>
        <p className="date">{props.date}</p>
        <div className="editReply">
        {props.showFlag ? (user.info.accountID === props.authorID ? 
          <IconButton title='edit' icon='edit' size='xsmall' light={false} onClick={() => setEditPostModal(true)} />: null): null}
          <Modal open={editPostModal}  confirm={() => submitEdit(editMessage)} cancel={() => setEditPostModal(false)}>
          <Modal.Title>Edit Reply</Modal.Title>
          <Modal.Body>
            <label>Message:</label>
            <TextInput width='full' defaultValue={editMessage} multiline="true" onChange={(event) => {setEditMessage(event.target.value)}}/>
            {/* checkbox to edit anonymity? */}
          </Modal.Body>
        </Modal>
          {props.reply ? <IconButton title='reply' icon='reply' size='xsmall' light={false} onClick={() => setShowTextBox(prevState => !prevState)}/>: null}
          {props.showFlag ?  <IconButton title='report' icon='flag' size='xsmall' light={false} /> : null}
          {props.showFlag ? (adminAccessable || user.info.accountID === props.authorID ? 
          <IconButton title='delete reply' icon='trash' size='xsmall' light={false} onClick={() => setDeleteReplyModal(true)}/>: null): null}
         <Modal open={deleteReplyModal}  confirm={() => submitDelete()} cancel={() => setDeleteReplyModal(false)}>
          <Modal.Title>Delete This Reply?</Modal.Title>
          <Modal.Body>
            <h3>Are you sure you want to delete the following reply?</h3>
            <p><strong>Message:</strong> {props.answer}</p>
            <p><strong>Author: </strong> {props.authorName}</p>
          </Modal.Body>
          </Modal>
        </div>
        <div className="up">
          <IconButton title='votes' icon='upArrow' size='small' light={false} onClick={() => submitVote("upvote", "upvotes")}/>
          <p className="num">{props.votes}</p>
          <IconButton title='votes' icon='downArrow' size='small' light={false} onClick={() => submitVote("downvote", "downvotes")}/>
        </div>
      </div>
      { showTextBox &&
      <div className="replyBox">
        <TextInput placeholder="Enter reply..." width="full" multiline="true" defaultValue={message} onChange={(event) => {setMessage(event.target.value)}}/>
        <IconButton title="send reply" icon="send" size="small" light={false} onClick={() => submitReply(message, props.name)}/>
      </div>
      }
  </div>
  )
}