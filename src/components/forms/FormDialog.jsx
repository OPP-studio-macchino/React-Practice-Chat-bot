import React from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import {TextInput} from '../index';

export default class FormDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			description: "",
		};

		this.inputName = this.inputName.bind(this);
		this.inputEmail = this.inputEmail.bind(this);
		this.inputDescription = this.inputDescription.bind(this);
	}

	inputName = (e) => {
		this.setState({ name: e.target.value });
	};
	inputEmail = (e) => {
		this.setState({ email: e.target.value });
	};
	inputDescription = (e) => {
		this.setState({ description: e.target.value });
	};

    validateEmailFormat = (email) => {
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return regex.test(email)
    }

    validateRequiredInput = (...args) => {
        let isBlank = false;
        for (let i = 0; i < args.length; i=(i+1)|0) {
            if (args[i] === "") {
                isBlank = true;
            }
        }
        return isBlank
    };

	submitForm = () => {
        const name = this.state.nameconst
        const email = this.state.email
        const description = this.state.description

        const payload = {
            text: 'お問合せがありました\n' +
                'お名前:' + name + '\n' +
                'Email:' + email + '\n' +
                'お問合せ内容:\n' + description
        }

        const url = "https://hooks.slack.com/services/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";

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました。追ってご連絡いたします。')
            this.setState({
                name: '',
                email: '',
                description: ''
            })
            return this.props.handleClose()
        })
    }

	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"お問合せフォーム"}</DialogTitle>
				<DialogContent>
					<TextInput
						label={"お名前（必須）"}
						multiline={false}
						rows={1}
						value={this.state.name}
						type={"text"}
						onChange={this.inputName}
					/>
					<TextInput
						label={"メールアドレス（必須）"}
						multiline={false}
						rows={1}
						value={this.state.email}
						type={"email"}
						onChange={this.inputEmail}
					/>
					<TextInput
						label={"お問合せ内容(必須）"}
						multiline={false}
						rows={5}
						value={this.state.description}
						type={"text"}
						onChange={this.inputDescription}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.handleClose}>キャンセル</Button>
					<Button onClick={this.submitForm} autoFocus>
						送信する
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
