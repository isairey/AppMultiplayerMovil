import { Audio, AVPlaybackStatus } from "expo-av";

class AudioService {

  private sound: Audio.Sound | null = null;

  private status: AVPlaybackStatus | null = null;

  async load(uri: string) {

    try {

      if (this.sound) {

        await this.sound.unloadAsync();
        this.sound = null;

      }

      const { sound } = await Audio.Sound.createAsync(

        { uri },

        {
          shouldPlay: true,
          progressUpdateIntervalMillis: 500
        }

      );

      this.sound = sound;

      sound.setOnPlaybackStatusUpdate((status) => {

        this.status = status;

      });

    } catch (error) {

      console.log("Error cargando audio:", error);

    }

  }

  async play() {

    if (!this.sound) return;

    await this.sound.playAsync();

  }

  async pause() {

    if (!this.sound) return;

    await this.sound.pauseAsync();

  }

  async stop() {

    if (!this.sound) return;

    await this.sound.stopAsync();

  }

  async unload() {

    if (!this.sound) return;

    await this.sound.unloadAsync();

    this.sound = null;

  }

  async seek(position: number) {

    if (!this.sound) return;

    await this.sound.setPositionAsync(position);

  }

  async setVolume(volume: number) {

    if (!this.sound) return;

    await this.sound.setVolumeAsync(volume);

  }

  async setRate(rate: number) {

    if (!this.sound) return;

    await this.sound.setRateAsync(rate, true);

  }

  async getStatus() {

    if (!this.sound) return null;

    return await this.sound.getStatusAsync();

  }

  async isPlaying() {

    if (!this.sound) return false;

    const status = await this.sound.getStatusAsync();

    if (!status.isLoaded) return false;

    return status.isPlaying;

  }

  async getDuration() {

    if (!this.sound) return 0;

    const status = await this.sound.getStatusAsync();

    if (!status.isLoaded) return 0;

    return status.durationMillis ?? 0;

  }

  async getPosition() {

    if (!this.sound) return 0;

    const status = await this.sound.getStatusAsync();

    if (!status.isLoaded) return 0;

    return status.positionMillis;

  }

}

export default new AudioService();