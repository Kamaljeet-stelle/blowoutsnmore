import { Linking, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { BackArrow } from '../../components/atoms/BackArrow';
import { TextButton } from '../../components/atoms/TextButton';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { salonHours } from '../../data/lounges';
import { useBooking } from '../../hooks/useBooking';
import { getLounge } from '../../services/catalog.services';
import { openWhatsAppDirect } from '../../services/whatsapp.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LoungeDetail'>;

export function LoungeDetailScreen({ navigation, route }: Props) {
  const { setSelectedLounge } = useBooking();
  const lounge = getLounge(route.params.loungeId);

  if (!lounge) {
    return (
      <ScreenScaffold scroll>
        <BackArrow onPress={() => navigation.goBack()} />
        <Text style={styles.title}>This salon is not on the list.</Text>
      </ScreenScaffold>
    );
  }

  return (
    <ScreenScaffold scroll>
      <BackArrow onPress={() => navigation.goBack()} />
      <Text style={styles.kicker}>{lounge.city}</Text>
      <Text style={styles.title}>{lounge.name}</Text>
      <View style={styles.block}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.body}>{lounge.address}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.label}>Hours</Text>
        {salonHours.map(row => (
          <Text key={row.day} style={styles.body}>
            {row.day}: {row.hours}
          </Text>
        ))}
      </View>
      {lounge.phone ? (
        <TextButton
          title={lounge.phone}
          onPress={() => Linking.openURL(`tel:${lounge.phone.replace(/\s/g, '')}`)}
        />
      ) : null}
      <Text style={styles.note}>
        Bookings are requested on WhatsApp. The salon confirms availability with
        you directly.
      </Text>
      <PrimaryButton
        title="Book via WhatsApp"
        onPress={() => {
          setSelectedLounge(lounge.id);
          openWhatsAppDirect();
        }}
      />
      <View style={styles.secondary}>
        <PrimaryButton
          title="Browse services"
          onPress={() => {
            setSelectedLounge(lounge.id);
            navigation.navigate('Main', { screen: 'Services' });
          }}
        />
      </View>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  kicker: {
    ...typography.label,
    color: colors.copper,
    marginTop: 18,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    marginTop: 8,
  },
  block: {
    marginTop: 20,
  },
  label: {
    ...typography.label,
    color: colors.muted,
    marginBottom: 8,
  },
  body: {
    ...typography.body,
    color: colors.ink,
    marginBottom: 4,
  },
  note: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 18,
    marginBottom: 20,
  },
  secondary: {
    marginTop: 12,
  },
});
