'use strict';

const UserContext = React.createContext({});

const defaultState = {
	currentUser: null
};

class UserProvider extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = { ...defaultState };
	}

	componentDidMount() {
		this._getCurrentUser();
	}

	render() {
		const { children } = this.props;
		const { currentUser } = this.state;

		return (
			<UserContext.Provider value = {{ currentUser }} >
				{children}
			</UserContext.Provider>
		);
	}

	_getCurrentUser() {
		fetch('/currentUser')
		.then((response) => response.json())
		.then((data) => {
			this.setState({ currentUser: data });
		})
		.catch((err) => {
			console.error(err);
		});
	}
}

const Homepage = () => {
	return (
		<div>
			<h2>Welcome!</h2>
			<UserContext.Consumer>
				{(context) => {
					const { currentUser } = context;
					return (
						<User 
							firstName={currentUser ? currentUser.firstName : ""} 
							lastName={currentUser ? currentUser.lastName : ""} /> 
						);
					}
				}
			</UserContext.Consumer>
		</div>
	);
};

const User = (props) => (
	<p>The current user is {props.firstName} {props.lastName}</p>
);


const App = () => (
	<UserProvider> 
		<Homepage />
	</UserProvider>
);

const domContainer = document.querySelector('#react-entry');
ReactDOM.render(React.createElement(App), domContainer);