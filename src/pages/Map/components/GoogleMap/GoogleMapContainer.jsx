import { Status, Wrapper } from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleMap';

const render = status => {
	switch (status) {
		case Status.LOADING:
			return <>⏳ 로딩중...</>;
		case Status.FAILURE:
			return <>❌ 에러 발생</>;
		case Status.SUCCESS:
			return <GoogleMap />;
		default:
			return <>❌ 에러 발생</>;
	}
};

function GoogleMapContainer() {
	return <Wrapper apiKey={import.meta.env.VITE_APP_GOOGLE_MAP_KEY} render={render} libraries={['places', 'marker']} />;
}

export default GoogleMapContainer;
