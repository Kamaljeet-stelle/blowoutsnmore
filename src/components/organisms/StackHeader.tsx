import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BackArrow } from '../atoms/BackArrow';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

type Props = {
  title?: string;
  onBack?: () => void;
  actionTitle?: string;
  onAction?: () => void;
};

export function StackHeader({ title, onBack, actionTitle, onAction }: Props) {
  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {onBack ? <BackArrow onPress={onBack} /> : null}
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {title ?? ''}
      </Text>

      <View style={[styles.side, styles.sideEnd]}>
        {actionTitle && onAction ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={10}
            onPress={onAction}
            style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
            <Text style={styles.actionText}>{actionTitle}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  side: {
    minWidth: 72,
    height: 40,
    justifyContent: 'center',
  },
  sideEnd: {
    alignItems: 'flex-end',
  },
  title: {
    ...typography.sectionTitle,
    flex: 1,
    textAlign: 'center',
    color: colors.ink,
    fontSize: 18,
    lineHeight: 22,
  },
  action: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.ink,
  },
  pressed: {
    opacity: 0.8,
  },
  actionText: {
    ...typography.button,
    color: colors.parchment,
    fontSize: 13,
  },
});
