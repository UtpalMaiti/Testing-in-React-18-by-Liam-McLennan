export const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']

export function getPlanets(): Promise<string[]> {
    return Promise.resolve(planets);
}