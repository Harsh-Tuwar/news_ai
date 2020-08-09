import React, { useEffect, useState } from 'react'; 
import AlanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import { Typography, Modal,  } from '@material-ui/core';

const alanKey = '5c7070170fda27f974c666b61d1603232e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
	const [newsArticles, setNewsArticles] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		AlanBtn({
			key: alanKey,
			onCommand: ({ command, articles }) => {
				if (command === 'newHeadlines') {
					setNewsArticles(articles);
				}
			}
		})
	}, []);

	return (
		 <div>
			<div className={classes.logoContainer}>
				<img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
			</div>
			<NewsCards articles={newsArticles} />
		</div>
	);
}

export default App;