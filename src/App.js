import React, { useEffect, useState } from 'react'; 
import AlanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import wordsToNumbers from 'words-to-numbers';
import { Typography } from '@material-ui/core';

const alanKey = '5c7070170fda27f974c666b61d1603232e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
	const [newsArticles, setNewsArticles] = useState([]);
	const [activeArticle, setActiveArticle] = useState(0);
	// const [isOpen, setIsOpen] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		AlanBtn({
			key: alanKey,
			onCommand: ({ command, articles, number }) => {
				if (command === 'newHeadlines') {
					setNewsArticles(articles);
					setActiveArticle(-1);
				} else if (command === 'highlight') {
					setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
				} else if (command === 'open') {
					const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
					const article = articles[parsedNumber - 1];

					if (parsedNumber > 20) {
						AlanBtn().playText('Please Try that again!');
					} else if (article) {
						window.open(articles[number].url, '_blank');
						AlanBtn().playText('Opening...');
					}
				}
			}
		})
	}, []);

	return (
		 <div>
			<div className={classes.logoContainer}>
				<img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="logo" />
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle} />
			<div className={classes.footer}>
				<Typography variant="body1" component="h2">
					A project by
					<a className={classes.link} href="https://www.linkedin.com/in/htuwar08/"> Harsh Tuwar</a>
				</Typography>
			</div>
		</div>
	);
}

export default App;