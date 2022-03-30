import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import context from '../store/context';
import Wrapper from './styles/Playlists.style';

function Playlists() {
	const history = useHistory();
	const { state } = useContext(context);
	const { collectionPlaylists = {}, collectionTrackList, auth } = state || {};
	const { items: trackList = [] } = collectionTrackList;

	const goToCollectionTrack = (e) => {
		e.preventDefault();

		history.push('/collection/tracks');
	};

	const goToPlaylistByUid = (e, uri) => {
		e.preventDefault();
		const uid = (uri || '').split(':').pop() || '';

		if (!uid) return;
		history.push(`/playlist/${uid}`);
	};

	return (
		<Wrapper>
			<h2>播放清單</h2>
			<div className="playlists__wrapper">
				<div className="playlists__item-wrapper collection" onClick={goToCollectionTrack}>
					<div className="collected-track">
						<div>已按讚的歌曲</div>
						<div>{trackList.length} 已按讚的歌曲</div>
					</div>
				</div>
				{collectionPlaylists?.items?.map((list, i) => {
					const isMyselfList = list.owner.display_name === auth.display_name;
					const owner = list.owner.display_name;
					const playlistName = list.name;
					const playlistDesc = list.description;
					const uri = list.uri;

					return (
						<div
							className="playlists__item-wrapper"
							key={`playlists-item-${i + 1}`}
							onClick={(e) => goToPlaylistByUid(e, uri)}
						>
							<div className="item__image-wrapper">
								<img src={list?.images[0]?.url} alt="playlist cover" />
							</div>
							<div className="item__basic-info">
								<div className="item-name">{playlistName}</div>
								<div className="item-description">
									{isMyselfList ? `來自 ${owner}` : `${playlistDesc}`}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Wrapper>
	);
}

export default Playlists;
