import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { PageHeading } from '../../components/molecules/PageHeading';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { salon } from '../../data/lounges';
import { categoryCards } from '../ServicesScreen/data';
import { openWhatsAppDirect } from '../../services/whatsapp.services';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { RootStackParamList, TabParamList } from '../../types/navigation';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Book'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function BookScreen({ navigation }: Props) {
  return (
    <ScreenScaffold scroll safeBottom={false}>
      <PageHeading
        kicker="Book"
        title="Request your appointment"
        subtitle="Choose a category, pick a service, then send your preferred time on WhatsApp. The salon confirms availability with you."
      />

      <View style={styles.list}>
        {categoryCards.map(card => (
          <Pressable
            key={card.id}
            accessibilityRole="button"
            onPress={() =>
              navigation.navigate('ServiceMenu', { category: card.id })
            }
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <Image source={card.image} style={styles.image} />
            <View style={styles.copy}>
              <Text style={styles.title}>{card.title}</Text>
              <Text style={styles.detail}>{card.detail}</Text>
            </View>
            <MaterialDesignIcons name="chevron-right" size={22} color={colors.ink} />
          </Pressable>
        ))}
      </View>

      <View style={styles.note}>
        <Text style={styles.noteTitle}>Booking at {salon.name}</Text>
        <Text style={styles.noteBody}>
          Times you select in-app are preferred slots only — not live inventory.
          Final confirmation happens on WhatsApp with the salon team.
        </Text>
        <PrimaryButton title="Message on WhatsApp" onPress={() => openWhatsAppDirect()} />
      </View>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 12,
    borderRadius: 20,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  copy: {
    flex: 1,
  },
  title: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  detail: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  note: {
    marginTop: 28,
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.copperSoft,
    gap: 12,
  },
  noteTitle: {
    ...typography.sectionTitle,
    color: colors.ink,
  },
  noteBody: {
    ...typography.body,
    color: colors.sage,
  },
});
