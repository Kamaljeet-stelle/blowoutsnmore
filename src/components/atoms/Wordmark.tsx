import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { brandLogo } from '../../data/serviceImages';
import { colors } from '../../theme/colors';

type Props = {
  size?: number;
  light?: boolean;
  logo?: boolean;
};

export function Wordmark({ size = 22, light = false, logo = false }: Props) {
  if (logo) {
    return (
      <Image
        source={brandLogo}
        resizeMode="contain"
        style={{ width: Math.max(size * 5.5, 140), height: size + 8 }}
      />
    );
  }

  return (
    <View>
      <Text
        style={[
          styles.mark,
          { fontSize: size, lineHeight: size + 4 },
          light && styles.light,
        ]}>
        Blowouts N' More
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    color: colors.ink,
    letterSpacing: 0.2,
  },
  light: {
    color: colors.parchment,
  },
});
