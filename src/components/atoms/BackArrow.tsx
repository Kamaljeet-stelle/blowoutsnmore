import { Pressable, StyleSheet } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import { colors } from '../../theme/colors';

type Props = {
  onPress: () => void;
  light?: boolean;
};

export function BackArrow({ onPress, light = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back"
      onPress={onPress}
      hitSlop={12}
      style={({ pressed }) => [
        styles.button,
        light && styles.lightButton,
        pressed && styles.pressed,
      ]}>
      <MaterialDesignIcons
        name="arrow-left"
        size={24}
        color={light ? colors.parchment : colors.ink}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightButton: {
    borderRadius: 20,
    backgroundColor: 'rgba(42, 36, 32, 0.42)',
  },
  pressed: {
    opacity: 0.6,
  },
});
