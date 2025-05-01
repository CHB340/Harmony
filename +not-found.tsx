// app/not-found.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function NotFound() {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>404 - Page Not Found</Text>
        <Text>The page you're looking for doesn't exist.</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'red', marginBottom: 10 },
});
