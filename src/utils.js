export const getImageURL = (path) => {
    return `/assets/${path}`;
}

export const getProjects = async () => {
    const response = await fetch('/src/data/projects.json');
    if (!response.ok) {
        throw new Error('Failed to fetch projects data');
    }
    return response.json();
}