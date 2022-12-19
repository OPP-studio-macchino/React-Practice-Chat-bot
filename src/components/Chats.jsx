import React from 'react'

import {Chat} from './index';

import List from "@mui/material/List";


const Chats = (props) => {
    return (
			<List
				sx={{ height: 400, padding: "0", overflow: "auto" }}
				id={"scroll-area"}
			>
				{props.chats.map((chat, index) => {
					return <Chat text={chat.text} type={chat.type} key={index} />;
				})}
			</List>
		);
}

export default Chats;