import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { TextButton } from '../../components/atoms/TextButton';
import { PriceSummary } from '../../components/molecules/PriceSummary';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { useBooking } from '../../hooks/useBooking';
import { serviceLines } from '../../services/booking.services';
import { getLounge, getService } from '../../services/catalog.services';
import { openWhatsAppDirect } from '../../services/whatsapp.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList } from '../../types/navigation';
import { formatClock, formatVisitDate } from '../../utils/dates';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirm'>;

function Detail({
  label,
  title,
  body,
  last = false,
}: {
  label: string;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.detail, !last && styles.detailRule]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailBody}>{body}</Text>
    </View>
  );
}

export function ConfirmScreen({ navigation, route }: Props) {
  const { bookings } = useBooking();
  const booking = bookings.find(item => item.id === route.params.bookingId);
  const service = booking ? getService(booking.serviceId) : undefined;
  const lounge = booking ? getLounge(booking.loungeId) : undefined;

  if (!booking || !service || !lounge) {
    return (
      <ScreenScaffold scroll>
        <Text style={styles.title}>That request is not on this device.</Text>
        <PrimaryButton title="Back home" onPress={() => navigation.popToTop()} />
      </ScreenScaffold>
    );
  }

  return (
    <ScreenScaffold scroll>
      <View style={styles.badge}>
        <MaterialDesignIcons name="whatsapp" size={30} color={colors.white} />
      </View>
      <Text style={styles.kicker}>Request ready</Text>
      <Text style={styles.title}>WhatsApp booking opened.</Text>
      <Text style={styles.lead}>
        Your preferred visit is saved on this phone as a request. The salon will
        confirm availability on WhatsApp — this is not an automatic confirmation.
      </Text>

      <View style={styles.card}>
        <Detail
          label="Salon"
          title={`${lounge.name}, ${lounge.city}`}
          body={lounge.address}
        />
        <Detail
          label="Preferred time"
          title={formatClock(booking.time)}
          body={formatVisitDate(booking.date)}
        />
        <Detail
          label="Service"
          title={service.name}
          body={serviceLines(booking).join('\n')}
          last
        />
      </View>

      <PriceSummary priceAed={booking.priceAed} />

      <PrimaryButton
        title="Open WhatsApp again"
        onPress={() => openWhatsAppDirect()}
        style={styles.primary}
      />
      <PrimaryButton
        title="View appointments"
        onPress={() => navigation.navigate('Main', { screen: 'Appointments' })}
        style={styles.secondary}
      />
      <View style={styles.home}>
        <TextButton title="Back to home" onPress={() => navigation.popToTop()} />
      </View>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copper,
    marginTop: 24,
  },
  kicker: {
    ...typography.label,
    color: colors.copper,
    marginTop: 20,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    marginTop: 8,
  },
  lead: {
    ...typography.body,
    color: colors.muted,
    marginTop: 8,
    marginBottom: 22,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.paper,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  detail: {
    paddingVertical: 14,
  },
  detailRule: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  detailLabel: {
    ...typography.label,
    fontSize: 10,
    color: colors.muted,
  },
  detailTitle: {
    ...typography.cardTitle,
    color: colors.ink,
    marginTop: 6,
  },
  detailBody: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  primary: {
    marginTop: 24,
  },
  secondary: {
    marginTop: 12,
  },
  home: {
    alignItems: 'center',
    marginTop: 18,
  },
});
