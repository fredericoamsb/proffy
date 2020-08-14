import React, { useState } from 'react';
import { View, AsyncStorage, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <FlatList
        style={styles.teacherList}
        data={favorites}
        renderItem={({ item }: { item: Teacher }) => (
          <TeacherItem
            key={item.id}
            teacher={item}
            favorited
          />
        )}
      />
    </View >
  );
}

export default Favorites;