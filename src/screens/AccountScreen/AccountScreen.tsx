import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Wordmark } from '../../components/atoms/Wordmark';
import { MenuRow } from '../../components/molecules/MenuRow';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { useBooking } from '../../hooks/useBooking';
import { fullName, initials } from '../../services/profile.services';
import { openWhatsAppDirect } from '../../services/whatsapp.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList, TabParamList } from '../../types/navigation';
import { DeleteAccountSheet } from './components/DeleteAccountSheet';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Account'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function AccountScreen({ navigation }: Props) {
  const { profile, signedIn, signOut, deleteAccount } = useBooking();
  const [deleting, setDeleting] = useState(false);
  const name = signedIn ? fullName(profile) : '';

  return (
    <ScreenScaffold scroll safeBottom={false}>
      <View style={styles.brand}>
        <Wordmark size={28} />
      </View>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{(signedIn && initials(profile)) || 'G'}</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>{name || 'Guest'}</Text>
          {signedIn && profile.email ? (
            <Text style={styles.email}>{profile.email}</Text>
          ) : (
            <Text style={styles.email}>Add your details for faster booking</Text>
          )}
        </View>
        <Pressable
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.edit}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>Your account</Text>
      <View style={styles.group}>
        <MenuRow
          icon="calendar-month-outline"
          title="My appointments"
          onPress={() => navigation.navigate('Appointments')}
        />
        <MenuRow
          icon="bell-outline"
          title="Notifications"
          onPress={() => navigation.navigate('Notifications')}
        />
        <MenuRow
          icon="whatsapp"
          title="Contact us"
          onPress={() => openWhatsAppDirect()}
          last
        />
      </View>

      <Text style={styles.section}>Salon</Text>
      <View style={styles.group}>
        <MenuRow title="About us" onPress={() => navigation.navigate('About')} />
        <MenuRow title="Our team" onPress={() => navigation.navigate('Team')} />
        <MenuRow
          title="Services"
          onPress={() => navigation.navigate('Services')}
          last
        />
      </View>

      <Text style={styles.section}>Settings</Text>
      <View style={styles.group}>
        <MenuRow
          icon="bell-outline"
          title="Notification preferences"
          onPress={() => navigation.navigate('NotificationSettings')}
        />
        <MenuRow title="Privacy policy" onPress={() => navigation.navigate('Privacy')} />
        <MenuRow
          title="Terms & conditions"
          onPress={() => navigation.navigate('Terms')}
          last
        />
      </View>

      <View style={[styles.group, styles.spaced]}>
        <MenuRow
          icon="delete-outline"
          title="Delete Account"
          danger
          onPress={() => setDeleting(true)}
        />
        <MenuRow
          icon="logout"
          title="Log out"
          last
          onPress={() =>
            Alert.alert('Log out?', undefined, [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log out', onPress: signOut },
            ])
          }
        />
      </View>

      <DeleteAccountSheet
        visible={deleting}
        onClose={() => setDeleting(false)}
        onDelete={() => {
          setDeleting(false);
          deleteAccount();
        }}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  brand: {
    paddingTop: 8,
    paddingBottom: 18,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
  },
  initials: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  profileCopy: {
    flex: 1,
  },
  name: {
    ...typography.sectionTitle,
    color: colors.ink,
  },
  email: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  edit: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  editText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.ink,
  },
  section: {
    ...typography.label,
    color: colors.muted,
    marginTop: 22,
    marginBottom: 10,
  },
  group: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  spaced: {
    marginTop: 22,
    marginBottom: 28,
  },
});
