import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenScaffold } from '../../components/organisms/ScreenScaffold';
import { StackHeader } from '../../components/organisms/StackHeader';
import { team } from '../../data/team';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import type { TeamMember } from '../../types/catalog';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Team'>;

function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.role}>{member.designation}</Text>
        <Text style={styles.spec}>{member.specialization}</Text>
        <Text style={styles.body}>{member.description}</Text>
      </View>
    </View>
  );
}

export function TeamScreen({ navigation }: Props) {
  return (
    <ScreenScaffold safeBottom={false}>
      <StackHeader title="Our Team" onBack={() => navigation.goBack()} />
      <FlatList
        data={team}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.lead}>
            Dedicated, passionate hair and beauty experts ready to pamper you —
            one style, one smile, one glow-up at a time.
          </Text>
        }
        renderItem={({ item }) => <TeamCard member={item} />}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 32,
    gap: 12,
  },
  lead: {
    ...typography.body,
    color: colors.muted,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    borderRadius: 20,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.copperSoft,
    borderWidth: 1,
    borderColor: colors.copper,
  },
  initials: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  copy: {
    flex: 1,
  },
  name: {
    ...typography.cardTitle,
    color: colors.ink,
  },
  role: {
    ...typography.caption,
    color: colors.copper,
    marginTop: 2,
    fontWeight: '700',
  },
  spec: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  body: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.sage,
    marginTop: 8,
  },
});
