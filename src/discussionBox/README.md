# UI Components

## Discussion Box

Usage: 

`import { DiscussionBox } from '../../components/UI/discussionBox/discussionBox';`

DiscussionBox components support props:

```
title=<string>
question=<string>
questionID=<string>
authorID=<string>
authorName=<string>
date=<string>
courseID=<string>
courseName=<string>
tag=<string>
tagName=<string>
complete=<boolean> (shows the check mark for if the post has been marked as completed)
votes=<int>
down=<boolean> (show the down vot arrow if you have expanded the post)
showFlag=<boolean> (show the report button if you have expaneded the post)
edit=<boolean> (show the edit button)
reply=<boolean> (show the reply button)
anon=<boolean> (anonymous post)
archieved=<boolean>
```

example:

```
<DiscussionBox 
  title="Sorting Vectors" 
  question="I’m working on homework for my data structures class, can anyone help me with sorting a vector?" authorID="4vzlka" 
  date="9/28/2023" 
  courseID="ex4mp1ec0urseID" 
  tag="Homework Question" 
  complete={true} 
  votes={5} 
  down={false} 
  showFlag={false}
/>
```