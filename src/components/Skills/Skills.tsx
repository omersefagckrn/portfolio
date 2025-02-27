import { motion } from 'framer-motion';

const skills = [
	{ name: 'Next.js', color: 'from-green-500 to-green-400 dark:from-[#008000] dark:to-[#00FF00]' },
	{ name: 'React', color: 'from-blue-400 to-cyan-400 dark:from-[#61DAFB] dark:to-[#00B4D8]' },
	{ name: 'TypeScript', color: 'from-blue-500 to-blue-400 dark:from-[#3178C6] dark:to-[#5C9EED]' },
	{ name: 'Node.js', color: 'from-green-600 to-green-500 dark:from-[#539E43] dark:to-[#76B947]' },
	{ name: 'MongoDB', color: 'from-green-500 to-green-400 dark:from-[#47A248] dark:to-[#69CC5B]' },
	{ name: 'MySQL', color: 'from-blue-600 to-blue-500 dark:from-[#4479A1] dark:to-[#5C9EED]' },
	{ name: 'Redux', color: 'from-purple-600 to-purple-500 dark:from-[#764ABC] dark:to-[#9B6EE3]' },
	{ name: 'TailwindCSS', color: 'from-cyan-500 to-cyan-400 dark:from-[#38BDF8] dark:to-[#5CC2F8]' },
	{ name: 'Docker', color: 'from-blue-500 to-blue-400 dark:from-[#2496ED] dark:to-[#47B3FF]' },
	{ name: 'Git', color: 'from-orange-600 to-orange-500 dark:from-[#F05032] dark:to-[#FF7259]' },
	{ name: 'GraphQL', color: 'from-pink-600 to-pink-500 dark:from-[#E535AB] dark:to-[#FF5CC6]' },
	{ name: 'React Native', color: 'from-blue-400 to-cyan-400 dark:from-[#61DAFB] dark:to-[#00B4D8]' },
	{ name: 'AWS', color: 'from-orange-500 to-orange-400 dark:from-[#FF9900] dark:to-[#FFB84D]' },
	{ name: 'Python', color: 'from-yellow-500 to-yellow-400 dark:from-[#FFD700] dark:to-[#FFA500]' },
	{ name: 'Django', color: 'from-green-500 to-green-400 dark:from-[#47A248] dark:to-[#69CC5B]' },
	{ name: 'Express', color: 'from-green-600 to-green-500 dark:from-[#539E43] dark:to-[#76B947]' }
];

const SkillsRow = ({ direction = 'left', speed = 25 }: { direction?: 'left' | 'right'; speed?: number }) => {
	return (
		<div className='relative flex overflow-hidden dark:bg-dark-bg/20'>
			<div className='absolute left-0 z-10 w-20 h-full bg-gradient-to-r from-white dark:from-dark-bg to-transparent' />
			<div className='absolute right-0 z-10 w-20 h-full bg-gradient-to-l from-white dark:from-dark-bg to-transparent' />

			<motion.div
				className='flex gap-6 py-4'
				animate={{
					x: direction === 'left' ? ['-50%', '0%'] : ['0%', '-50%']
				}}
				transition={{
					duration: speed,
					ease: 'linear',
					repeat: Infinity
				}}
			>
				{[...skills, ...skills].map((skill, index) => (
					<div key={index} className='flex items-center px-6 py-3 text-[14px] font-medium bg-gradient-to-r shadow-gray-200/20 dark:shadow-none'>
						<span className={`bg-gradient-to-r ${skill.color} bg-clip-text text-transparent font-semibold whitespace-nowrap`}>{skill.name}</span>
					</div>
				))}
			</motion.div>
		</div>
	);
};

export const Skills = () => {
	return (
		<div className='w-full py-20 bg-white dark:bg-dark-bg'>
			<div className='container px-4 mx-auto '>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className='mb-12 text-3xl font-bold text-center text-gray-900 dark:text-white'
				>
					Teknolojilerim
				</motion.h2>
				<div className='flex flex-col gap-8'>
					<SkillsRow direction='right' speed={50} />
				</div>
			</div>
		</div>
	);
};

export default Skills;
