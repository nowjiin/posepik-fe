import PropTypes from 'prop-types';
import * as S from './AccuracyBar.style';
import Ranking from '@assets/svg/icon-ranking.svg';

export default function AccuracyBar({ percentage }) {
	return (
		<S.Container>
			<S.RankingImg src={Ranking} alt="퍼센트" />
			<S.Text>{percentage}%</S.Text>
		</S.Container>
	);
}

AccuracyBar.propTypes = {
	percentage: PropTypes.string.isRequired,
};
