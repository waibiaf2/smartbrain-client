import React from 'react';
import styles from './Navigation.module.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
		if (isSignedIn) {
			return (
				<nav className={styles.nav}>
					<p
						className="f3 link dim black underlined pa3 pointer"
						onClick={() => onRouteChange('signin') }
					>
						Sign Out
					</p>
				</nav>
			)
		} else {
			return (
				<nav className={styles.nav}>
					<p
						className="f3 link dim black underlined pa3 pointer"
						onClick={() => onRouteChange('signin') }
					>
						Sign In
					</p>
					<p
						className="f3 link dim black underlined pa3 pointer"
						onClick={() => onRouteChange('register') }
					>
						Register
					</p>
				</nav>
			)
		}
};

export default Navigation;
