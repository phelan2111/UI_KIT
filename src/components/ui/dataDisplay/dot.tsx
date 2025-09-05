export type DotProps = {
	quantityNodes: number;
	index: number;
	className?: string;
};
function Traditional({ className = 'bottom-0', ...props }: DotProps) {
	return (
		<div className={`absolute ${className}`}>
			<div className='flex gap-1'>
				{Array.from({ length: props.quantityNodes }).map((_, i) => {
					const isVisible = i === props.index;

					return (
						<div
							style={{
								background: isVisible ? '#039855' : '#EAEAEA',
								width: isVisible ? 24 : 8,
							}}
							key={`ChildSwiper_${i}`}
							className='h-[3px] rounded-[16px] transition-all duration-500'
						/>
					);
				})}
			</div>
		</div>
	);
}

function Modern({ className = 'bottom-1', ...props }: DotProps) {
	return (
		<div className={`absolute ${className}`}>
			<div
				style={{
					background: `${'#039855'}30`,
					width: props.quantityNodes * 24,
				}}
				className='flex gap-1 relative rounded-[14px] overflow-hidden'>
				<div
					style={{
						transform: `translateX(${24 * props.index}px)`,
						background: '#039855',
					}}
					className='w-[24px] h-1 rounded-[14px] transition-all duration-300'></div>
			</div>
		</div>
	);
}

export const Dot = {
	Traditional,
	Modern,
};
