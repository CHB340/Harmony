import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const countries = [
    { name: 'Canada', flag: 'https://flagcdn.com/w320/ca.png', fact: 'Canada has the longest coastline of any country.' },
    { name: 'Japan', flag: 'https://flagcdn.com/w320/jp.png', fact: 'Japan is home to the world’s oldest continuous monarchy.' },
    { name: 'Brazil', flag: 'https://flagcdn.com/w320/br.png', fact: 'Brazil has the largest rainforest in the world, the Amazon.' },
    { name: 'France', flag: 'https://flagcdn.com/w320/fr.png', fact: 'France is the world’s most visited country.' },
    { name: 'Australia', flag: 'https://flagcdn.com/w320/au.png', fact: 'Australia is both a country and a continent.' },
    { name: 'India', flag: 'https://flagcdn.com/w320/in.png', fact: 'India is the world’s largest democracy.' },
    // Add more countries as needed
];

export default function TabTwoScreen() {
    const [countryOfTheDay, setCountryOfTheDay] = useState<any>(null);

    useEffect(() => {
        // Select a random country from the static list
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        setCountryOfTheDay(randomCountry);
    }, []);

    if (!countryOfTheDay) return null; // Waiting for country data

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Country of the Day</Text>
            <View style={styles.card}>
                <Image source={{ uri: countryOfTheDay.flag }} style={styles.flagImage} />
                <Text style={styles.countryName}>{countryOfTheDay.name}</Text>
                <Text style={styles.fact}>{countryOfTheDay.fact}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    flagImage: {
        width: 60,
        height: 40,
        borderRadius: 5,
    },
    countryName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    fact: {
        fontSize: 14,
        marginTop: 5,
    },
});
