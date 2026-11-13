import { Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { BackArrow } from '../../components/atoms/BackArrow';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { addonsFor, priceLabel, variantsFor } from '../../data/bookingOptions';
import { imageForService } from '../../data/serviceImages';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { getService, serviceMeta } from '../../services/catalog.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { categoryLabels } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceDetail'>;

export function ServiceDetailScreen({ navigation, route }: Props) {
  const { contentPadding } = useResponsiveLayout();
  const service = getService(route.params.serviceId);

  if (!service) {
    return (
      <ScreenScaffold scroll>
        <BackArrow onPress={() => navigation.goBack()} />
        <Text style={styles.title}>This service is not on the list.</Text>
      </ScreenScaffold>
    );
  }

  const variants = variantsFor(service.id);
  const addons = addonsFor(service.id);

  return (
    <ScreenScaffold scroll>
      <View
        style={[
          styles.heroWrap,
          { marginHorizontal: -contentPadding, borderRadius: 0 },
        ]}>
        <Image
          source={imageForService(service)}
          style={styles.hero}
          resizeMode="cover"
        />
        <View style={styles.heroShade} />
        <View style={[styles.heroBack, { left: contentPadding }]}>
          <BackArrow onPress={() => navigation.goBack()} light />
        </View>
        <View style={[styles.heroCopy, { left: contentPadding, right: contentPadding }]}>
          <Text style={styles.heroKicker}>{categoryLabels[service.category]}</Text>
          <Text style={styles.heroTitle} numberOfLines={2}>
            {service.name}
          </Text>
        </View>
      </View>

      <Text style={styles.meta}>{serviceMeta(service)}</Text>
      <Text style={styles.price}>{priceLabel(service.fromPriceAed ?? null)}</Text>
      <Text style={styles.vat}>Prices excluding VAT · may vary by stylist & length</Text>
      <Text style={styles.body}>{service.summary}</Text>

      {variants.length > 0 ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Options</Text>
          {variants.map(variant => (
            <Text key={variant.id} style={styles.row}>
              {variant.name}
              {variant.priceAed != null ? ` · from AED ${variant.priceAed}` : ''}
              {variant.minutes ? ` · ~${variant.minutes} min` : ''}
            </Text>
          ))}
        </View>
      ) : null}

      {addons.length > 0 ? (
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Available add-ons</Text>
          {addons.map(addon => (
            <Text key={addon.id} style={styles.row}>
              {addon.name}
              {addon.priceAed != null ? ` · from AED ${addon.priceAed}` : ''}
            </Text>
          ))}
        </View>
      ) : null}

      <Text style={styles.note}>
        Duration is shown only as an estimate when listed. Final timing and price
        are confirmed by the salon. Bookings are requested over WhatsApp.
      </Text>
      <PrimaryButton
        title="Book Appointment"
        onPress={() =>
          navigation.navigate('ServiceMenu', {
            category: service.category,
            serviceId: service.id,
          })
        }
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    marginTop: -12,
    marginBottom: 18,
    overflow: 'hidden',
    backgroundColor: colors.ink,
  },
  hero: {
    width: '100%',
    height: 340,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(42, 36, 32, 0.34)',
  },
  heroBack: {
    position: 'absolute',
    top: 14,
  },
  heroCopy: {
    position: 'absolute',
    bottom: 22,
  },
  heroKicker: {
    ...typography.label,
    color: colors.copperSoft,
    marginBottom: 6,
  },
  heroTitle: {
    ...typography.serifTitle,
    color: colors.parchment,
    fontSize: 30,
    lineHeight: 34,
  },
  meta: {
    ...typography.caption,
    color: colors.sage,
  },
  price: {
    ...typography.sectionTitle,
    color: colors.ink,
    marginTop: 14,
  },
  vat: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  body: {
    ...typography.body,
    color: colors.ink,
    marginTop: 18,
  },
  block: {
    marginTop: 20,
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 6,
  },
  blockTitle: {
    ...typography.label,
    color: colors.copper,
    marginBottom: 4,
  },
  row: {
    ...typography.body,
    fontSize: 15,
    color: colors.ink,
  },
  note: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 18,
    marginBottom: 20,
  },
  title: {
    ...typography.screenTitle,
    color: colors.ink,
    marginTop: 8,
  },
});
