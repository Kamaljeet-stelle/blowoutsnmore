import { Linking, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { StoryPage } from '../../components/organisms/StoryPage';
import type { RootStackParamList } from '../../types/navigation';

const paragraphs = [
  'Appointments requested in this app are not automatically confirmed. The salon confirms availability on WhatsApp.',
  'Listed prices are starting prices excluding VAT and may vary with stylist level, hair length, thickness, and products used.',
  'Cancellations and timing changes should be arranged directly with the salon.',
];

type Props = NativeStackScreenProps<RootStackParamList, 'Terms'>;

export function TermsScreen({}: Props) {
  return (
    <StoryPage kicker="Legal" title="Terms & conditions" paragraphs={paragraphs}>
      <View style={styles.action}>
        <PrimaryButton
          title="Visit website"
          onPress={() => Linking.openURL('https://blowoutsnmore.com/')}
        />
      </View>
    </StoryPage>
  );
}

const styles = StyleSheet.create({
  action: {
    marginTop: 8,
  },
});
