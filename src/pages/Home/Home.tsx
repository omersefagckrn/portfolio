import { Helmet } from 'react-helmet-async';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import FAQ from '../../components/FAQ/FAQ';
import Footer from '../../components/Footer/Footer';

const Home = () => {
	return (
		<>
			<Helmet>
				<title>Ömer Sefa Güçkıran | Full Stack Developer</title>
				<meta name='description' content='Modern web teknolojileri ile özel çözümler geliştiren Full Stack Developer. React, Node.js ve daha fazlası.' />
			</Helmet>

			<main>
				<Hero />
				<About />
				<FAQ />
				<Footer />
			</main>
		</>
	);
};

export default Home;
