import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { TextButton } from '../../components/atoms/TextButton';
import { StoryPage } from '../../components/organisms/StoryPage';
import { aboutParagraphs } from '../../data/stories';
import type { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

export function AboutScreen({ navigation }: Props) {
  return (
    <StoryPage
      kicker="About"
      title="Fabulous and Flawlessly You!"
      paragraphs={aboutParagraphs}>
      <View style={styles.action}>
        <PrimaryButton
          title="Meet the team"
          onPress={() => navigation.navigate('Team')}
        />
        <View style={styles.secondary}>
          <TextButton
            title="Explore services"
            onPress={() => navigation.navigate('Main', { screen: 'Services' })}
          />
        </View>
      </View>
    </StoryPage>
  );
}

const styles = StyleSheet.create({
  action: {
    marginTop: 8,
  },
  secondary: {
    alignItems: 'center',
    marginTop: 16,
  },
});
