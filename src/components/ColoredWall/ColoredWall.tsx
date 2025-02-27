import { ColoredWallProps } from '../../types/coloredwall';
import { motion } from 'framer-motion';

export const ColoredWall = ({ title, description }: ColoredWallProps) => {
	return (
		<div className='hidden w-1/2 lg:block'>
			<div className='relative flex items-center justify-center w-full h-full overflow-hidden'>
				<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='absolute inset-0'>
					<div className='absolute inset-0'>
						<div className='absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-primary-500/20 dark:from-primary-500/10 dark:to-primary-500/10' />
						<svg className='absolute inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.02]' xmlns='http://www.w3.org/2000/svg'>
							<defs>
								<pattern id='grid' width='24' height='24' patternUnits='userSpaceOnUse'>
									<path
										d='M24 0v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1h-1v1h1v1H0V0h1v1h1V0h1v1h1V0h1v1h1V0h1v1h1V0h1v1h1V0h1v1h1V0h1v1h1V0h1v1h1V0h1v1h1V0h1v1h1V0z'
										className='text-black fill-current stroke-none dark:text-white'
									/>
								</pattern>
							</defs>
							<rect width='100%' height='100%' fill='url(#grid)' />
						</svg>
					</div>
					<div className='absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent' />
				</motion.div>
				<div className='relative text-center text-gray-900 dark:text-white'>
					<h3 className='text-3xl font-bold'>{title}</h3>
					<p className='mt-2 text-lg'>{description}</p>
				</div>
			</div>
		</div>
	);
};
