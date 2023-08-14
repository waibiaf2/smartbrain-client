import React, {Component} from 'react';

class RegisterForm extends  Component{
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}

	onNameChange(e) {
		this.setState({name: e.target.value})
	}

	onEmailChange(e) {
		this.setState({email: e.target.value})
	}

	onPasswordChange(e) {
		this.setState({password: e.target.value})
	}

	onSubmitRegistrations() {
		fetch('http://localhost:3001/register', {
			method: 'post',
			headers:{'Content-Type': 'application/json'},
			body:JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})

		})
			.then(response => response.json())
			.then(data => {
				if (data === 'success') {
					this.props.onRouteChange('signin')
				} else {
					this.props.onRouteChange('register');
				}
			});
	}

	render(){
		return (
			<article className="mw5 center w-100 w-50-m mw6 shadow-5 br3 pa3 pa4-ns mv3 ba b--black-10">
				<main className="pa4 black-80">
					<form className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
								<input
									onChange={(e) => this.onNameChange(e)}
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="text"
									name="name"
									id="name"/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input
									onChange={(e)=>this.onEmailChange(e)}
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input
									onChange={(e) => this.onPasswordChange(e)}
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"/>
							</div>
						</fieldset>
						<div className="">
							<input
								onClick={() => this.onSubmitRegistrations()}
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Register"
							/>
						</div>

					</form>
				</main>
			</article>
		);
	}
};

export default RegisterForm;
