import './discussionBox.css';
import {IconButton, Modal, TextInput, ButtonC, ButtonA} from '../UI';
import { useNavigate  } from "react-router-dom";
import { useContext, useState} from 'react';
import Context from '../../../context';
import { get, post, put } from '../../../util/api';

export const DiscussionBox = (props) => {
  const navigate = useNavigate();
  const {adminAccessable, user} = useContext(Context);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [anonReplyModal, setAnonReplyModal] = useState(false);
  const [showTextBox, setShowTextBox] = useState(false);
  const [message, setMessage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [completePostModal, setCompletePostModal] = useState(false);
  const [reopenPostModal, setReopenPostModal] = useState(false);
  const [editMessage, setEditMessage] = useState(props.question);
  const [displayMessage, setDisplayMessage] = useState(props.question);
  const [flagModal, setFlagModal] = useState(false);

  const getAuthorName = (authorID) => {
      if (authorName === "") {
        get(`account/${authorID}/name`)
        .then((data) => {
          setAuthorName(data);
        })
        .catch(err => {
          console.error(err);
        })
      }
      return authorName;
  }

  const submitReply = (message, anonymity) => {
    const body = {
       "Message": message,
       "Anonymity": anonymity
     }
     return new Promise((res, rej) => {
         post(`question/${props.questionID}/reply`, body)
           .then((data) => {
             console.log(data);
              setAnonReplyModal(false);
              setShowTextBox(false);
             props.fetchNewReplies(props.questionID);
           })
           .catch((err) => {
             rej(err.message);
           })
       })
   }

   const submitEdit = (message) => {
    const body = {
      "Title": props.title,
      "Message": message,
      "Answered": props.complete,
      "Archieved": false
    }

    return new Promise((res, rej) => {
      put(`question/${props.questionID}`, body)
        .then((data) => {
          console.log(data);
          setDisplayMessage(editMessage);
          setEditPostModal(false);
        })
        .catch((err) => {
          rej(err.message);
        })
    })
   }

   const submitDelete = () => {
    const body = {
      "Title": props.title,
		  "Message": props.question,
		  "Answered":  props.complete,
      "Archieved": true
    }
    return new Promise((res, rej) => {
      put(`question/${props.questionID}`, body)
        .then((data) => {
          console.log(data);
          navigate('/discussion');
        })
        .catch((err) => {
          rej(err.message);
        })
    })
   }

   const completePost = () => {
    const body = {
      "Title": props.title,
		  "Message": props.question,
		  "Answered":  true,
      "Archieved": false
    }
    return new Promise((res, rej) => {
      put(`question/${props.questionID}`, body)
        .then((data) => {
          console.log(data);
          setCompletePostModal(false);
          props.refreshQuestion(props.questionID);
          
        })
        .catch((err) => {
          rej(err.message);
        })
    })
   }

   const reopenPost = () => {
    const body = {
      "Title": props.title,
		  "Message": props.question,
		  "Answered":  false,
      "Archieved": false
    }
    return new Promise((res, rej) => {
      put(`question/${props.questionID}`, body)
        .then((data) => {
          console.log(data);
          setReopenPostModal(false);
          props.refreshQuestion(props.questionID);
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
        put(`message/${props.questionID}/${type2}/unvote`,body)
        .then((data) => {
          console.log(data);
          props.refreshQuestion(props.questionID);
        })
        .catch((err) => {
          rej(err.message);
        })
      })
    }
    else {
      return new Promise((res,rej) => {
        put(`message/${props.questionID}/${type1}`,body)
        .then((data) => {
          console.log(data);
          props.refreshQuestion(props.questionID);
        })
        .catch((err) => {
          rej(err.message);
        })
      })
    }
   }

  return(
    <div className="box">
      <div className="head">
        {/*navigate(`/question/${props.questionID}`,{ state:{ questionID: props.questionID}}) */}
          <h3 className="head3" onClick={() => navigate(`/question/${props.questionID}`,{ state:{ title: props.title, question: props.question, questionID: props.questionID, 
            authorID: props.authorID, authorName: props.authorName, date:props.date, courseID: props.courseID, courseName: props.courseName, tag: props.tag, 
            tagName: props.tagName, down: props.down, showFlag: props.showFlag, edit: props.edit, reply:props.reply, anon:props.anon, archieved: props.archieved} })}>{props.title}</h3>
          <h4 className="classTitle">{props.courseName}</h4>
          {props.tagName && props.tagName !== "" && <h4 className="tags">{props.tagName}</h4>}
        <div className="up">
        { props.complete ? <IconButton title='completed' icon='check' size='medium' light={false} /> : null}
        </div>
      </div>
      <p>{displayMessage}</p>
      <div className="flexy">
        {/* <h4>{props.anon? "Anonymous" : getAuthorName(props.authorID)}</h4> */}
        <h4>{props.anon ? "Anonymous" : props.authorName}</h4>
        <p className="date">{props.date}</p>
        <div className="editReply">
          {props.showFlag ? (adminAccessable || user.info.accountID === props.authorID ? 
          (props.complete ? <IconButton title='reopen post' icon='open' size='xsmall' light={false} onClick={() => setReopenPostModal(true)}/>: 
        <IconButton title='mark as complete' icon='check' size='xsmall' light={false} onClick={() => setCompletePostModal(true)}/>): null): null}
        <Modal open={completePostModal}  confirm={() => completePost()} cancel={() => setCompletePostModal(false)}>
          <Modal.Title>Mark Post as Complete?</Modal.Title>
          <Modal.Body>
            <h3>Would you like to mark this post as complete?</h3>
            <p><strong>Title:</strong> {props.title}</p>
            <p><strong>Question:</strong> {props.question}</p>
          </Modal.Body>
        </Modal>
        <Modal open={reopenPostModal} confirm={() => reopenPost()} cancel={() => setReopenPostModal(false)}>
          <Modal.Title>Reopen This Post?</Modal.Title>
          <Modal.Body>
            <h3>Would you like to reopen this post?</h3>
            <p><strong>Title:</strong> {props.title}</p>
            <p><strong>Question:</strong> {props.question}</p>
          </Modal.Body>
        </Modal>
          {props.edit ? (adminAccessable || user.info.accountID === props.authorID ? 
          <IconButton title='edit' icon='edit' size='xsmall' light={false} onClick={() => setEditPostModal(true)} />: null): null}
          <Modal open={editPostModal}  confirm={() => submitEdit(editMessage)} cancel={() => setEditPostModal(false)}>
          <Modal.Title>Edit Post</Modal.Title>
          <Modal.Body>
            <p className="titleEdit"><strong>Title: </strong> {props.title}</p>
            <label>Question:</label>
            <TextInput width='full' defaultValue={editMessage} multiline="true" onChange={(event) => {setEditMessage(event.target.value)}}/>
          </Modal.Body>
        </Modal>
          {props.reply ? <IconButton title='reply' icon='reply' size='xsmall' light={false} onClick={() => setShowTextBox(prevState => !prevState)}/>: null}
          { props.showFlag ?  <IconButton title='report' icon='flag' size='xsmall' light={false} onClick={() => setFlagModal(true)}/> : null}
          <Modal open={flagModal}  confirm={() => console.log("hi")} cancel={() => setFlagModal(false)}>
          <Modal.Title>Report Post?</Modal.Title>
          <Modal.Body>
          <h3>Are you sure you want to report the following post?</h3>
            <p><strong>Title:</strong>{props.title}</p>
            <p><strong>Question:</strong>{props.question}</p>
            <p><strong>Author:</strong>{props.anon? "Anonymous" : getAuthorName(props.authorID)}</p>
          </Modal.Body>
        </Modal>
          {props.showFlag ? (adminAccessable || user.info.accountID === props.authorID ? 
          <IconButton title='delete post' icon='trash' size='xsmall' light={false} onClick={() => setDeletePostModal(true)}/>: null): null}
         <Modal open={deletePostModal}  confirm={() => submitDelete()} cancel={() => setDeletePostModal(false)}>
          <Modal.Title>Delete This Post?</Modal.Title>
          <Modal.Body>
            <h3>Are you sure you want to delete the following post?</h3>
            <p><strong>Title:</strong>{props.title}</p>
            <p><strong>Question:</strong>{props.question}</p>
            <p><strong>Author:</strong>{getAuthorName(props.authorID)}</p>
          </Modal.Body>
          </Modal>
        </div>
        <div className="up">
          <IconButton title='up vote' icon='upArrow' size='small' light={false} onClick={() => submitVote("upvote", "upvotes")}/>
          <p className="num">{props.votes}</p>
          { props.down ? <IconButton title='down vote' icon='downArrow' size='small' light={false} onClick={() => submitVote("downvote", "downvotes")}/> : null}
        </div>
      </div>
      { showTextBox &&
      <div className="replyBox">
        <TextInput placeholder="Enter reply..." width="full" multiline="true" defaultValue={message} onChange={(event) => {setMessage(event.target.value)}}/>
        <IconButton title="send reply" icon="send" size="small" light={false} onClick={() => setAnonReplyModal(true)}/>
        <Modal open={anonReplyModal}  closeBtn={true} cancel={() => setAnonReplyModal(false)}>
          <Modal.Title>Anonymous Reply?</Modal.Title>
          <Modal.Body>
            <p className="centerText">Would you like to make this reply anonymously?</p>
            <div className="btnGroup">
              <ButtonA onClick={() => submitReply(message, true)} size="large">Yes (keep my name hidden)</ButtonA>
              <ButtonC onClick={() => submitReply(message, false)} size="large">No (show my name)</ButtonC>
            </div>
          </Modal.Body>
          </Modal>
      </div>
      }
  </div>
  )
}