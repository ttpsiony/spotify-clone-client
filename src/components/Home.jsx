import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import context from '../store/context';
import { actions } from '../store/action';
import Wrapper from './styles/Home.style';
import { RecommendListWrapper } from './styles/common.style';

function Home() {
	const history = useHistory();
	const { state, dispatch } = useContext(context);
	const { featuredPlaylists = [] } = state;

	useEffect(() => {
		dispatch(actions.getFeaturedPlaylists());
		return () => {};
	}, [dispatch]);

	const historyPushHandler = (e, type, id) => {
		e.preventDefault();

		if (id) {
			history.push(`/${type}/${id}`);
		}
	};

	return (
		<Wrapper>
			<RecommendListWrapper>
				{featuredPlaylists
					.filter((list) => list.items.length > 0)
					.map((list, idx) => (
						<div className="recommendation-list-container" key={`recommendation-list-${idx + 1}`}>
							<div className="recommendation-list__title-wrapper">
								<div>
									<h2>{list.name}</h2>
									{list.id && (
										<span onClick={(e) => historyPushHandler(e, 'genre', list.id)}>查看全部</span>
									)}
								</div>
							</div>
							<div className="recommendation-list__items-wrapper">
								{list?.items
									?.filter((_, idx) => idx < 5)
									.map((item) => (
										<div
											className="recommendation-list__item"
											key={item.id}
											onClick={(e) => historyPushHandler(e, 'playlist', item.id)}
										>
											<div className="recommendation-list__item-image-wrapper">
												<img src={item?.images[0]?.url} alt={list.name} />
											</div>
											<div className="recommendation-list__item-basic-info">
												<div className="item-basic-name">{item.name}</div>
												<div className="item-basic-description">
													{item.description.replace(/<[^>]*>/g, '')}
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					))}
			</RecommendListWrapper>
		</Wrapper>
	);
}

export default Home;
