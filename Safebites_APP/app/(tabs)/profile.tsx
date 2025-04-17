import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCustomFonts } from '../fonts';

interface User {
  name: string;
  age: string;
  allergy: string;
  dietPreference: string;
}

const Profile = () => {
  const fontsLoaded = useCustomFonts();
  const [user, setUserData] = useState<User | null>(null);

  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const user = JSON.parse(token);
        setUserData(user);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Token removed successfully");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };

  const logout = () => {
    removeToken();
    router.navigate("/login");
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getAllergies = () => {
    return user?.allergy.split(',').map(allergy => allergy.trim()) || [];
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      {user ? (
        <>
          {/* Enhanced Header with Gradient */}
          <LinearGradient
            colors={['#60A5FA', '#3B82F6', '#2563EB']}
            style={styles.headerGradient}
          >
            <Text style={styles.headerTitle}>Allergy Detection Profile</Text>
            
            <View style={styles.profileSection}>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userTitle}>Safety First Member</Text>
              </View>
              <View style={styles.profileImageContainer}>
                <Image
                  source={require("../../assets/images/Login.png")}
                  style={styles.profileImage}
                />
              </View>
            </View>
          </LinearGradient>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="calendar-outline" size={24} color="#2563EB" />
              <Text style={styles.statValue}>{user.age}</Text>
              <Text style={styles.statLabel}>Age</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="nutrition-outline" size={24} color="#2563EB" />
              <Text style={styles.statValue}>{getAllergies().length}</Text>
              <Text style={styles.statLabel}>Allergies</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="restaurant-outline" size={24} color="#2563EB" />
              <Text style={styles.statValue}>Active</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>

          {/* Detailed Information */}
          <View style={styles.detailsContainer}>
            {/* Diet Preferences */}
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="restaurant" size={24} color="#2563EB" />
                <Text style={styles.cardTitle}>Dietary Preferences</Text>
              </View>
              <Text style={styles.cardContent}>{user.dietPreference}</Text>
            </View>

            {/* Allergies */}
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="warning" size={24} color="#2563EB" />
                <Text style={styles.cardTitle}>Your Allergies</Text>
              </View>
              <View style={styles.allergyContainer}>
                {getAllergies().map((allergy, index) => (
                  <View key={index} style={styles.allergyTag}>
                    <Text style={styles.allergyText}>{allergy}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Safety Tips */}
            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="shield-checkmark" size={24} color="#2563EB" />
                <Text style={styles.cardTitle}>Safety Tips</Text>
              </View>
              <Text style={styles.cardContent}>
                Always scan products before consumption and keep your allergy profile updated.
              </Text>
            </View>

            {/* Enhanced Logout Button */}
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                style={styles.logoutGradient}
              >
                <SimpleLineIcons name="logout" size={24} color="white" />
                <Text style={styles.logoutText}>Sign Out</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading your profile...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },
  headerGradient: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 16,
    color: '#E0F2FE',
    marginBottom: 20,
    fontFamily: 'Fredoka-Medium',
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Fredoka-Bold',
  },
  userTitle: {
    fontSize: 16,
    color: '#BFDBFE',
    marginTop: 4,
    fontFamily: 'Fredoka-Medium',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 37,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginTop: 8,
    fontFamily: 'Fredoka-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontFamily: 'Fredoka',
  },
  detailsContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginLeft: 12,
    fontFamily: 'Fredoka-Bold',
  },
  cardContent: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
    fontFamily: 'Fredoka',
  },
  allergyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergyTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  allergyText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Fredoka-Medium',
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    fontFamily: 'Fredoka-Bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
    fontFamily: 'Fredoka-Medium',
  },
});

export default Profile;