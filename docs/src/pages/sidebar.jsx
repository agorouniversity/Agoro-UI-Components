import React from 'react';
import { Sidebar } from '@agorouniversity/agoro-ui-components';

export default function SidebarPage() {
    return (
        <>
          <Sidebar>
            <Sidebar.Item link='/courses'>Courses</Sidebar.Item>
            <Sidebar.Item link='/calendar'>Calendar</Sidebar.Item>
            <Sidebar.Item link='/assignments'>Assignments</Sidebar.Item>
            {/* {!user.info.instructor &&
              <Sidebar.Item link='/grades'>Grades</Sidebar.Item>
            } */}
            {/* <Sidebar.SubSection data={course} route='/courses/:id'> */}
            {/* <Sidebar.SubSection data={course} route='/courses/:id'>
              <Sidebar.Item link=''>Course Home</Sidebar.Item>
              <Sidebar.Item link='/assignments'>Assignments</Sidebar.Item>
              {!user.info.instructor &&
                <Sidebar.Item link='/grades'>Grades</Sidebar.Item>
              }
              {adminAccessable
                ? <Sidebar.Item link='/students'>Students</Sidebar.Item>
                : <Sidebar.Item link='/instructors'>Instructors</Sidebar.Item>
              }
            </Sidebar.SubSection> */}
          </Sidebar>
        </>
        )
}
