import { Linking, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { StoryPage } from '../../components/organisms/StoryPage';
import type { RootStackParamList } from '../../types/navigation';

const paragraphs = [
  "Blowouts N' More values your privacy. Profile details you enter in this app stay on your device for booking requests.",
  'When you send a WhatsApp booking request, the conversation continues in WhatsApp under that platform’s terms.',
  'For the salon’s latest public policies, visit blowoutsnmore.com or ask the team directly.',
];

type Props = NativeStackScreenProps<RootStackParamList, 'Privacy'>;

export function PrivacyScreen({}: Props) {
  return (
    <StoryPage kicker="Legal" title="Privacy policy" paragraphs={paragraphs}>
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
