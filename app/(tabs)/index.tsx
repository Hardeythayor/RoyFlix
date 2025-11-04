import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import ThemedView from "@/components/ThemedView";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, StatusBar, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()

  const {data: trendingMovies, loading: trendingLoading, error: trendingError} = useFetch(getTrendingMovies)
 
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({query: ''}))

  return (
    <ThemedView>
      <StatusBar />
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5"/>

        {moviesLoading || trendingLoading ?
          <ActivityIndicator 
            size="large" 
            color="#ffffff"
            className="mt-10 self-center"
          />
        : moviesError || trendingError ?
          <Text 
            className="text-white"
          >
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        :
          <View className="flex-1 mt-5">
            <SearchBar 
              placeholder="Search for a movie..."
              onPress={() => router.push('/search')}
            />

            <>
              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                    data={trendingMovies}
                    renderItem={({item, index}) => (
                      <TrendingCard movie={item} index={index}/>
                    )}
                    keyExtractor={(item) => item.id}
                    className="mb-4 mt-3"
                  />
                </View>
              )}

              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList 
                data={movies}
                renderItem={({item}) => (
                  <MovieCard {...item}/>
                )}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        }

      </ScrollView>
    </ThemedView>
  );
}
