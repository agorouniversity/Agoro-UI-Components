import React from 'react';
import { Button } from '@agorouniversity/agoro-ui-components';


{/* <Button
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
</Button> */}

export default function ButtonPage() {
    return (
        <>
            <Button>
                regular button
            </Button>

            <Button
                size='large'
                color='Danger'
            >
                large danger button
            </Button>

            <Button
                type='submit'
                size='small'
                color='Warn'
            >
                small submit warning button
            </Button>

            <Button
                type='reset'
                disabled={true}
            >
                disabled reset button
            </Button>

            <Button
                link='../courses'
                color='secondary'
            >
                secondary button
            </Button>
        </>
        )
}
