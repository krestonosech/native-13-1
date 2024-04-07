import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet  } from 'react-native';
import * as FileSystem from 'expo-file-system';

const GifGallery = () => {
  const [gifFiles, setGifFiles] = useState([]);

  useEffect(() => {
    const directoryUri = FileSystem.documentDirectory + 'gifs/';
    const assetsUri = FileSystem.assetDirectory + 'gifs/';

    FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true }).then(() => {
      FileSystem.readDirectoryAsync(assetsUri)
        .then((files) => {
          const gifFiles = files.filter((file) => file.endsWith('.gif'));
          const promises = gifFiles.map((file) =>
            FileSystem.copyAsync({
              from: `${assetsUri}${file}`,
              to: `${directoryUri}${file}`,
            })
          );
          return Promise.all(promises);
        })
        .then(() => {
          FileSystem.readDirectoryAsync(directoryUri)
            .then((files) => {
              setGifFiles(files.filter((file) => file.endsWith('.gif')));
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    });
  }, []);

  const renderGif = ({ item }) => {
    return (
      <View style={styles.gifContainer}>
        <Image source={{ uri: `file://${FileSystem.documentDirectory}gifs/${item}` }} style={styles.gif} />
      </View>
    );
  };

  return (
    <FlatList
      data={gifFiles}
      renderItem={renderGif}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.gallery}
    />
  );
};

const styles = StyleSheet.create({
  gifContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  gallery: {
    paddingHorizontal: 10,
  },
});

export default GifGallery;