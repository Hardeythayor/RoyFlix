import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import ThemedView from '@/components/ThemedView'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError, 
    refetch: loadMovies,
    reset 
  } = useFetch(() => fetchMovies({query: searchQuery}), true)

  useEffect(() => {
    const timeoutId =  setTimeout(async() => {
      if(searchQuery.trim()) {
        await loadMovies()

        if(movies?.length > 0 && movies?.[0]) {
          updateSearchCount(searchQuery, movies[0])
        }
      } else {
        reset()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <ThemedView>
      <Image 
        source={images.bg}
        className='absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList 
        data={movies}
        renderItem={({item}) => (
          <MovieCard {...item}/>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        className="mt-2 pb-32 px-5"
        contentContainerStyle={{paddingBottom: 100}}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center items-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='my-5'>
              <SearchBar 
                placeholder='Search movies...' 
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator 
                size="large" 
                color="#ffffff"
                className="mt-10 self-center"
              />
            )}

            {moviesError && (
              <Text 
                className="text-white"
              >
                Error: {moviesError?.message}
              </Text>

            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for {' '}
                <Text className='text-accentText'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-gray-300 text-center '>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
      
    </ThemedView>
  )
}

export default search