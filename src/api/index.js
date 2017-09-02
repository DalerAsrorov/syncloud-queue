const initSC = params => {
    window.SC.initialize(params);
};

export async function searchQuery(searchTerm = '', limit = 100, options = {}) {
    try {
        const tracks = await window.SC.get('/tracks', {
            q: searchTerm,
            limit,
            ...options
        });

        return tracks;
    } catch (e) {
        return new Error(e);
    }
}

export function getClientID() {
    return '8b4d6faddcc921664343f7420f4def20';
}

initSC({
    client_id: getClientID()
});
