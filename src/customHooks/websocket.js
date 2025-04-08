import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { triggerChange } from '../redux/changeOccurSlice';
import { backendUrl } from '../config';

const socket = io(backendUrl);

export function useWebSocketUpdates() {
	const dispatch = useDispatch();

	useEffect(() => {
		socket.connect();
		socket.on('artifactChange', (update) => {
			console.log('Artifact change detected:', update);
			dispatch(triggerChange()); // Notify Redux of a change
		});

		return () => {
			socket.off('artifactChange');
		};
	}, [dispatch]);
}
