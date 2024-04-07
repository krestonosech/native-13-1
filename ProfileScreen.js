import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View, FlatList } from 'react-native';

const Stack = createNativeStackNavigator();

const contacts = [
  { id: 1, name: 'Ванек', phone: '228-228-1337', address: 'улица пушкина' },
  { id: 2, name: 'Вован', phone: '228-228-1337', address: 'дом колотушкина' },
  { id: 2, name: 'Владос', phone: '228-228-1337', address: '))))))))' },
];

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Контакты' }}
        />
        <Stack.Screen name="Профиль" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() =>
              navigation.navigate('Профиль', { contact: item })
            }
          />
        )}
      />
    </View>
  );
};

const ProfileScreen = ({ route }) => {
  const { contact } = route.params;

  return (
    <View>
      <Text>{contact.name}</Text>
      <Text>{contact.phone}</Text>
      <Text>{contact.address}</Text>
    </View>
  );
};

export default MyStack;
