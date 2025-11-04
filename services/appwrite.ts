import { Client, ID, Query, TablesDB } from 'react-native-appwrite';

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const tableId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)

const database = new TablesDB(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listRows({
            databaseId,
            tableId,
            queries: [
                Query.equal('searchTerm', query)
            ]
        })

        if (result.rows.length > 0) {
            const existingMovie = result.rows[0];

            await database.updateRow(
                databaseId,
                tableId,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createRow({
                databaseId,
                tableId,
                rowId: ID.unique(),
                data: {
                    searchTerm: query,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movie_id: movie.id,
                    title: movie.title,
                }
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }


}

export const getTrendingMovies = async(): Promise<TrendingMovie | undefined> => {
    try {
        const result = await database.listRows({
            databaseId,
            tableId,
            queries: [
                Query.limit(5),
                Query.orderDesc('count'),
            ]
        })
        
        return result.rows as unknown as TrendingMovie
    } catch (error) {
        console.log(error)
        return undefined
    }
}