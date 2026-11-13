import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { FilterChips } from '../../components/molecules/FilterChips';
import { PageHeading } from '../../components/molecules/PageHeading';
import { RecordCard } from '../../components/molecules/RecordCard';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { useBooking } from '../../hooks/useBooking';
import { getLounge, getService } from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { Booking } from '../../types/catalog';
import type { RootStackParamList, TabParamList } from '../../types/navigation';
import { formatClock, formatVisitDate, todayIso } from '../../utils/dates';
import { splitVisits } from './data';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Appointments'>,
  NativeStackScreenProps<RootStackParamList>
>;

type Scope = 'upcoming' | 'past' | 'cancelled';

const scopes: { id: Scope; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

function statusBadge(booking: Booking, scope: Scope) {
  if (scope === 'cancelled' || booking.status === 'cancelled') {
    return 'Cancelled';
  }
  if (scope === 'past' || booking.status === 'completed') {
    return 'Completed';
  }
  if (booking.status === 'requested') {
    return 'Requested';
  }
  return 'Upcoming';
}

export function AppointmentsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { bookings } = useBooking();
  const [scope, setScope] = useState<Scope>('upcoming');
  const visits = useMemo(() => splitVisits(bookings, todayIso()), [bookings]);
  const data =
    scope === 'cancelled'
      ? bookings.filter(item => item.status === 'cancelled')
      : visits[scope === 'past' ? 'past' : 'upcoming'].filter(
          item => item.status !== 'cancelled',
        );
  const footer = Math.max(insets.bottom, 12);

  const renderItem = useCallback(
    ({ item }: { item: Booking }) => {
      const service = getService(item.serviceId);
      const lounge = getLounge(item.loungeId);
      return (
        <RecordCard
          title={service?.name ?? 'Visit'}
          meta={`${formatVisitDate(item.date)} · ${formatClock(item.time)}`}
          subtitle={`${lounge?.name ?? 'Salon'} · ${item.staffName || item.name}`}
          badge={statusBadge(item, scope)}
        />
      );
    },
    [scope],
  );

  return (
    <ScreenScaffold safeBottom={false}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <PageHeading
              kicker="Appointments"
              title="Your visits"
              subtitle="Requests saved on this device. WhatsApp confirmation comes from the salon."
            />
            <FilterChips options={scopes} value={scope} onChange={setScope} />
            <View style={styles.gap} />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <MaterialDesignIcons
                name="calendar-month-outline"
                size={28}
                color={colors.copper}
              />
            </View>
            <Text style={styles.emptyText}>
              {scope === 'upcoming'
                ? 'No upcoming appointments. Book one now.'
                : scope === 'cancelled'
                  ? 'No cancelled appointments.'
                  : 'No completed appointments yet.'}
            </Text>
          </View>
        }
        contentContainerStyle={[styles.list, { paddingBottom: footer + 84 }]}
        initialNumToRender={8}
        windowSize={5}
      />
      <View style={[styles.footer, { paddingBottom: footer }]}>
        <PrimaryButton
          title="Book appointment"
          onPress={() => navigation.navigate('Book')}
        />
      </View>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
  gap: {
    height: 8,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
    marginBottom: 14,
  },
  emptyText: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: colors.parchment,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
});
