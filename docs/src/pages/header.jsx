import React from 'react';
import { Header, Button } from '@agorouniversity/agoro-ui-components';

export default function HeaderPage() {
    return (
        <>
          <Header>
            <Header.Buttons dark={false} color='#32a852' size='small'>
              <Button link="/" size='small' color='Danger'>Home</Button>
              <Header.DropDown buttonSize='small' buttonTitle='Options' dropdownTitle='Theme'>
                <Button>System</Button>
                <Button>Light</Button>
                <Button>Dark</Button>
              </Header.DropDown>
              <Button link="/logout" size='small'>Logout</Button>
            </Header.Buttons>
          </Header>
        </>
        )
}
