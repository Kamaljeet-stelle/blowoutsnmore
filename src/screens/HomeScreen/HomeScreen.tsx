import { useMemo, useState } from 'react';
import { Image, Linking, Pressable, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { SearchField } from '../../components/molecules/SearchField';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { salon, salonHours } from '../../data/lounges';
import { heroImage, serviceImages } from '../../data/serviceImages';
import { team } from '../../data/team';
import { useBooking } from '../../hooks/useBooking';
import { useInbox } from '../../hooks/useInbox';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { nextBooking } from '../../services/booking.services';
import {
  newestServices,
  signatureServices,
} from '../../services/catalog.services';
import { initials } from '../../services/profile.services';
import {
  INSTAGRAM_URL,
  openInstagram,
  openSalonMap,
  openWhatsAppDirect,
} from '../../services/whatsapp.services';
import { colors } from '../../theme/colors';
import type { Service } from '../../types/catalog';
import type { RootStackParamList, TabParamList } from '../../types/navigation';
import { formatClock, formatVisitDate, greetingFor, todayIso } from '../../utils/dates';
import {
  CategoryRail,
  HomeHero,
  QuickActions,
  SectionHeader,
  SignatureList,
  SpotlightRail,
  type QuickAction,
} from './components';
import { styles } from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function HomeScreen({ navigation }: Props) {
  const { profile, signedIn, bookings } = useBooking();
  const { contentPadding } = useResponsiveLayout();
  const { unreadCount } = useInbox();
  const [query, setQuery] = useState('');
  const firstName = signedIn ? profile.firstName : '';
  const upcoming = useMemo(() => nextBooking(bookings, todayIso()), [bookings]);
  const nextVisit = upcoming
    ? `${formatVisitDate(upcoming.date)}, ${formatClock(upcoming.time)}`
    : undefined;
  const bleed = { marginHorizontal: -contentPadding };
  const featuredTeam = team.slice(0, 4);

  const openService = (service: Service) =>
    navigation.navigate('ServiceDetail', { serviceId: service.id });

  const actions: QuickAction[] = [
    {
      id: 'book',
      label: 'Book',
      caption: 'WhatsApp request',
      icon: 'calendar-check-outline',
      onPress: () => navigation.navigate('Book'),
    },
    {
      id: 'services',
      label: 'Services',
      caption: 'Hair · Nails · Body',
      icon: 'spa-outline',
      onPress: () => navigation.navigate('Services'),
    },
    {
      id: 'team',
      label: 'Team',
      caption: 'Meet the artists',
      icon: 'account-group-outline',
      onPress: () => navigation.navigate('Team'),
    },
  ];

  return (
    <ScreenScaffold scroll safeBottom={false}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Salon location"
          onPress={() => openSalonMap()}
          style={styles.location}>
          <View style={styles.locationIcon}>
            <MaterialDesignIcons name="map-marker" size={14} color={colors.parchment} />
          </View>
          <View style={styles.locationCopy}>
            <Text style={styles.locationLabel}>Dubai Studio City</Text>
            <Text style={styles.locationText} numberOfLines={1}>
              {salon.name}
            </Text>
          </View>
          <MaterialDesignIcons name="chevron-right" size={18} color={colors.ink} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={() => navigation.navigate('Notifications')}
          style={styles.iconButton}>
          <MaterialDesignIcons name="bell-outline" size={20} color={colors.ink} />
          {unreadCount > 0 ? (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{unreadCount}</Text>
            </View>
          ) : null}
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Account"
          onPress={() => navigation.navigate('Account')}
          style={styles.avatar}>
          <Text style={styles.avatarText}>{(signedIn && initials(profile)) || 'G'}</Text>
        </Pressable>
      </View>

      <HomeHero
        image={heroImage}
        greeting={greetingFor()}
        firstName={firstName}
        nextVisit={nextVisit}
        onBook={() => navigation.navigate('Book')}
        onVisit={() => navigation.navigate('Appointments')}
      />

      <View style={styles.searchWrap}>
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder="Search blowout, colour, manicure…"
          onSubmit={() => navigation.navigate('Services', { query: query.trim() })}
        />
      </View>

      <View style={styles.actions}>
        <QuickActions actions={actions} />
      </View>

      <SectionHeader
        kicker="Our Expertise"
        title="Hair, Nails & Body"
        action="All services"
        onAction={() => navigation.navigate('Services')}
      />
      <View style={bleed}>
        <View style={{ paddingLeft: contentPadding }}>
          <CategoryRail
            onPress={category => navigation.navigate('ServiceMenu', { category })}
          />
        </View>
      </View>

      <Text style={localStyles.intro}>
        Step into our vibrant sanctuary for gorgeous blowouts, chic cuts, dazzling
        colour, and pampering mani-pedis.
      </Text>

      <SectionHeader kicker="Featured" title="Salon favourites" />
      <View style={bleed}>
        <View style={{ paddingLeft: contentPadding }}>
          <SpotlightRail services={newestServices()} onPress={openService} />
        </View>
      </View>

      <SectionHeader kicker="Signature" title="Blowouts N' More rituals" />
      <SignatureList services={signatureServices()} onPress={openService} />

      <SectionHeader
        kicker="Our Team"
        title="Meet the artists"
        action="See all"
        onAction={() => navigation.navigate('Team')}
      />
      <View style={bleed}>
        <View style={[localStyles.teamRow, { paddingLeft: contentPadding }]}>
          {featuredTeam.map(member => (
            <Pressable
              key={member.id}
              onPress={() => navigation.navigate('Team')}
              style={localStyles.teamCard}>
              <View style={localStyles.teamAvatar}>
                <Text style={localStyles.teamInitials}>
                  {member.name
                    .split(' ')
                    .map(part => part[0])
                    .join('')
                    .slice(0, 2)}
                </Text>
              </View>
              <Text style={localStyles.teamName} numberOfLines={1}>
                {member.name}
              </Text>
              <Text style={localStyles.teamRole} numberOfLines={1}>
                {member.designation}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={localStyles.promo}>
        <Image source={serviceImages.nails} style={localStyles.promoImage} />
        <View style={localStyles.promoCopy}>
          <Text style={localStyles.promoKicker}>Glow-up moment</Text>
          <Text style={localStyles.promoTitle}>Book your appointment today</Text>
          <PrimaryButton title="WhatsApp Book" onPress={() => openWhatsAppDirect()} />
        </View>
      </View>

      <SectionHeader
        kicker="Instagram"
        title="@blowoutsnmore"
        action="Follow"
        onAction={() => openInstagram()}
      />
      <Pressable
        onPress={() => Linking.openURL(INSTAGRAM_URL)}
        style={localStyles.igCard}>
        <MaterialDesignIcons name="instagram" size={22} color={colors.ink} />
        <View style={{ flex: 1 }}>
          <Text style={localStyles.igTitle}>Follow us on Instagram</Text>
          <Text style={localStyles.igBody}>
            Salon looks, blowouts, and behind-the-scenes beauty.
          </Text>
        </View>
        <MaterialDesignIcons name="chevron-right" size={20} color={colors.muted} />
      </Pressable>

      <SectionHeader kicker="Visit us" title="Salon & hours" />
      <View style={localStyles.visitCard}>
        <Text style={localStyles.visitAddress}>{salon.address}</Text>
        <Pressable onPress={() => openSalonMap()}>
          <Text style={localStyles.mapLink}>Open location map</Text>
        </Pressable>
        <View style={localStyles.hoursList}>
          {salonHours.map(row => (
            <View key={row.day} style={localStyles.hoursRow}>
              <Text style={localStyles.hoursDay}>{row.day}</Text>
              <Text style={localStyles.hoursTime}>{row.hours}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScreenScaffold>
  );
}

const localStyles = {
  intro: {
    marginTop: 8,
    marginBottom: 8,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  teamRow: {
    flexDirection: 'row' as const,
    gap: 12,
    paddingRight: 8,
  },
  teamCard: {
    width: 108,
    alignItems: 'center' as const,
  },
  teamAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: colors.copperSoft,
    borderWidth: 2,
    borderColor: colors.copper,
  },
  teamInitials: {
    color: colors.ink,
    fontWeight: '700' as const,
    fontSize: 18,
  },
  teamName: {
    marginTop: 8,
    fontWeight: '700' as const,
    color: colors.ink,
    fontSize: 13,
  },
  teamRole: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 11,
    textAlign: 'center' as const,
  },
  promo: {
    marginTop: 24,
    borderRadius: 24,
    overflow: 'hidden' as const,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  promoImage: {
    width: '100%' as const,
    height: 140,
  },
  promoCopy: {
    padding: 18,
    gap: 10,
  },
  promoKicker: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
    color: colors.copper,
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: colors.ink,
  },
  igCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  igTitle: {
    fontWeight: '700' as const,
    color: colors.ink,
    fontSize: 15,
  },
  igBody: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 13,
  },
  visitCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 12,
  },
  visitAddress: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
  },
  mapLink: {
    marginTop: 8,
    color: colors.copper,
    fontWeight: '700' as const,
  },
  hoursList: {
    marginTop: 16,
    gap: 8,
  },
  hoursRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
  },
  hoursDay: {
    color: colors.muted,
    fontSize: 13,
  },
  hoursTime: {
    color: colors.ink,
    fontWeight: '600' as const,
    fontSize: 13,
  },
};
