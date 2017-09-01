const initSC = params => {
	window.SC.initialize(params);
};

export async function searchQuery(searchTerm = '', limit = 100) {
	try {
		const tracks = await window.SC.get('/tracks', {
			q: searchTerm,
			limit
		});

		return tracks;
	} catch (e) {
		return new Error(e);
	}
}

initSC({
	client_id: '8b4d6faddcc921664343f7420f4def20'
});
