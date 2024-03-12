import React from 'react';
import { Header, ButtonA } from '@agorouniversity/agoro-ui-components';

export default function HeaderPage() {
    return (
        <>
          <Header>
            <Header.Buttons dark={true} color='#32a852' size='large'>
              <Button>Home</Button>
              <Button>Options</Button>
              <Button>Logout</Button>
            </Header.Buttons>
            <Header.DropDown>
            {/* <Login /> */}
              <Button>Option 1</Button>
            </Header.DropDown>
          </Header>
        </>
        )
}
