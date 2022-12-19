import React from 'react'
import Button from "@mui/material/Button";


const Answer = (props) => {
    return (
			<Button
				sx={{
					borderColor: "#FFB549",
					color: "#FFB549",
					fontWeight: 600,
					marginBottom: "8px",
					"&:hover": {
						backgroundColor: "#FFB549",
						color: "#fff",
					},
				}}
				variant="outlined"
				onClick={() => props.select(props.answer.content, props.answer.nextId)}
			>
				{props.answer.content}
			</Button>
		);
    }

export default Answer;