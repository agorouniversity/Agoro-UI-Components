# UI Components

## Reply Box

Usage: 

`import { ReplyBox } from '../../components/UI/replyBox/replyBox';`

ReplyBox components support props:

```
replyId=<string>
answer=<string>
name=<string>
authorID=<string>
authorName=<string>
date=<string>
votes=<int>
down=<boolean> (show the down vot arrow if you have expanded the post)
showFalg=<boolean> (show the report button if you have expaneded the post)
reply=<boolean>
anon=<boolean> (anonymous)
fetchNewReplies=<function>
questionID=<string> (question associated with the reply)
```

example:

```
<ReplyBox 
answer="Use sort(vector.begin(), vector.end())" 
name="Professor" 
date="9/28/2023" 
votes={2} 
down={true} 
showFlag={true}
/>