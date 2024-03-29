/*CSS shared by many components*/
import './UI.css';
import React from 'react';

/*
Components exported below for easy import ex:
  import { ButtonA, ButtonB, TextInput, Accordion, Radio, Checkbox, Table } from './components/UI/UI';
*/

const Box = (props) => {
    return (
        <div className="box">Hello World</div>
    )
}
export { Box };
export { Accordion } from './accordion/accordion';
export { Radio } from './radio/radio';
export { CheckBox } from './checkBox/checkBox';
export { ButtonA as Button, ButtonB, ButtonC, IconButton } from './buttons/buttons';
export { TextInput } from './textInput/textInput';
export { Header } from './header/header';
export { Table } from './table/table';
// export { Frame } from './frame/frame';
export { Select, MultiSelect } from './select/select';
export { Icon } from './icons/icons';
export { Sidebar } from './sidebar/sidebar';
export { Calendar, Upcoming } from './calendarstrip/calendarstrip';
export { Card } from './card/card';
export { Grade } from './grade/grade';
export { Loading } from './loading/loading';
export { Tabs } from './tabs/tabs'
export { DropDown } from './dropDown/dropDown';
export { Modal } from './modal/modal';
export { Badge } from './badge/badge';
export { FullCalendar } from './calendar/calendar';