import PropTypes from "prop-types";
import classnames from 'classnames';
import { Spinner } from "@wordpress/components";

import "./style.scss";

function DisabledLoading({ children, isLoading }) {
	const wrapperClass = classnames("disabled-loading", {
		loading: isLoading,
	});

	return (
		<div className={wrapperClass}>
			{children}
			{isLoading && (
				<div className="loading-spinner">
					<Spinner />
				</div>
			)}
		</div>
	);
}

DisabledLoading.propTypes = {
	/** Is currently loading? */
	isLoading: PropTypes.bool.isRequired,
};

export default DisabledLoading;
