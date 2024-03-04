import React from 'react';
import { Button } from '@agorouniversity/agoro-ui-components';


{/* <ButtonA
    id='thisbutton'
    className='thisclass'
    onClick={() => console.log('clicked')}
    type='submit' | 'reset' | 'button' (default)
    size='large' | 'medium' | 'small' (default)
    link='./courses' (optional)
    color='secondary' | 'Danger' | 'Warn' | 'primary' (default)
    disabled={true} (default is false)
>
    button name
</ButtonA> */}

export default function ButtonPage() {
    return (
        <>
            <Button
                // id='thisbutton'
                // className='thisclass'
                // onClick={() => console.log('clicked')}
                // type='submit'
                // size='large'
                // link='./courses'
                // color='Warn'
                // disabled={true}
            >
                regular button
            </Button>

            <Button
                // id='thisbutton'
                // className='thisclass'
                // onClick={() => console.log('clicked')}
                // type='submit'
                size='large'
                // link='./courses'
                color='Danger'
                // disabled={true}
            >
                large danger button
            </Button>

            <Button
                // id='thisbutton'
                // className='thisclass'
                // onClick={() => console.log('clicked')}
                type='submit'
                size='small'
                // link='./courses'
                color='Warn'
                // disabled={true}
            >
                small submit warning button
            </Button>

            <Button
                // id='thisbutton'
                // className='thisclass'
                // onClick={() => console.log('clicked')}
                type='reset'
                // size='large'
                // link='./courses'
                // color='Warn'
                disabled={true}
            >
                disabled reset button
            </Button>

            <Button
                // id='thisbutton'
                // className='thisclass'
                // onClick={() => console.log('clicked')}
                // type='submit'
                // size='large'
                link='../courses'
                color='secondary'
                // disabled={true}
            >
                secondary button
            </Button>
        </>
        )
}
