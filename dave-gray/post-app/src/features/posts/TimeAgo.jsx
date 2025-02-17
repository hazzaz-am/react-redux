import { formatDistanceToNow, parseISO } from "date-fns";

// eslint-disable-next-line react/prop-types
const TimeAgo = ({ timestamp }) => {
	let timeAgo = "";

	if (timestamp) {
    console.log('TIME STAMP', timestamp)
		const date = parseISO(timestamp);
		console.log("parseISO", date);
		const timePeriod = formatDistanceToNow(date);
		console.log("DISTANCE", timePeriod);
		timeAgo = `${timePeriod} ago`;
	}

	return (
		<span title={timestamp}>
			&nbsp; <i>{timeAgo}</i>
		</span>
	);
};
export default TimeAgo;
