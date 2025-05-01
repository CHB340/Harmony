
import { View, Text, FlatList, Image, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Post } from './post'; // Import the Post interface

interface HomeScreenProps {
    posts: Post[];
}

export default function HomeScreen({ posts }: HomeScreenProps) {
    const [search, setSearch] = useState('');

    // Fallback if posts are undefined or null
    const filteredPosts = (posts || []).filter(post =>
        post.country.toLowerCase().includes(search.toLowerCase())
    );

    // Display the most recent post as a "Featured" post
    const featuredPost = filteredPosts[0];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Explore the World</Text>
            <Text style={styles.subHeader}>Find posts by country</Text>

            {/* Featured Post */}
            {featuredPost && (
                <View style={styles.featuredCard}>
                    <Text style={styles.featuredTitle}>Featured Post</Text>
                    <Text style={styles.username}>{featuredPost.username}</Text>
                    <Image source={{ uri: featuredPost.image }} style={styles.image} />
                    <Text style={styles.caption}>{featuredPost.caption}</Text>
                    <Text style={styles.country}>Location: {featuredPost.country}</Text>
                </View>
            )}

            {/* Search Box */}
            <TextInput
                style={styles.input}
                placeholder="Search by country..."
                value={search}
                onChangeText={setSearch}
            />

            {/* Display filtered posts */}
            <FlatList
                data={filteredPosts.slice(1)} // Skip the first item as it's featured
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.username}>{item.username}</Text>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.caption}>{item.caption}</Text>
                        <Text style={styles.country}>Location: {item.country}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
    },
    featuredCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    featuredTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 15,
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    username: { fontWeight: 'bold', fontSize: 16 },
    image: { height: 200, borderRadius: 8, marginVertical: 10 },
    caption: { fontStyle: 'italic', fontSize: 14 },
    country: { fontSize: 12, color: '#888' },
});
