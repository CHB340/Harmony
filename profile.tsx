import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://picsum.photos/200' }}  // Placeholder profile image
                style={styles.profileImage}
            />
            <Text style={styles.title}>👤 Your Profile</Text>
            <Text>Name: Traveler123</Text>
            <Text>Stories Posted: 2</Text>
            <Button title="Edit Profile" onPress={() => alert('Edit Profile (stub)')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
});
