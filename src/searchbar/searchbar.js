import './searchbar.css';
import {IconButton, ButtonA, ButtonC, TextInput, Modal, Select, Accordion, CheckBox} from '../UI';
import {useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import Context from '../../../context';
import cachedData from '../../../util/cachedData';
import { post, get, put } from '../../../util/api';

const DisplayTags = (props) => {
  const [tagName, setTagName] = useState(undefined);

  useEffect(() => {
    get(`tag/${props.info}`)
    .then((data) => {
      setTagName(data.tagtext);
    })
    .catch(err => {
      console.error(err);
    })
  }, [props.info])

 
  const submitEditTag = (tagID, tagText, courseID) => {   
    const temp = tagText ;
    var lowerCase = temp.toLowerCase() ;
    const body = {
       "Tagtext": lowerCase
     }
     return new Promise((res, rej) => {
         put(`course/${courseID}/tag/${tagID}`, body)
           .then((data) => {
             console.log(data);
             alert("Tag has been edited");
           })
           .catch((err) => {
             rej(err.message);
           })
       })
   } 

  return(
    <div className="addDiv">
    <div className="sendIcon">
        <IconButton title='add' icon='send' size='small' light={false} onClick={() => submitEditTag(props.info, tagName, props.courseID)}/>
      </div>
      <label>Edit Tag #{props.index}</label>
      {tagName && 
      <TextInput width='full' defaultValue={tagName} 
      onChange={(event) => {setTagName(event.target.value)}}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          setTagName(event.target.value);
          submitEditTag(props.info, event.target.value, props.courseID);
        }
    }}/>}
    </div>
  )
}

export const Searchbar = (props) => {
  const navigate = useNavigate();
  const {adminAccessable, user} = useContext(Context);
  const [newTagModal, setnewTagModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [courses, setCourses] = useState(undefined);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [filterClass, setFilterClass] = useState("");
  const [filterClassName, setFilterClassName] = useState("");
  const [tagOpts, setTagOpts] = useState([]);
  const [tag, setTag] = useState("");
  const [tagName, setTagName] = useState("");
  const [query, setQuery] = useState("");
  const [tagText, setTagText] = useState("");

  useEffect(() => {
    cachedData.getCourseMap(user.info, true)
      .then((data) => {
        setCourses({
          current: data,
          past: [] //Not implemented yet
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ user.info ])

  const sendQuery = (query) => {
    setQuery(query);
    props.setQueryString(query);
  }

  useEffect(() => {
    props.filterByCourse(filterClass);    
  }, [props, filterClass])

  useEffect(() => {
    props.filterByTag(tag);
  }, [props, tag])

  const create = () => {
    navigate("/newPosts", {state: {tagsDict: props.tagsDict, courseIds: Object.keys(courses.current)}});
  }

  const getTagNames = (tags,length,courseIndex,tagIndex) => {
    if (tagIndex >= length) {return;}
    else {
      setTagOpts((prev) => [...prev,props.tagsDict[tags[tagIndex]]]);
      getTagNames(tags,length,courseIndex,tagIndex+1);
    }
  }

  const refreshTags = () => {
    cachedData.getCourseMap(user.info, true)
      .then((data) => {
        setCourses({
          current: data,
          past: [] //Not implemented yet
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const getTags = (courses, index) => {
    setTagOpts([""]);
    if (Object.keys(courses.current)[index-1]) {
      get(`course/${Object.keys(courses.current)[index-1]}`)
      .then((data) => {
        getTagNames(data.tags,data.tags.length,index,0);
      })
      .catch(err => {
        console.error(err);
      })
    } else {
      setTagOpts([""]);
    }
  }
    
  const submitAddTag = (tagText, courseID) => {   
    const temp = tagText ;
    var lowerCase = temp.toLowerCase() ;
    const body = {
       "Tagtext": lowerCase
     }
     return new Promise((res, rej) => {
         post(`course/${courseID}/tag`, body)
           .then((data) => {
             console.log(data);
             alert("New Tag Added!");
             setTagText("");
             refreshTags();
           })
           .catch((err) => {
             rej(err.message);
           })
       })
  } 

  return(
    <div className="searchbar">
      <ButtonC onClick={() => create()}>Create</ButtonC>
      <div className="searchDiv">
      <div className="magnifyingGlass">
          <IconButton title='Search' icon='search' size='small' light={false}/>
        </div>
        {/* <TextInput width='full'/> */}
        <TextInput width='full' defaultValue={query} onChange={(event) => {sendQuery(event.target.value)}}/>
      </div>
      {adminAccessable &&
        <>
        <ButtonA color="secondary" onClick={() => setnewTagModal(true)}>Tags</ButtonA>
          <Modal open={newTagModal}  closeBtn={true} cancel={() => setnewTagModal(false)}>
          <Modal.Title>Add or Edit Tags</Modal.Title>
          <Modal.Body>
            <Accordion>
              {courses &&
              Object.values(courses.current).map((course, i) =>
              <Accordion.Item key={i}>
                <Accordion.Title>{course.courseName}</Accordion.Title>
                <Accordion.Content>
                    <div className="addDiv">
                    <div className="sendIcon">
                        <IconButton title='add' icon='send' size='small' light={false} onClick={() => submitAddTag(tagText, course.courseID)}/>
                      </div>
                      <label>Add a new tag</label>
                      <TextInput 
                      width='full' 
                      defaultValue={tagText} 
                      onChange={(event) => {setTagText(event.target.value)}}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          setTagText(event.target.value);
                          submitAddTag(event.target.value, course.courseID);
                        }
                    }}/>
                    </div>
                  {course.tags.map((taggy, j) => 
                    <DisplayTags key={j} info={taggy} index={j+1} courseID={course.courseID}/>
                  )}
                </Accordion.Content>
                </Accordion.Item>
              )}
            </Accordion>
          </Modal.Body>
        </Modal>
        </>
      }
      <ButtonA onClick={() => setFilterModal(true)}>Filter</ButtonA>
      <Modal open={filterModal} closeBtn={true} cancel={() => setFilterModal(false)}>
          <Modal.Title>Filter</Modal.Title>
          <Modal.Body>
            <div className="classTag">
            {courses &&
              <Select 
              label = "Class"
              items={["", ...Object.values(courses.current).map(x => x.courseName)]}
              value={filterClassName}
              addObject={(object) => {
                  setFilterClassName(object.item);
                  if (object.index === 0) {
                    setSelectedCourseIndex(0);
                    setFilterClass("");
                  } else {
                    setFilterClass(Object.values(courses.current)[object.index-1].courseID);
                    setSelectedCourseIndex(object.index-1);
                    getTags(courses, object.index);
                  }
                  setTag("");
                }
              }
              />
              }
              {courses && filterClass !== "" && 
              <Select 
              label = "Tag" 
              items={tagOpts}
              value={tagName}
              addObject={(object) => {
                  setTagName(object.item);
                  object.index === 0 ? setTag("") : setTag(Object.values(courses.current)[selectedCourseIndex].tags[object.index-1])
                }
              }
              />
              }
            </div>
            <CheckBox
              name='showMyPosts'
              onChange={(e) => props.filterBySelf(e.target.checked)}
              selected={props.self ? [0] : []}
            >
              <CheckBox.Item value='myPosts'>Show my posts ONLY</CheckBox.Item>
            </CheckBox>
            <br/>
          </Modal.Body>
        </Modal>
    </div>
  )
}