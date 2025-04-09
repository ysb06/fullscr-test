import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, ActivityIndicator, View, SafeAreaView, Text } from 'react-native';
import { WebView } from 'react-native-webview';

interface MainTestViewProps {
  url?: string;
}

export default function MainTestView({ url = 'https://www.google.com' }: MainTestViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // URL 유효성 검사
  const validUrl = url && url.startsWith('http') ? url : 'https://www.google.com';

  useEffect(() => {
    console.log('Attempting to load URL:', validUrl);
  }, [validUrl]);

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>페이지를 불러올 수 없습니다.</Text>
        </View>
      ) : (
        <WebView
          source={{ uri: validUrl }}
          style={styles.webview}
          onLoadStart={() => {
            setLoading(true);
            setError(false);
          }}
          onLoadEnd={() => setLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView error: ', nativeEvent);
            setLoading(false);
            setError(true);
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          // 추가할 부분
          originWhitelist={['*']}
          mixedContentMode="always"
          androidHardwareAccelerationDisabled={true}
        />
      )}
      {loading && !error && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  }
});