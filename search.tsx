import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';

// ✅ Define a Country type
type Country = {
    name: string;
    region: string;
    population: number;
};

export default function SearchScreen() {
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((res) => res.json())
            .then((data) => {
                const formatted: Country[] = data.map((country: any) => ({
                    name: country.name.common,
                    region: country.region,
                    population: country.population,
                }));
                setCountries(formatted);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching country data:', error);
                setLoading(false);
            });
    }, []);

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for a country..."
                value={search}
                onChangeText={setSearch}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#555" />
            ) : (
                <FlatList
                    data={filteredCountries}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.countryCard}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.info}>Region: {item.region}</Text>
                            <Text style={styles.info}>
                                Population: {item.population.toLocaleString()}
                            </Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    countryCard: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        color: '#333',
    },
});
