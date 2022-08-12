import { publish } from 'gh-pages';

publish(
	'site', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/Jacoby-Y/CT-week7-day4-homework.git', // Update to point to your repository  
		user: {
			name: 'jacoby-y', // update to use your name
			email: 'cobyyliniemi@gmail.com' // Update to use your email
		}
	},
	() => {
		console.log('Deploy Complete!')
	}
)