import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, title} : any) => (
    <>
        {focused ?
            <ImageBackground 
                source={images.highlight}
                className='flex flex-1 rounded-full flex-row w-full min-w-[100px] min-h-[60px] mt-6 justify-center items-center overflow-hidden'
            >
                <Image 
                    source={icon}
                    tintColor="#151312"
                    className='size-5'
                />
                <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
            </ImageBackground>
        :
            <View className='size-full rounded-full mt-6 justify-center items-center min-w-[100px] min-h-[60px]'>
                <Image 
                    source={icon}
                    tintColor="#A8B5DB"
                    className='size-5'
                />
                {/* <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text> */}
            </View>
        }
    </>
)

const _Layout = () => {
  return (
    <Tabs 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                backgroundColor: '#0f0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 60,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#0f0D23'
            }
        }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon 
                            icon={icons.home} 
                            title={'Home'}
                            focused={focused}
                        />
                    </>
                )
            }}
        />
        <Tabs.Screen 
            name='search'
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon 
                            icon={icons.search} 
                            title={'Search'}
                            focused={focused}
                        />
                    </>
                )
            }}
        />
        <Tabs.Screen 
            name='saved'
            options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon 
                            icon={icons.save} 
                            title={'Saved'}
                            focused={focused}
                        />
                    </>
                )
            }}
        />
        <Tabs.Screen 
            name='profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon 
                            icon={icons.person} 
                            title={'Profile'}
                            focused={focused}
                        />
                    </>
                )
            }}
        />
    </Tabs>
  )
}

export default _Layout