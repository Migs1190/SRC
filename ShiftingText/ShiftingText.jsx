import { useEffect, useRef, useState } from 'react';

const letterPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

const ShiftingText = ({ content, onHoverOnly = true, time = 100, delay = 0 }) => {
	const [displayed, setDisplayed] = useState(content);
	const effect = useRef(null);
	const intervalRef = useRef(null);
	const timeoutRef = useRef(null);

	const getRandomLetter = () => {
		return letterPool[Math.floor(Math.random() * letterPool.length)];
	};

	const handleEffect = () => {
		let iterate = 0;
		const iterateMax = content.length;

		clearInterval(intervalRef.current);
		clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			intervalRef.current = setInterval(() => {
				if (iterate > iterateMax) {
					clearInterval(intervalRef.current);
					return;
				}
				setDisplayed(
					content.slice(0, iterate) +
						Array.from({ length: iterateMax - iterate }, getRandomLetter).join('')
				);
				iterate++;
			}, time);
		}, delay);
	};

	useEffect(() => {
		if (!onHoverOnly) {
			handleEffect();
		}
		return () => {
			clearInterval(intervalRef.current);
			clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<div
			ref={effect}
			onMouseOver={onHoverOnly ? handleEffect : undefined}
			style={{ cursor: 'default', userSelect: 'none' }}>
			{displayed}
		</div>
	);
};

export default ShiftingText;
