import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import context from '../store/context';
import { actions } from '../store/action';

import Wrapper from './styles/Genre.style';

const Genre = () => {
	const history = useHistory();
	const { gUid } = useParams();
	const { state, dispatch } = useContext(context);
	const { categoryPlaylists } = state || {};
	const { playlists, name } = categoryPlaylists || {};

	useEffect(() => {
		dispatch(actions.getCategoryPlaylistsById({ category_id: gUid, limit: 50, offset: 0 }));

		return () => {
			dispatch(actions.resetCategoryPlaylists());
		};
	}, [dispatch, gUid]);

	const goToPlayList = (e, id) => {
		e.preventDefault();

		if (id) {
			history.push(`/playlist/${id}`);
		}
	};

	return (
		<Wrapper>
			<div className="genre-list-name">{name}</div>
			<div className="genre-list__items-wrapper">
				{playlists?.items?.map((item) => (
					<div className="genre-list__item" key={item.id} onClick={(e) => goToPlayList(e, item.id)}>
						<div className="genre-list__item-image-wrapper">
							<img src={item?.images[0]?.url} alt={item?.name} />
						</div>
						<div className="genre-list__item-basic-info">
							<div className="item-basic-name">{item?.name}</div>
							<div className="item-basic-description">{item?.description}</div>
						</div>
					</div>
				))}
			</div>
		</Wrapper>
	);
};

export default Genre;
