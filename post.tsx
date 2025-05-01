import { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export interface Post {
    id: string;
    username: string;
    image: string;
    caption: string;
    country: string;
}

interface PostScreenProps {
    addPost: (post: Post) => void; // Expecting this function as a prop
}

export default function PostScreen({ addPost }: PostScreenProps) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [country, setCountry] = useState('');

    // Function to pick an image
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Handling the submission of the post
    const handlePost = () => {
        if (image && caption && country) {
            const newPost: Post = {
                id: Math.random().toString(),
                username: 'Traveler123', // This could be dynamic based on logged-in user
                image: image,
                caption: caption,
                country: country,
            };

            addPost(newPost); // Call addPost to add the new post to the parent component
            setCaption('');
            setImage(null);
            setCountry('');
        } else {
            alert('Please fill all fields!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📸 Share Your Story</Text>
            <Button title="Pick an Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.preview} />}
            <TextInput
                placeholder="Write a caption..."
                value={caption}
                onChangeText={setCaption}
                style={styles.input}
            />
            <TextInput
                placeholder="Enter a country..."
                value={country}
                onChangeText={setCountry}
                style={styles.input}
            />
            <Button title="Post" onPress={handlePost} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { fontSize: 22, marginBottom: 10 },
    preview: { height: 200, borderRadius: 10, marginVertical: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
    },
});
