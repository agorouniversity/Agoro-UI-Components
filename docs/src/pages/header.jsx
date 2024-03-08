import React from 'react';
import { Header } from '@agorouniversity/agoro-ui-components';

export default function HeaderPage() {
    return (
        <>
          <Header dropDownOpen={false}>
            <Header.Buttons dark={true} color='#32a852' size='large'>
              <button>Logout</button>
            </Header.Buttons>
            <Header.DropDown>
            {/* <Login /> */}
            </Header.DropDown>
          </Header>
        </>
        )
}
