import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { SelectField } from '../../components/atoms/SelectField';
import { TextField } from '../../components/atoms/TextField';
import { OptionSheet } from '../../components/organisms/OptionSheet';
import { StackHeader } from '../../components/organisms/StackHeader';
import { useBooking } from '../../hooks/useBooking';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import {
  dialCodes,
  fullName,
  genders,
  initials,
  validateProfile,
  type ProfileErrors,
} from '../../services/profile.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { Profile } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';
import { formatBirthday } from '../../utils/dates';
import { BirthdaySheet } from './components/BirthdaySheet';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
type Sheet = 'birthday' | 'dial' | 'gender' | null;

const dialOptions = dialCodes.map(code => ({
  id: code.id,
  label: code.label,
  leading: code.flag,
  detail: code.id,
}));
const genderOptions = genders.map(gender => ({ id: gender, label: gender }));

export function EditProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { contentPadding, contentMaxWidth } = useResponsiveLayout();
  const { profile, updateProfile } = useBooking();
  const [form, setForm] = useState<Profile>(profile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [sheet, setSheet] = useState<Sheet>(null);
  const dial = dialCodes.find(code => code.id === form.dialCode);
  const name = fullName(form) || 'Your profile';
  const frame = {
    paddingHorizontal: contentPadding,
    width: '100%' as const,
    maxWidth: contentMaxWidth,
    alignSelf: 'center' as const,
  };

  const setField = (key: keyof Profile, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };

  const save = () => {
    const nextErrors = validateProfile(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      Toast.show({ type: 'error', text1: 'Please complete the required fields.' });
      return;
    }
    updateProfile(form);
    Toast.show({ type: 'success', text1: 'Profile saved' });
    navigation.goBack();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scroll, frame]}>
        <StackHeader title="Edit profile" onBack={() => navigation.goBack()} />

        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials(form)}</Text>
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>Account</Text>
            <Text style={styles.title}>Edit profile</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {name}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Personal details</Text>
          <View style={styles.row}>
            <View style={styles.half}>
              <TextField
                label="First name *"
                value={form.firstName}
                textContentType="givenName"
                placeholder="First name"
                errorText={errors.firstName}
                onChangeText={value => setField('firstName', value)}
              />
            </View>
            <View style={styles.half}>
              <TextField
                label="Last name *"
                value={form.lastName}
                textContentType="familyName"
                placeholder="Last name"
                errorText={errors.lastName}
                onChangeText={value => setField('lastName', value)}
              />
            </View>
          </View>

          <SelectField
            label="Birthday *"
            helper="Used for birthday offers and reminders."
            value={formatBirthday(form.dob)}
            placeholder="Choose a date"
            icon="calendar-blank-outline"
            errorText={errors.dob}
            onPress={() => setSheet('birthday')}
          />

          <SelectField
            label="Gender"
            value={form.gender}
            placeholder="Choose"
            onPress={() => setSheet('gender')}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Contact</Text>
          <TextField
            label="Email *"
            helper="Appointment updates and booking messages."
            value={form.email}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="you@email.com"
            errorText={errors.email}
            onChangeText={value => setField('email', value)}
          />

          <Text style={styles.label}>Phone number *</Text>
          <Text style={styles.helper}>
            Used for WhatsApp booking follow-ups. Message rates may apply.
          </Text>
          <View style={styles.phoneRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Country code"
              onPress={() => setSheet('dial')}
              style={styles.dial}>
              <Text style={styles.dialFlag}>{dial?.flag ?? '🌐'}</Text>
              <Text style={styles.dialCode}>{dial?.id ?? form.dialCode}</Text>
              <MaterialDesignIcons name="chevron-down" size={18} color={colors.muted} />
            </Pressable>
            <View style={styles.phone}>
              <TextField
                value={form.phone}
                placeholder="Mobile number"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                errorText={errors.phone}
                onChangeText={value => setField('phone', value)}
              />
            </View>
          </View>
        </View>

        <Text style={styles.footnote}>
          Your details stay on this device and help speed up booking requests.
        </Text>
      </ScrollView>

      <View
        style={[
          styles.footer,
          frame,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}>
        <PrimaryButton title="Save profile" onPress={save} style={styles.save} />
      </View>

      <BirthdaySheet
        visible={sheet === 'birthday'}
        value={form.dob}
        onChange={value => setField('dob', value)}
        onClose={() => setSheet(null)}
      />
      <OptionSheet
        visible={sheet === 'dial'}
        title="Country code"
        options={dialOptions}
        value={form.dialCode}
        onChange={value => setField('dialCode', value)}
        onClose={() => setSheet(null)}
      />
      <OptionSheet
        visible={sheet === 'gender'}
        title="Gender"
        options={genderOptions}
        value={form.gender}
        onChange={value => setField('gender', value)}
        onClose={() => setSheet(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 12,
    paddingBottom: 24,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 18,
    padding: 18,
    borderRadius: 24,
    backgroundColor: colors.ink,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copper,
    borderWidth: 2,
    borderColor: colors.copperSoft,
  },
  avatarText: {
    ...typography.sectionTitle,
    color: colors.parchment,
    fontSize: 24,
  },
  heroCopy: {
    flex: 1,
  },
  kicker: {
    ...typography.label,
    color: colors.copper,
  },
  title: {
    ...typography.serifTitle,
    color: colors.parchment,
    marginTop: 4,
  },
  subtitle: {
    ...typography.caption,
    color: 'rgba(246, 241, 232, 0.72)',
    marginTop: 4,
  },
  card: {
    marginBottom: 14,
    padding: 16,
    borderRadius: 22,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  section: {
    ...typography.label,
    color: colors.copper,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  half: {
    flex: 1,
  },
  label: {
    ...typography.label,
    color: colors.muted,
    marginBottom: 6,
  },
  helper: {
    ...typography.caption,
    color: colors.placeholder,
    marginBottom: 10,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  dial: {
    minHeight: 52,
    minWidth: 118,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  dialFlag: {
    fontSize: 18,
    lineHeight: 22,
  },
  dialCode: {
    fontSize: 16,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },
  phone: {
    flex: 1,
  },
  footnote: {
    ...typography.caption,
    color: colors.placeholder,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.parchment,
    paddingTop: 12,
  },
  save: {
    borderRadius: 28,
    backgroundColor: colors.copper,
  },
});
